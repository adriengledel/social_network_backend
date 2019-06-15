import express from 'express';
import update from '../controllers/update';

const router = express.Router();

router.route('/update').post(update);

export default router;