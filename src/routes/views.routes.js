import express from 'express';
const router = express.Router();

router.get('/signIn', (req, res) => res.render('signIn'));
router.get('/signUp', (req, res) => res.render('signUp'));
router.get('/dashboard-user', (req, res) => res.render('dashboardUser'));
router.get('/dashboard-admin', (req, res) => res.render('dashboardAdmin'));
router.get('/profile', (req, res) => res.render('profile'));
router.get('/403', (req, res) => res.render('403'));

export default router;