import express from 'express';
import userrouter from './routes/user.routes.js';
import authrouter from './routes/auth.routes.js';
import subscriptionrouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';

import errorMiddleware from './Middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/users', userrouter);
app.use('/api/v1/auth', authrouter);
app.use('/api/v1/subscriptions', subscriptionrouter);
app.use(errorMiddleware);
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');

    await connectDB();
});

export default app;