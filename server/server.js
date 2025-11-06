require('dotenv').config();
const express = require('express');
const cors = require('cors');

const searchRouter = require('./routes/search');
const artistRouter = require('./routes/artist');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Qobuz Artist Discography API' });
});

// api routes
app.use('/search', searchRouter);
app.use('/artist', artistRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
