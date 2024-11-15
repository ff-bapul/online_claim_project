// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Swagger documentation
// const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected."))
  .catch((error) => console.log(error));

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
// Routes
app.use('/auth', require('./routes/auth'));
app.use('/claims', require('./routes/claims'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
