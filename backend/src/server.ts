import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import postsRoutes from './routes/posts.routes';
import profilesRoutes from './routes/profiles.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/api/health', async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy'
    })
})

app.use('/api/auth', authRoutes)

app.use('/api/posts', postsRoutes)

app.use('/api/profiles', profilesRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));