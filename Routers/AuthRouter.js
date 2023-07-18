import express from 'express';
import AuthorizationController from '../Controllers/AuthorizationController.js';

const router = express.Router();

router.get('/:email/:password',AuthorizationController.signIn)

router.post('/',AuthorizationController.signUp);

export default router;