const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const permissionController = require('../controllers/permissionController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const rbac = require('../middlewares/rbac');

const resourceRoutes = require('./resource');

// Auth
router.post('/login', authController.login);
router.post('/register', userController.register);

// User
router.get('/users', auth, userController.getAll);
router.post('/users/assign-role', auth, userController.assignRole);

// Role
router.post('/roles', auth, roleController.create);
router.get('/roles', auth, roleController.getAll);
router.post('/roles/assign-permission', auth, roleController.assignPermission);

// Permission
router.post('/permissions', auth, permissionController.create);
router.get('/permissions', auth, permissionController.getAll);

// Example protected route
router.get('/protected', auth, rbac('view_protected'), (req, res) => {
  res.json({ message: 'You have access to protected route!' });
});

// Resource CRUD
router.use('/resources', resourceRoutes);

module.exports = router;
