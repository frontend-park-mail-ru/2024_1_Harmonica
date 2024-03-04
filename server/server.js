import express from 'express';
import path from 'path';

const app = express();
const PORT = 8000;

const __dirname = path.resolve();
app.use('/', express.static(path.resolve(__dirname, './source')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './source', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));