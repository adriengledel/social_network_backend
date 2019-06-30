import express from 'express';
import {friendRequest} from '../controllers/friend';
import {updateFriend} from '../controllers/friend';


const router = express.Router();

/* router.route('/friend').post(friendRequest);
router.route('/updatefriend').post(updateFriend); */

export default router;