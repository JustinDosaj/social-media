import express, { Request, Response } from 'express';
import cors from "cors"
import authRoutes from './routes/auth.routes';
import postsRoutes from './routes/posts.routes';
import usersRoutes from './routes/users.routes';
import { errorHandler } from './middleware/errorHandler';
import { initCognito } from './clients/cognito';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use(cors({origin: true, credentials: true}))

app.use('/api/health', async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy'
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)

app.use(errorHandler)

initCognito()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to init Cognito', err);
    process.exit(1);
  });
