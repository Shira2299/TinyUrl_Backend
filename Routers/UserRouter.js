import express from 'express';
import userController from '../Controllers/UserController.js';

const router = express.Router();

router.get('/getlinks/:email',userController.getLinksByUserId)

router.get('/:id',userController.getById);

router.get('/',userController.getList);

router.put('/',userController.update);

router.post('/',userController.add);

router.delete('/:id',userController.delete);


export default router;