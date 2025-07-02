export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
}

export let nextProductId = 3;

export function getNextProductId(): number {
    return nextProductId++;
}

export const products: Product[] = [
    {
        id: 1,
        name: "kacamata",
        description: "membantu melihat dengan jelas",
        price: 400000
    },
    {
        id: 2,
        name: "teleskop",
        description: "membantu melihat benda benda langit",
        price: 2000000
    }
]