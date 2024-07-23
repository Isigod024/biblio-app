const { getData } = require('../model/jsonData.js');
 
const { PrismaClient } = require('@prisma/client');
 
const users = getData('user');
 
//Initialisation du client prisma
const prisma = new PrismaClient();
 
/**
 * Ajout des users
 */
async function seedUser() {
    try {
        console.log("DEBUT Ajout des users");
        for (const user of users) {
            await prisma.user.create({
                data: {
                    email: user.email,
                    password: user.password
                }
            });
        }
        console.log("FIN Ajout des users");
 
    } catch (error) {
        console.error("Erreur lors de l'ajout des users : ", error);
        throw error;
    }
}
 
 
async function main() {
    await seedUser();
    console.log("TOUS LES AJOUTS ONT ETE EFFECTUES AVEC SUCCES");
}
 
main().catch((err) => {
    console.error(
        "Une erreur s'est produite lors de la tentative d'ajout des données de la base de données : ",
        err,
    );
});