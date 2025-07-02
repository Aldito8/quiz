import { prisma } from './client';

async function main() {
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const users = await prisma.user.createMany({
        data: [
            { name: "Alice", email: "alice@example.com" },
            { name: "Bob", email: "bob@example.com" },
            { name: "Charlie", email: "charlie@example.com" }
        ]
    })

    const products = await prisma.product.createMany({
        data: [
            { name: "Keyboard", price: 350_000, stock: 12 },
            { name: "Mouse", price: 250_000, stock: 28 },
            { name: "Monitor", price: 1_550_000, stock: 12 },
            { name: "Laptop", price: 6_350_000, stock: 53 },
            { name: "USB", price: 50_000, stock: 50 }
        ]
    })

    const orders = await prisma.order.createMany({
        data: [
            { userId: 1, productId: 2, quantity: 2 },
            { userId: 1, productId: 1, quantity: 1 },
            { userId: 2, productId: 4, quantity: 5 },
            { userId: 2, productId: 5, quantity: 2 },
            { userId: 3, productId: 3, quantity: 1 },
            { userId: 3, productId: 1, quantity: 3 },
        ]
    })
}

main()
    .then(() => { console.log("Seeding completed") })
    .catch((e) => { console.log(e) })
    .finally(async () => { await prisma.$disconnect() })