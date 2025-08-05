import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/posts.routes'

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

app.use('/api', postRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));