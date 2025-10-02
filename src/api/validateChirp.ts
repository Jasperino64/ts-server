import {Request, Response} from 'express';

export function validateChirpHandler(req: Request, res: Response) {
  let body = "";
  req.on('data', chunk => {
    body += chunk.toString();
  });
  res.header("Content-Type", "application/json");
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const message = data.body;
      if (message.length > 140) {
        return res.status(400).json({ error: 'Chirp is too long' });
      }
      res.status(200).json({ valid: true });
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong' });
    }
  });
}