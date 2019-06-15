import express from 'express';
import auth from '../controllers/auth';

const router = express.Router();

router.route('/login').post(auth);

export default router;