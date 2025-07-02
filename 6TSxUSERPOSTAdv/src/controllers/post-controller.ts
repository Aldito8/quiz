import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getPost = async (req: Request, res: Response) => {
    const category = typeof req.query.category === 'string' ? req.query.category.trim() : undefined;

    try {
        const posts = await prisma.post.findMany({
            where: category
                ? { category: { name: category } } : {}
        })

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch data", error })
    }
}



export const getPostComment = async (req: Request, res: Response) => {
    const { limit } = req.query

    const id = parseInt(req.params.id)
    try {
        const posts = await prisma.post.findMany({
            where: {
                id
            },
            include: {
                category: true,
                Comment: {
                    take: Number(limit),
                }
            }
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch data" })
    }
}

export const getPostCommentsSummary = async (req: Request, res: Response) => {
    const {
        limit,
        offset,
        mincomment,
        maxcomment
    } = req.query

    try {
        const posts = await prisma.comment.groupBy({
            by: ['postid'],
            _count: { comment: true },
            having: {
                comment: {
                    _count: {
                        gt: Number(mincomment),
                        lt: Number(maxcomment)
                    }
                }
            },
            orderBy: {
                postid: 'asc'
            },
            skip: Number(offset),
            take: Number(limit)
        })
        const total = posts.length
        res.json({ data: posts, total })
    } catch (error) {
        res.status(500).json({ message: `${error}` })
    }
}