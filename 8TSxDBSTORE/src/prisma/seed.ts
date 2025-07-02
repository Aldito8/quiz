import { PrismaClient } from "../generated/prisma"
const prisma = new PrismaClient()

async function main() {

    const supplier1 = await prisma.supplier.create({
        data: {
            name: 'Mystic Merchant Guild',
            contact: 'guild@mysticmail.com'
        }
    })

    const supplier2 = await prisma.supplier.create({
        data: {
            name: 'Alchemist Supplies Inc',
            contact: 'potions@alchemy.com'
        }
    })


    const product1 = await prisma.product.create({
        data: {
            name: 'Phoenix Feather Quill',
            price: 150.0,
            supplierId: supplier1.id,
            stock: {
                create: {
                    quantity: 25
                }
            }
        }
    })

    const product2 = await prisma.product.create({
        data: {
            name: 'Mana Elixir XL',
            price: 75.5,
            supplierId: supplier2.id,
            stock: {
                create: {
                    quantity: 100
                }
            }
        }
    })

    const product3 = await prisma.product.create({
        data: {
            name: 'Shadow Cloak',
            price: 350.0,
            supplierId: supplier1.id,
            stock: {
                create: {
                    quantity: 10
                }
            }
        }
    })

    console.log('✅ Seeding complete!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
