require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  })
);
app.use(express.json());

app.use('/api/properties', propertyRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'NovaSol API running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[server] NovaSol API listening on port ${PORT}`);
});
