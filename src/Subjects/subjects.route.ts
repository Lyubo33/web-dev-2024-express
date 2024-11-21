import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

//POST route for creating a subject
router.post('/', async (req: Request, res: Response) =>{
    try {
        const { name} = req.body;
        if (await db.models.Subjects.findOne({ where: { name } })) {
          throw new Error("Subject already exists.")
        }
        const subject = await db.models.Subjects.create({ name});
        res.status(201).json(subject);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
});

export default router;