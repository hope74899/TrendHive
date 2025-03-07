const express = require('express')
const connection = require('./config/database')
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./routes/router')
const errorMiddleware = require('./middleware/errorHandlerMiddleware')
const session = require("express-session");
const passport = require("./config/passport");
const cookieParser = require('cookie-parser');



dotenv.config();
const app = express();
const corsOptions = {
    origin: process.env.FRONTENDPATH,
    methods: "GET, POST, PATCH, PUT, DELETE, HEAD",
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.PRIVATE_SECRET_KEY, // Replace with a strong, unique key
    resave: false, // Prevents resaving session if unmodified
    saveUninitialized: false, // Only save session when initialized
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: "strict",
        path: "/", // Match this
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 day expiration
    } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(router);
app.get('/text', (req, res) => {
    res.send('app is running')
})
app.use((req, res, next) => {
    console.log('Middleware initialized');
    next();
});
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use(errorMiddleware);

const port = process.env.PORT || 8000
connection().then(() => {
    app.listen(port, () => {
        console.log(`app is running on port ${port}`)
    })
}
).catch((error) => {
    console.log('Failed to connect to MongoDB', error);
})
