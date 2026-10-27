import 'dotenv/config';
import app from './app.js';
const PORT = process.env.PORT || 3000;

console.log('Node.js version:', process.version);

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
