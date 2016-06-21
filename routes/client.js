var express = require('express');
var router = express.Router();
var collection = require('../model/collection');

/* GET client page. */
router.get('/index', function(req, res, next) {
  res.render('./client/index', { path: 'client/index',title: '客户端首页' });
});

router.get('/request/creat', function(req, res, next) {
  res.render('./client/request/creat', { path: 'client/request/creat',title: '新建需求' });
});

router.get('/request', function(req, res, next) {
  res.render('./client/request/list', { path: 'client/request/list',title: '我的需求' });
});

router.get('/request/detail/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./client/request/detail', { path: 'client/request/detail',title: '需求详情',detail:data});
      }
    }
  );
});

router.get('/response', function(req, res, next) {
  res.render('./client/request/list', { path: 'client/response/list',title: '我的报价' });
});

router.get('/response/detail/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./client/response/detail', { path: 'client/response/detail',title: '报价详情',detail:data});
      }
    }
  );
  
});

router.get('/material', function(req, res, next) {
  res.render('./client/material/list', { path: 'client/material/list',title: '物料列表' });
});

router.get('/material/detail/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./client/material/detail', { path: 'client/material/detail',title: '物料详情',detail:data});
      }
    }
  );
});

router.get('/result', function(req, res, next) {
  res.render('./client/result/list', { path: 'client/result/list',title: '成交结果' });
});

router.get('/result/detail', function(req, res, next) {
  res.render('./client/result/detail', { path: 'client/result/detail',title: '结果详情' });
});

module.exports = router;
