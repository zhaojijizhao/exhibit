var express = require('express');
var router = express.Router();
var collection = require('../model/collection');
var staticmodel = require('../model/staticmodel');

/* GET online page. */
router.get('/index', function(req, res, next) {
  res.render('./online/index', { 
    nav:'首页',
    path:'online/index',
    title: '建正会展' 
  });
});

router.get('/login', function(req, res, next) {
  res.render('./online/login', { 
    nav:'首页',
    path:'online/login',
    title: '建正会展--登录' 
  });
});

router.get('/sign', function(req, res, next) {
  res.render('./online/sign', { 
    nav:'首页',
    path:'online/sign',
    title: '建正会展--注册' 
  });
});

router.get('/quicksign', function(req, res, next) {
  res.render('./online/quicksign', { 
    nav:'首页',
    path:'online/quicksign',
    title: '建正会展--一键注册' 
  });
});

router.get('/profile/:id', function(req, res, next) {
  res.render('./online/profile', { 
    nav:'首页',
    path:'online/profile',
    uid: req.params.id,
    title: '建正会展--用户中心' 
  });
});

router.get('/client/creat', function(req, res, next) {
  res.render('./online/client/request/creat', { 
    nav:'发布需求',
    path:'online/client/request/creat',
    title: '建正会展--发布需求',
    city:staticmodel.city
  });
});

router.get('/client/request', function(req, res, next) {
  res.render('./online/client/request/list', { 
    nav:'我的需求',
    path:'online/client/request/list',
    title: '建正会展--我的需求',
    page: 1
  });
});

router.get('/client/request/:page', function(req, res, next) {
  res.render('./online/client/request/list', { 
    nav:'我的需求',
    path:'online/client/request/list',
    title: '建正会展--我的需求',
    page: req.params.page
  });
});

router.get('/client/request/detail/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./online/client/request/detail', { 
          nav:'我的需求',
          path: 'online/client/request/detail',
          title: '建正会展--我的需求',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/client/response', function(req, res, next) {
  res.render('./online/client/response/list', { 
    nav:'收到报价',
    path:'online/client/response/list',
    title: '建正会展--收到报价',
    page: 1
  });
});

router.get('/client/response/:page', function(req, res, next) {
  res.render('./online/client/response/list', { 
    nav:'收到报价',
    path:'online/client/response/list',
    title: '建正会展--收到报价',
    page: req.params.page
  });
});

router.get('/client/response/detail/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./online/client/response/detail', { 
          nav:'收到报价',
          path: 'online/client/response/detail',
          title: '建正会展--收到报价',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/vendor/request', function(req, res, next) {
  res.render('./online/vendor/request/list', { 
    nav:'所有需求',
    path:'online/vendor/request/list',
    title: '建正会展--所有需求',
    page: 1
  });
});

router.get('/vendor/request/:page', function(req, res, next) {
  res.render('./online/vendor/request/list', { 
    nav:'所有需求',
    path:'online/vendor/request/list',
    title: '建正会展--所有需求',
    page: req.params.page
  });
});

router.get('/vendor/request/detail/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./online/vendor/request/detail', { 
          nav:'所有需求',
          path: 'online/vendor/request/detail',
          title: '建正会展--所有需求',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/vendor/response/creat/:id', function(req, res, next) {
  collection.exhibit.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./online/vendor/response/creat', { 
          nav:'我的报价', 
          path: 'online/vendor/response/creat',
          title: '建正会展--我的报价',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/vendor/response', function(req, res, next) {
  res.render('./online/vendor/response/list', { 
    nav:'我的报价',
    path:'online/vendor/response/list',
    title: '建正会展--我的报价',
    page:1
  });
});

router.get('/vendor/response/:page', function(req, res, next) {
  res.render('./online/vendor/response/list', { 
    nav:'我的报价',
    path:'online/vendor/response/list',
    title: '建正会展--我的报价',
    page: req.params.page 
  });
});


router.get('/vendor/response/detail', function(req, res, next) {
  res.render('./online/vendor/response/detail', { 
    nav:'我的报价',
    path: 'online/vendor/response/detail',
    title: '建正会展--我的报价' 
  });
});

router.get('/vendor/response/detail/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        res.render('./online/vendor/response/detail', { 
          nav:'我的报价',
          path: 'online/vendor/response/detail',
          title: '建正会展--我的报价',
          detail:data,
          city:staticmodel.city
        });
      }
    }
  );
});

router.get('/about', function(req, res, next) {
  res.render('./online/about', { 
    nav:'关于我们',
    path: 'online/about',
    title: '建正会展--关于我们' 
  });
});

router.get('/show', function(req, res, next) {
  res.render('./online/show', { 
    nav:'展示',
    path: 'online/show',
    title: '建正会展--展示' 
  });
});

router.get('/video', function(req, res, next) {
  res.render('./online/video', { 
    nav:'视频会议',
    path: 'online/video',
    title: '建正会展--视频会议' 
  });
});

router.get('/room', function(req, res, next) {
  res.render('./online/room', { 
    nav:'虚拟会议室',
    path: 'online/room',
    title: '建正会展--虚拟会议室' 
  });
});

router.get('/hot', function(req, res, next) {
  res.render('./online/hot', { 
    nav:'热门区域',
    path: 'online/hot',
    title: '建正会展--热门区域',
    page:1,
    clientname:'',
    projectname:''
  });
});

router.get('/hot/:page', function(req, res, next) {
  res.render('./online/hot', { 
    nav:'热门区域',
    path: 'online/hot',
    title: '建正会展--热门区域',
    page: req.params.page,
    clientname:'',
    projectname:''
  });
});

router.get('/hot/:page/:clientname/:projectname', function(req, res, next) {
  var cn = req.params.clientname;
  var pn = req.params.projectname;
  if(cn=='nil'){
    cn = '';
  }
  if(pn=='nil'){
    pn = '';
  }
  res.render('./online/hot', {
    nav:'热门区域',
    path: 'online/hot',
    title: '建正会展--热门区域',
    page: req.params.page,
    clientname: cn,
    projectname: pn
  });
});

router.get('/result/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        if(data.state!=2){
          res.json(err,500);
        }else{
          collection.vendorer.find({_id:data.uid},function(usererr,userdata){
            if(err){
              res.json(err,500);
            }else{
              if(userdata.length>0){
                res.render('./online/result', {
                  nav:'报价报表',
                  path: 'online/result',
                  title: '建正会展--报价报表',
                  detail:data,
                  vendor:userdata,
                  city:staticmodel.city
                });
              }else{
                res.json(err,500);
              }
            }
          });
        }
      }
    }
  );
});

router.get('/account', function(req, res, next) {
  res.render('./online/account', {
    nav:'子账号',
    path: 'online/account',
    title: '建正会展--子账号'
  });
});

module.exports = router;