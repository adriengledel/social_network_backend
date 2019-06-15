import express from 'express';
import friendRequest from '../controllers/friend';

const router = express.Router();

router.route('/friend').post(friendRequest);

export default router;