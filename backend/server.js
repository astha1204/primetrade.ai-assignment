const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Config
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Documentation Route (Swagger)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// API Versioning (v1)
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/tasks', require('./routes/tasks'));

// Root Endpoint
app.get('/', (req, res) => {
    res.send('API is running. Go to /api-docs for documentation.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));