import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { logger } from './utils/logger';
import mongoose from 'mongoose';
import helmet from 'helmet';
import routes from './routes';
import cookieParser from 'cookie-parser'

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? "8000";

app.use(express.json())

app.use(cors())
app.use(helmet())
app.use(cookieParser());
app.use(routes);

const MONGODB_URL = process.env.DATABASE_URL ?? "";
mongoose.connect(MONGODB_URL)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world")
})

app.listen((port), () => {
    logger.info(`Server running on port ${port}`)
})

