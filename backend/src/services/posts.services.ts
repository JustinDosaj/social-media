
export class PostServices {

    static async getPostsById(userId: string) {

        console.log('Mock post retrieval with userId: ', userId)

        return [
            {
                id: 'mock-post-1',
                content: 'Hello world!',
                userId,
                createdAt: new Date().toISOString(),
            },
            {
                id: 'mock-post-2',
                content: 'Another fake post',
                userId,
                createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
            }, 
        ]
    }
}