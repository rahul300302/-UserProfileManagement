import express from 'express';
import { addAdmin } from '../controller/Admin/addAdmin.js';
import { updateAdmin } from '../controller/Admin/updateAdmin.js';
import { viewAdmin } from '../controller/Admin/viewAdmin.js';
import { addUser } from '../controller/user/addUser.js';
import { updateUser } from '../controller/user/updateUser.js';
import { viewUser } from '../controller/user/viewUser.js';
import { authenticate } from '../authentication.js';

const router = express.Router();

router.post('/admin/add',authenticate, addAdmin);
router.put('/admin/update',authenticate,updateAdmin);
router.get('/admin/view',authenticate,viewAdmin);

router.post('/user/add', authenticate,addUser);
router.put('/user/update', authenticate,updateUser);
router.get('/user/view',authenticate, viewUser);

export default router; 
 