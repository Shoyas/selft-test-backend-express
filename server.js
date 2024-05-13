import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server is listening on the port ${port}`);
})