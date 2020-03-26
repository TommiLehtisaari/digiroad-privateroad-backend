import express, { Application, Request, Response } from 'express';

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Express Running on port: ${PORT} 🚀`);
});
