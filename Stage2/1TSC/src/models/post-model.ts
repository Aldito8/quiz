export interface Post {
    id: number,
    title: string,
    content: string,
}

export const posts: Post[] = [
    { id: 4, title: "First Title", content: "First Content" },
    { id: 1, title: "Second Title", content: "Second Content" }
]