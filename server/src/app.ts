import express from 'express';

const app = express();

app.get('*', (req, res) => {
     res.send(`Express + TypeScript Server 3, ${req.url}`);
});

export default app;