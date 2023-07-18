import express from 'express';
import linkController from '../Controllers/LinkController.js';

const router = express.Router();

router.get('/',linkController.getList);

router.get('/:id',linkController.getById);

router.put('/:id',linkController.updateTargetKey);

router.put('/',linkController.updateTargetValues);

router.post('/',linkController.add);

router.delete('/:id',linkController.delete);

export default router; 
