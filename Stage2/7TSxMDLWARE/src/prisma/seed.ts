import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany();

    await prisma.user.createMany({
        data: [
            {
                name: "Aria Stormblade",
                email: "aria@magicrealm.com",
                points: 1200
            },
            {
                name: "Thorne Emberforge",
                email: "thorne@blacksmithguild.org",
                points: 850
            },
            {
                name: "Liora Moondancer",
                email: "liora@elvenforest.net",
                points: 1500
            },
            {
                name: "Kael Frostwhisper",
                email: "kael@icecitadel.com",
                points: 670
            },
            {
                name: "Mira Sunflare",
                email: "mira@solarianorder.org",
                points: 1340
            },
            {
                name: "Darin Stoneheart",
                email: "darin@mountainguard.io",
                points: 970
            },
            {
                name: "Nyra Shadowveil",
                email: "nyra@nightcloak.net",
                points: 1110
            },
            {
                name: "Fenric Oakenshield",
                email: "fenric@druidcircle.org",
                points: 780
            },
            {
                name: "Sylas Windwalker",
                email: "sylas@skywardclan.com",
                points: 1025
            },
            {
                name: "Eira Frostlight",
                email: "eira@glacialspire.org",
                points: 1435
            }
        ]
    })
}

main()
    .then(() => {
        console.log('🌱 Dummy user seeding complete.')
    })
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })