import { prisma } from "../prisma/client";

export async function addProductService(
    name: string,
    stock: number,
    price: number,
    pic: string,
    userid: number
) {
    await prisma.product.create({
        data: {
            name,
            stock: Number(stock),
            price: Number(price),
            pic,
            userid
        }
    })

    return { name, stock, price, pic, userid };
}

export async function updateProductService(
    name: string,
    stock: number,
    price: number,
    pic: string,
    userid: number,
    id: number
) {

    await prisma.product.update({
        where: { id },
        data: {
            name,
            stock: Number(stock),
            price: Number(price),
            pic,
            userid
        }
    })

    return { name, stock, price, pic, userid };
}