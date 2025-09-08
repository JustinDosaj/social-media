export async function getProfileByUsername(username: string) {

    console.log('Mock profile retriever for username: ', username)

    /**
     * @TODO 
     * Lookup userId with username
     * Use userId to retreive profile information
     * Return user profile information
     */

    return {
        id: '12345',
        username: username,
        displayName: 'John Doe',
        bio: 'Just a developer building cool stuff.',
        avatarUrl: 'https://example.com/avatars/john.png',
        followersCount: 128,
        followingCount: 200,
        postsCount: 42,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

}