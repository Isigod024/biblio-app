import { PrismaClient } from "@prisma/client";
 
export async function login(email, password) {
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) return 'User non connu';
        const isPassCorrect = (password === user.password);
        if (!isPassCorrect) return("User non connu");
        return user;
    } catch (error) {
        throw new Error("Erreur lors de la connexion : ");
    }
}