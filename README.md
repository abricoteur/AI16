# AI16

# Structure du projet


# myapp

C'est le répertoire principal du projet Express. Il peut avoir n'importe quel nom.

# Fichiers de configuration

package.json : Ce fichier contient les dépendances du projet, les scripts de démarrage, les informations sur le projet, etc.

package-lock.json : Ce fichier est généré automatiquement et contient des informations sur les versions spécifiques des dépendances installées.

app.js : Ce fichier est le point d'entrée principal de notre application Express. Il configure et lance le serveur Express.


# Dossiers

node_modules : Ce dossier contient les dépendances installées via npm et est généralement généré automatiquement.

public : Ce dossier contient les fichiers statiques (CSS, JavaScript, images, etc.) qui sont accessibles directement par le navigateur. Par exemple, on peut placer nos fichiers CSS dans public/users/stylesheets/ et les fichiers JavaScript dans public/js/.

views : Ce dossier contient les fichiers de template EJS utilisés pour générer le contenu dynamique des pages web. On peut organiser ces fichiers dans des sous-dossiers si nécessaire. 

routes : Ce dossier contient les fichiers qui définissent les routes et les contrôleurs de  notre application Express. On peut avoir plusieurs fichiers de routage pour différents groupes de routes ou ressources. Ce dossier nous permet d’accéder à toutes les pages telles que la home, admin, recruiter etc.. Il nous permet également de faire des requêtes GET et POST à travers les routes.

models : Ce dossier contient les modèles de données de l’application, si on utilise un système de base de données.
Dans ce dossier, on a un fichier db.js qui correspond aux informations de connexion à notre base de données. Ce fichier est importé dans tous les autres fichiers js afin que les données puissent être récupérées.


# Fichiers supplémentaires

.gitignore : Ce fichier spécifie les fichiers et dossiers à ignorer lors de l'utilisation d'un système de contrôle de version comme Git.

README.md : Ce fichier contient des informations sur le projet, son fonctionnement, les dépendances nécessaires, les instructions d'installation, etc.

