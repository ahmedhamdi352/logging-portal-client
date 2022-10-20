const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const port = process.env.PORT || 3000;
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => {
  console.log(`static server is running on port: ${port}`);
});
