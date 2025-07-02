export interface Order {
    id: number
    productId: number
    quantity: number
}

export let nextOrderId = 3;

export function getNextOrderId(): number {
    return nextOrderId++;
}

export const orders: Order[] = [
    {
        id: 1,
        productId: 2,
        quantity: 1,
    },
    {
        id: 2,
        productId: 1,
        quantity: 1,
    }
]