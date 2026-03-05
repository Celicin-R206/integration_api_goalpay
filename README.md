🚀 Installation et configuration du projet

1 - Cloner le projet
git clone https://github.com/Celicin-R206/integration_api_goalpay

cd integration_api_goalpay

2 - Installer les dépendances
npm install

3 - Lancer le projet en mode développement
npm run dev
Le serveur sera disponible sur http://localhost:3000

4 - Migration de la base de données
# Générer la migration
npx drizzle-kit generate

# Appliquer la migration
npx drizzle-kit migrate

5 - Configuration des variables d'environnement
Modifie le fichier .env pour ajouter tes clés GoalPay

# Token GoalPay
TGP_TOKEN=ton_token_goalpay

# Clé secrète GoalPay
SK_SECRET_KEY=ta_cle_secrete_goalpay

⚠️ Assure-toi que ces variables commencent par TGP_ et SK_ comme indiqué.

🎉 Bonne chance avec l’installation et le lancement du projet !
Si tu suis ces étapes, tout devrait bien se passer.
N’hésite pas à vérifier que tes clés GoalPay sont correctes et que la base de données est bien migrée avant de tester les fonctionnalités. 🚀
