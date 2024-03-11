import express from 'express';
import path from 'path';

const app = express();
const PORT = 8000;

const dirname = path.resolve();
app.use('/', express.static(path.resolve(dirname, './source')));

app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, './source', 'index.html'));
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
