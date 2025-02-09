import express from 'express';
import userrouter from './routes/user.routes.js';
import authrouter from './routes/auth.routes.js';
import subscriptionrouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';

const app = express();

app.use('/api/v1/users', userrouter);
app.use('/api/v1/auth', authrouter);
app.use('/api/v1/subscriptions', subscriptionrouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');

    await connectDB();
});

export default app;