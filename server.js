const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();

// Serve static files from the dist directory
app.use(serveStatic(path.join(__dirname, 'dist')));

// Handle SPA (Single Page Application) routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
