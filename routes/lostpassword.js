import express from 'express';
import { lostpassword } from '../controllers/lostpassword';

const router = express.Router();

router.route('/lostpassword').post(lostpassword);

export default router;