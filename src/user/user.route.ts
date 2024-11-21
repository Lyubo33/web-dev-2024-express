import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId , subjectsIds} = req.body;
    const university = await db.models.University.findByPk(universityId); 

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }
    

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }
    
    const user = await db.models.User.create({ name, email, universityId });
    res.status(201).json(user);
    if(subjectsIds && subjectsIds.length > 0){
      await user.setSubjects(subjectsIds);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: {
        model: db.models.University,
        as: 'university',
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//PUT route to get user by id and update its subjects
router.put('/user/:id/subjects', async (req: Request, res: Response) =>{
    try{
      const {id} = req.params;
      const {subjectIds} = req.body;

      const user = await db.models.User.findByPk(id);
      if(!user){
        throw new Error("User not found");
      }
      if(subjectIds && subjectIds.length > 0){
        await user.setSubjects(subjectIds);
      }

      res.status(200).json({
        message: 'User subjects updated successfuly',
        user,
      });
    
    } catch (error){
      console.error('Error updating user subjects', error);
      res.status(500).json({error:"failed to update user subjects"});
    }

});

export default router;
