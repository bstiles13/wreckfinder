const express = require('express');
const bodyParser = require('body-parser');
const wrecks = require('./data.json');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/wrecks', (req, res) => {
  return res.json(wrecks);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Successful connection on port ${PORT}`);
});
