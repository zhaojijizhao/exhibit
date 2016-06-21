var express = require('express');
var router = express.Router();

/* GET vendor page. */
router.get('/login', function(req, res, next) {
  res.render('./normal/login', { path:'normal/login',title: '登录' });
});

router.get('/sign', function(req, res, next) {
  res.render('./normal/sign', { path:'normal/sign',title: '注册' });
});

module.exports = router;
