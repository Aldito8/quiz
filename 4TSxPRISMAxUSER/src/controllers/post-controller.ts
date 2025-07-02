import { Request, Response } from 'express';
import { prisma } from '../connection/client';

export const getPost = async (req: Request, res: Response) => {
    try {
        const poasts = await prisma.post.findMany()
        res.status(200).json(poasts)
    } catch (error) {
        res.json(`${error}`)
    }
}

export const createPost = async (req: Request, res: Response) => {
    const { title, content, userId } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            res.status(404).json({ message: "User Not Found" });
        }
        const posts = await prisma.post.create({
            data: { title, content, userId }
        })
        res.status(200).json(posts)
    } catch (error) {
        res.json(`${error}`)
    }
}

export const updatePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const { title, content, userId } = req.body

    try {
        const posts = await prisma.post.update({
            where: { id },
            data: { title, content, userId }
        })
        res.status(200).json(posts)
    } catch (error) {
        res.json(`${error}`)
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    try {
        await prisma.post.delete({
            where: { id }
        })
        res.status(200).json('succes delete data')
    } catch (error) {
        res.json(`${error}`)
    }
}
