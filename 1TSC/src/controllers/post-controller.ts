import { Request, Response } from "express";
import { posts, Post } from '../models/post-model';

export const getPosts = (req: Request, res: Response) => {
    res.json(posts)
}

export const createPosts = (req: Request, res: Response) => {
    const { title, content } = req.body

    const id = posts.map(item => item.id)
    const idSorting = id.sort()

    const lastIndex = idSorting.length - 1
    const lastValue = id[lastIndex]

    const newPost: Post = {
        id: lastValue + 1,
        title,
        content
    }

    posts.push(newPost)
    res.status(201).json(posts)
}

export const deletePosts = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(item => item.id === id);
    if (index !== -1) {
        posts.splice(index, 1)
        res.status(204).send();
    } else {
        res.status(404).json('Item not found');
    }
}