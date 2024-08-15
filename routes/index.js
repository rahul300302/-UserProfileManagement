import express from 'express';
import { addAdmin } from '../controller/Admin/addAdmin.js';
import { updateAdmin } from '../controller/Admin/updateAdmin.js';
import { viewAdmin } from '../controller/Admin/viewAdmin.js';
import { addUser } from '../controller/user/addUser.js';
import { updateUser } from '../controller/user/updateUser.js';
import { viewUser } from '../controller/user/viewUser.js';
import { authenticate } from '../authentication.js';

const router = express.Router();

router.post('/admin/add', addAdmin);
router.put('/admin/update',updateAdmin);
router.get('/admin/view',viewAdmin);

router.post('/user/add', addUser);
router.put('/user/update', updateUser);
router.get('/user/view', viewUser);

export default router;
