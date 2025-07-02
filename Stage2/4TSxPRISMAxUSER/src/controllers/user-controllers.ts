import { Request, Response } from 'express';
import { prisma } from '../connection/client';

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    try {
        const users = await prisma.user.findUnique(
            {
                where: { id },
                include: {
                    posts: true
                }
            }
        )
        res.status(200).json(users)
    } catch (error) {
        res.json(`${error}`)
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.json(`${error}`)
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body

    try {
        const users = await prisma.user.create({
            data: { email, firstName, lastName }
        })
        res.status(200).json(users)
    } catch (error) {
        res.json(`${error}`)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { email, firstName, lastName } = req.body

    try {
        const users = await prisma.user.update({
            where: { id },
            data: { email, firstName, lastName }
        })
        res.status(200).json(users)
    } catch (error) {
        res.json(`${error}`)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    try {
        await prisma.post.deleteMany({
            where: { userId: id }
        })
        await prisma.user.delete({
            where: { id }
        })
        res.status(200).json('succes delete data')
    } catch (error) {
        res.json(`${error}`)
    }
}
