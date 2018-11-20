var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'DSSD-Users' });
});

router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

router.post('/api/login', userController.login)

module.exports = router;
