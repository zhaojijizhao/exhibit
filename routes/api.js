var express = require('express');
var router = express.Router();
var collection = require('../model/collection');
var http = require('http');
var qs = require('querystring');
//var excel = require('node-excel-export');

/* api listing. */

//短信接口
var site = 'http://112.74.77.61:3000/';
function sendmsg(cell,msg){
	var post_data = {
		uid: 80972,
	  auth: '931dcbe18d7f424c61115d0fe991c87d',
	  mobile: cell,
	  msg: msg,
	  expid: 0
	};
	var content = qs.stringify(post_data);
	var options = {
	  hostname: '114.55.5.4',
	  port: 80,
	  path: '/hy/',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	  }
	};
	var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
       console.log('BODY: ' + chunk);
    });
	});
	req.on('error', function (e) {
	    console.log('problem with request: ' + e.message);
	});
	req.write(content);
	req.end();
}
function randomcode(){
	var result= [];
	for(var i = 0; i<6; i++){
		result.push(parseInt(Math.random()*10));
	}
	return result.join("");
}
// router.get('/test',function(req, res, next){
// 	sendmsg(13818754347,"大家好");
// 	res.json({});
// });

//cms接口
router.get('/cmsgetpersonaluser', function(req, res, next) {
	collection.clienter.find({type:'personal'},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/cmssetpersonaluser', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				req.body.user.type = "personal";
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsdeletepersonaluser', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.remove(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsaddpersonaluser', function(req, res, next) {
	req.body.user.type = "personal";
	var todo = new collection.clienter(req.body.user);
	var name = req.body.user.name;
	var cell = req.body.user.cell;
	collection.clienter.find({cell:cell},function(err,databycell){
		if(err){
			res.json(err,500);
		}else{
			if(databycell.length>0){
				res.json({msg:"手机号已经存在"},500);
			}else{
				collection.clienter.find({name:name},function(err,databyname){
					if(err){
						res.json(err,500);
					}else{
						if(databyname.length>0){
							res.json({msg:"用户名已经存在"},500);
						}else{
							todo.save(function(err){
								if(err){
									res.json(err,500);
								}else{
									res.json(todo);
								}
							});
						}
					}
				});
			}
		}
	});
});

router.get('/cmsgetclientuser', function(req, res, next) {
	collection.clienter.find({type:'client'},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/cmssetclientuser', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsdeleteclientuser', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.remove(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsaddclientuser', function(req, res, next) {
	var todo = new collection.clienter(req.body.user);
	var name = req.body.user.name;
	var cell = req.body.user.cell;
	collection.clienter.find({cell:cell},function(err,databycell){
		if(err){
			res.json(err,500);
		}else{
			if(databycell.length>0){
				res.json({msg:"手机号已经存在"},500);
			}else{
				collection.clienter.find({name:name},function(err,databyname){
					if(err){
						res.json(err,500);
					}else{
						if(databyname.length>0){
							res.json({msg:"用户名已经存在"},500);
						}else{
							todo.save(function(err){
								if(err){
									res.json(err,500);
								}else{
									res.json(todo);
								}
							});
						}
					}
				});
			}
		}
	});
});

router.get('/cmsgetvendoruser', function(req, res, next) {
	collection.vendorer.find({},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/cmssetvendoruser', function(req, res, next) {
	collection.vendorer.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsdeletevendoruser', function(req, res, next) {
	collection.vendorer.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.remove(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/cmsaddvendoruser', function(req, res, next) {
	var todo = new collection.vendorer(req.body.user);
	var name = req.body.user.name;
	var cell = req.body.user.cell;
	collection.vendorer.find({cell:cell},function(err,databycell){
		if(err){
			res.json(err,500);
		}else{
			if(databycell.length>0){
				res.json({msg:"手机号已经存在"},500);
			}else{
				collection.vendorer.find({name:name},function(err,databyname){
					if(err){
						res.json(err,500);
					}else{
						if(databyname.length>0){
							res.json({msg:"用户名已经存在"},500);
						}else{
							todo.save(function(err){
								if(err){
									res.json(err,500);
								}else{
									res.json(todo);
								}
							});
						}
					}
				});
			}
		}
	});
});

router.get('/cmsexhibitlist', function(req, res, next) {
	collection.exhibit.find().sort('-created_at').exec(function(err,data){
		if(err){
			res.json(err,500);
		}else{
			res.json(data);
		}
	});
});

router.get('/cmsexhibitdetail/:id', function(req, res, next) {
	var id = req.params.id;
	collection.exhibit.find({_id:id},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			res.json(data);
		}
	});
});

router.post('/cmsexhibitpass/:id', function(req, res, next) {
	var id = req.params.id;
	collection.exhibit.findById(id,function(err,data){
		var todo = data;
		if(err){
			res.json(err,500);
		}else{
			todo.set(req.body.exhibit);
			todo.save(function(err){
				if(err){
					res.json(err,500);
				}else{
					res.json(todo);
				}
			});
		}
	});
});

router.post('/cmsexhibitfail/:id', function(req, res, next) {
	var id = req.params.id;
	collection.exhibit.findById(id,function(err,data){
		var todo = data;
		if(err){
			res.json(err,500);
		}else{
			todo.set(req.body.exhibit);
			todo.save(function(err){
				if(err){
					res.json(err,500);
				}else{
					res.json(todo);
				}
			});
		}
	});
});

//apply申请
router.get('/apply', function(req, res, next) {
	var type = req.query.type;
	collection.applyer.find({type:type,state:0},function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(todo);
			}
		}
	);
});

router.post('/apply', function(req, res, next) {
	var todo = new collection.applyer(req.body.apply);
	todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			res.json(todo);
		}
	});
});

router.post('/applyset', function(req, res, next) {
	collection.applyer.findById(req.body.apply._id,function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.apply);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

//design定制
router.get('/design', function(req, res, next) {
	collection.design.find({state:0},function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(todo);
			}
		}
	);
});

router.post('/design', function(req, res, next) {
	var todo = new collection.design(req.body.design);
	todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			res.json(todo);
		}
	});
});

router.post('/designset', function(req, res, next) {
	collection.design.findById(req.body.design._id,function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.design);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});


//user api
//用户登录
router.post('/login', function(req, res, next) {
	var name = req.body.user.name,
		psw = req.body.user.psw,
		cell = req.body.user.cell;
	collection.user.find({name:name,psw:psw,cell:cell},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				if(data.length>0){
					res.json(this.todo);
				}else{
					res.json(err,500);
				}
			}
		}
	);
});

router.post('/clientlogin', function(req, res, next) {
	var name = req.body.user.name,
		psw = req.body.user.psw,
		type = req.body.user.type || "client";
	collection.clienter.find({name:name,psw:psw,type:type},function(err,databyname){
		if(err){
			res.json(err,500);
		}else{
			if(databyname.length>0){
				res.json(databyname);
			}else{
				collection.clienter.find({psw:psw,cell:name,type:type},function(err,databycell){
					if(err){
						res.json(err,500);
					}else{
						if(databycell.length>0){
							res.json(databycell);
						}else{
							res.json(err,500);
						}
					}
				});
			}
		}
	});
});

router.post('/vendorlogin', function(req, res, next) {
	var name = req.body.user.name,
		psw = req.body.user.psw;
	collection.vendorer.find({name:name,psw:psw},function(err,databyname){
		if(err){
			res.json(err,500);
		}else{
			if(databyname.length>0){
				res.json(databyname);
			}else{
				collection.clienter.find({psw:psw,cell:name},function(err,databycell){
					if(err){
						res.json(err,500);
					}else{
						if(databycell.length>0){
							res.json(databycell);
						}else{
							res.json(err,500);
						}
					}
				});
			}
		}
	});
});

router.post('/clientcheck', function(req, res, next) {
	var cell = req.body.user.cell;
	var todo;
	var code = randomcode();
	collection.clienter.find({cell:cell},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length <= 0){
				todo = new collection.clienter({cell:cell,code:code});
			}else{
				todo = data[0];
				todo.set({code:code});
			}
			todo.save(function(err){
				if(err){
					res.json(err,500);
				}else{
					sendmsg(data[0].cell,"您的验证是："+code+",请妥善保管。");
					res.json({});
				}
			});
		}
	});
});

router.post('/vendorcheck', function(req, res, next) {
	var cell = req.body.user.cell;
	var todo;
	var code = randomcode();
	collection.vendorer.find({cell:cell},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length <= 0){
				todo = new collection.vendorer({cell:cell,code:code});
			}else{
				todo = data[0];
				todo.set({code:code});
			}
			todo.save(function(err){
				if(err){
					res.json(err,500);
				}else{
					sendmsg(data[0].cell,"您的验证是："+code+",请妥善保管。");
					res.json({});
				}
			});
		}
	});
});

//找回密码
router.post('/clientcallback', function(req, res, next) {
	var cell = req.body.user.cell;
	var name = req.body.user.name;
	collection.clienter.find({cell:cell,name:name},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length > 0 && data[0].psw){
				sendmsg(cell,"您的密码是"+data[0].psw+"请妥善保管");
				res.json({});
			}else{
				res.json(err,500);
			}
		}
	});
});

router.post('/vendorcallback', function(req, res, next) {
	var cell = req.body.user.cell;
	var name = req.body.user.name;
	collection.vendorer.find({cell:cell,name:name},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length > 0 && data[0].psw){
				sendmsg(cell,"您的密码是"+data[0].psw+"请妥善保管");
				res.json({});
			}else{
				res.json(err,500);
			}
		}
	});
});

//用户注册
router.post('/user', function(req, res, next) {
	var todo = new collection.user(req.body.user);
	var cell = req.body.user.cell;
	collection.user.find({cell:cell},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			if(data.length>0){
				res.json(err,500);
			}else{
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	});
});

router.post('/clientuser', function(req, res, next) {
	req.body.user.type = req.body.user.type || "personal";
	var cell = req.body.user.cell;
	var code = req.body.user.code;
	var name = req.body.user.name;
	var todo;
	collection.clienter.find({name:name},function(err,databyname){
		if(err){
			res.json(err,500);
		}else{
			if(databyname.length>0){
				res.json({msg:"用户名已经存在"},500);
			}else{
				collection.clienter.find({cell:cell,code:code},function(err,databycell){
					if(err){
						res.json(err,500);
					}else{
						todo = databycell[0];
						todo.set(req.body.user);
						todo.save(function(err){
							if(err){
								res.json(err,500);
							}else{
								res.json(databycell[0]);
							}
						});
					}
				});
			}
		}
	});
});

router.post('/vendoruser', function(req, res, next) {
	req.body.user.type = req.body.user.type;
	var cell = req.body.user.cell;
	var code = req.body.user.code;
	var name = req.body.user.name;
	var todo;
	collection.vendorer.find({name:name},function(err,databyname){
		if(err){
			res.json(err,500);
		}else{
			if(databyname.length>0){
				res.json({msg:"用户名已经存在"},500);
			}else{
				collection.vendorer.find({cell:cell,code:code},function(err,databycell){
					if(err){
						res.json(err,500);
					}else{
						todo = databycell[0];
						todo.set(req.body.user);
						todo.save(function(err){
							if(err){
								res.json(err,500);
							}else{
								res.json(databycell[0]);
							}
						});
					}
				});
			}
		}
	});
});

//用户更新信息
router.post('/clientupdate', function(req, res, next) {
	collection.clienter.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

router.post('/vendorupdate', function(req, res, next) {
	collection.vendorer.findById(req.body.user._id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.user);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

//子账号
router.post('/accountcreat', function(req, res, next) {
	var total = 0;
	var succ = [];
	function creat(num){
		var todo = new collection.vendorer(req.body.user[num]);
		todo.save(function(err){
			total ++;
			if(err){
			}else{
				succ.push(num);
			}
			if(total == req.body.user.length){
				res.json({
					succ: succ
				});
			}
		});
	}
	for(var i = 0; i < req.body.user.length; i++){
		(function(num){
			creat(num);
		})(i)
	}
});

router.get('/accountget/:id', function(req, res, next) {
	var id = req.params.id;
	collection.vendorer.find({cid:id},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});


//获取用户列表
router.get('/user/list', function(req, res, next) {
	collection.user.find({},'_id name cell',function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

router.get('/user/vendorlist', function(req, res, next) {
	collection.vendorer.find({},'_id name cell',function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

//exhibit api
//获取需求列表
router.get('/exhibit/list/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	var cityid = req.query.cityid;
	var word = req.query.word;
	findobj = {};
	if(cityid>0){
		findobj['info.cid'] = cityid;
	}
	if(word){
		findobj['info.name'] = new RegExp(word);
	}
	findobj.state = 1;
	collection.exhibit.find(findobj).count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.exhibit.find(findobj).sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//获取需求列表
router.get('/exhibit/byvendorid/:id', function(req, res, next) {
	collection.vendorer.find({uid:req.params.id},function(err,data){
		if(err){
			res.json(err,500);
		}else{
			var receivearr = data[0].receive,count=0,result=[];
			for(var i=0;i<receivearr.length;i++){
				collection.exhibit.find({_id:receivearr[i]},function(err,data){
					if(err){
						res.json(err,500);
					}else{
						result.push[data[0]];
						count++;
						if(count==receivearr.length){
							res.json(result);
						}
					}
				});
			}
		}
	});
});

//根据user获取需求列表
router.get('/exhibit/byuid/:id/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	collection.exhibit.find({uid:req.params.id}).count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.exhibit.find({uid:req.params.id}).sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//根据id获取需求
router.get('/exhibit/:id', function(req, res, next) {
	collection.exhibit.findById(req.params.id,
		function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});



//创建需求
router.post('/exhibit', function(req, res, next) {
	this.todo = new collection.exhibit(req.body.exhibit);
	this.todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			res.json(this.todo);
		}
	});
});

//修改需求
router.put('/exhibit/:id', function(req, res, next) {
	collection.exhibit.findById(req.params.id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.set(req.body.exhibit);
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

//修改需求物料
router.put('/exhibit/material/:id', function(req, res, next) {
	collection.exhibit.findById(req.params.id,
		function(err,data){
			var todo = data;
			if(err){
				res.json(err,500);
			}else{
				todo.other = req.body.exhibit.other;
				todo.other_memo = req.body.exhibit.other_memo;
				todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(todo);
					}
				});
			}
		}
	);
});

//发送需求指定id
router.post('/exhibit/send/byuid/:id', function(req, res, next) {
	collection.vendorer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.receive.push(req.body.exhibit_id);
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						collection.exhibit.findById(req.body.exhibit_id,
							function(err,data){
								this.exhibit_todo = data;
								if(err){
									res.json(err,500);
								}else{
									this.exhibit_todo.set('state','1');
									this.exhibit_todo.save(function(err){
										if(err){
											res.json(err,500);
										}else{
											res.json(data);
										}
									});
								}
							}
						);
					}
				});
			}
		}
	);
});

//发送所有人
router.post('/exhibit/send', function(req, res, next) {
	collection.user.find(function(err,data){
		this.todo = data;
		if(err){
			res.json(err,500);
		}else{
			for(var i in data){
				data[i].receive.push(req.body.exhibit_id);
				data[i].save();
			}
		}
	});
	collection.exhibit.findById(req.body.exhibit_id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.set('state','1');
				data.save();
			}
		}
	);
	res.json({},200);
});

//确认需求交易
router.post('/exhibit/confirm/:id', function(req, res, next) {

	var pingpp = require('pingpp')('sk_test_ibbTe5jLGCi5rzfH4OqPW9KC');//pingappapikey
	pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
	pingpp.charges.create({
        subject: "Your Subject",
        body: "Your Body",
        amount: 100,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
        order_no: "123456789",
        channel: "wx",
        currency: "cny",
        client_ip: "127.0.0.1",
        app: {id: "app_1Gqj58ynP0mHeX1q"}
    }, function(err, charge) {
        collection.exhibit.findById(req.params.id,
			function(err,data){
				this.todo = data;
				if(err){
					res.json(err,500);
				}else{
					this.todo.set({state:3});
					this.todo.save(function(err){
						if(err){
							res.json(err,500);
						}else{
							res.json(charge);
						}
					});
				}
			}
		);
    }); 

	
});


//offer api
//获取hotoffer
router.get('/offerhot/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	collection.offer.find().count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.offer.find().sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//获取hotoffer带参数
router.get('/offerhot/:page/:clientname/:projectname', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	var clientname = req.params.clientname;
	var projectname = req.params.projectname;
	if(req.params.clientname=="nil"){
		clientname = "";
	}
	if(req.params.projectname=="nil"){
		projectname = "";
	}
	collection.offer.find()
		.where('info.clientname').equals(new RegExp(clientname))
		.where('info.name').equals(new RegExp(projectname))
		.count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.offer.find()
				.where('info.clientname').equals(new RegExp(clientname))
				.where('info.name').equals(new RegExp(projectname))
				.sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//根据id获取offer
router.get('/offer/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

//根据exhibit获取offer
router.get('/offer/byexhibit/:id', function(req, res, next) {
	collection.offer.find({exhibit_id:req.params.id},function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				res.json(this.todo);
			}
		}
	);
});

//根据user获取offer
router.get('/offer/byuid/:id/:page', function(req, res, next) {
	var page = req.params.page;
	var limit = 20;
	var skip = (page-1)*limit;
	collection.offer.find({uid:req.params.id}).count(function(err,count){
		if(err){
			res.json(err,500);
		}else{
			collection.offer.find({uid:req.params.id}).sort('-created_at').skip(skip).limit(limit).exec(function(err,data){
				if(err){
					res.json(err,500);
				}else{
					res.json({content:data,count:count,limit:limit});
				}
			});
		}
	});
});

//创建offer
router.post('/offer', function(req, res, next) {
	var todo = new collection.offer(req.body.offer);
	todo.save(function(err){
		if(err){
			res.json(err,500);
		}else{
			collection.exhibit.findById(req.body.offer.exhibit_id,
			  function(err,exhibitdata){
			  	if(err){
			  		res.json(err,500);
			  	}else{
			  		collection.clienter.findById(exhibitdata.uid,
			  		  function(err,clientdata){
			  		  	if(err){
			  		  		res.json(err,500);
			  		  	}else{
			  		  		sendmsg(clientdata.cell,"您的需求："+exhibitdata.info.name+",收到一份新的报价。\
			  		  		        详情："+site+"online/client/response/detail/"+todo._id);
									res.json(todo);
			  		  	}
			  		});
			  	}
			});
		}
	});
});

//修改offer
router.put('/offer/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.set(req.body.offer);
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(data);
					}
				});
			}
		}
	);
});

//完成一项
router.put('/offercheck/:id', function(req, res, next) {
	var type = req.body.type;
	var id = req.body.id;
	var val = req.body.val;
	collection.offer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				var obj = data;
				if(type == "fee" || type == "with"){
					if(type=="fee"){
						data.set({'fee.checked':val});
					}else if(type == "with"){
						data.set({'with.checked':val});
					}
				}else{
					for(var i = 0; i < obj[type].length; i++){
						if(obj[type][i]._id == id){
							obj[type][i].checked = val;
						}
					}
					data.set(obj);
				}
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(data);
					}
				});
			}
		}
	);
});

//完成所有
router.put('/offerall/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.set({state:3});
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						collection.exhibit.findById(data.exhibit_id,
							function(eerr,edata){
								if(eerr){
									res.json(eerr,500);
								}else{
									edata.set({state:3});
									edata.save(function(err){
										if(err){
											res.json(err,500);
										}else{
											res.json(data);
										}
									});
								}
							}
						);
					}
				});
			}
		}
	);
});

//发送offer
router.put('/offer/send/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			this.todo = data;
			if(err){
				res.json(err,500);
			}else{
				this.todo.set({state:1});
				this.todo.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						res.json(this.todo);
					}
				});
			}
		}
	);
});

//确认offer
router.post('/offer/confirm/:id', function(req, res, next) {
	collection.offer.findById(req.params.id,
		function(err,data){
			if(err){
				res.json(err,500);
			}else{
				data.set({state:2});
				data.save(function(err){
					if(err){
						res.json(err,500);
					}else{
						collection.exhibit.findById(data.exhibit_id,
							function(err,exhibit_data){
								if(err){
									res.json(err,500);
								}else{
									exhibit_data.set({offer_id:data._id,state:2});
									exhibit_data.save(function(err){
										if(err){
											res.json(err,500);
										}else{
											collection.vendorer.findById(data.uid,
											  function(err,vendordata){
											  	if(err){
											  		res.json(err,500);
											  	}else{
											  		sendmsg(vendordata.cell,"您的对需求："+exhibit_data.info.name+"的报价,已经被确认。\
											  		         详情："+site+"online/vendor/response/detail/"+data._id);
											  		res.json(data);
											  	}
											});
										}
									});
								}
							}
						);
					}
				});
			}
		}
	);
});

//获取result
router.get('/result/:id', function(req, res, next) {
  collection.offer.findById(req.params.id,
    function(err,data){
      if(err){
        res.json(err,500);
      }else{
        if(data.state!=2 && data.state!=3){
          res.json(err,500);
        }else{
          collection.vendorer.findById(data.uid,function(usererr,vendordata){
            if(usererr){
              res.json(err,500);
            }else{
            	collection.exhibit.findById(data.exhibit_id,function(usererr,exhibitdata){
		            if(usererr){
		              res.json(err,500);
		            }else{
		            	collection.clienter.findById(exhibitdata.uid,function(usererr,clientdata){
				            if(usererr){
				              res.json(err,500);
				            }else{
				            	res.json({
			              		offer:data,
			                  vendor:vendordata,
			                  client:clientdata
			              	});
				            }
				          });
		            }
		          });
            }
          });
        }
      }
    }
  );
});


//excel
// router.get('/excel', function(req, res, next) {
// 	var styles = {
// 	  headerDark: {
// 	    fill: {
// 	      fgColor: {
// 	        rgb: 'FF000000'
// 	      }
// 	    },
// 	    font: {
// 	      color: {
// 	        rgb: 'FFFFFFFF'
// 	      },
// 	      sz: 14,
// 	      bold: true,
// 	      underline: true
// 	    }
// 	  },
// 	  cellPink: {
// 	    fill: {
// 	      fgColor: {
// 	        rgb: 'FFFFCCFF'
// 	      }
// 	    }
// 	  },
// 	  cellGreen: {
// 	    fill: {
// 	      fgColor: {
// 	        rgb: 'FF00FF00'
// 	      }
// 	    }
// 	  }
// 	};

// 	var heading = [
// 	  [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
// 	  ['a2', 'b2', 'c2'] // <-- It can be only values 
// 	];

// 	var specification = {
// 	  customer_name: { // <- the key should match the actual data key 
// 	    displayName: 'Customer', // <- Here you specify the column header 
// 	    headerStyle: styles.headerDark, // <- Header style 
// 	    cellStyle: function(value, row) { // <- style renderer function 
// 	      // if the status is 1 then color in green else color in red 
// 	      // Notice how we use another cell value to style the current one 
// 	      return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
// 	    },
// 	    width: 120 // <- width in pixels 
// 	  },
// 	  status_id: {
// 	    displayName: 'Status',
// 	    headerStyle: styles.headerDark,
// 	    cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property 
// 	      return (value == 1) ? 'Active' : 'Inactive';
// 	    },
// 	    width: '10' // <- width in chars (when the number is passed as string) 
// 	  },
// 	  note: {
// 	    displayName: 'Description',
// 	    headerStyle: styles.headerDark,
// 	    cellStyle: styles.cellPink, // <- Cell style 
// 	    width: 220 // <- width in pixels 
// 	  }
// 	}

// 	var dataset = [
// 	  {customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown'},
// 	  {customer_name: 'HP', status_id: 0, note: 'some note'},
// 	  {customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown'}
// 	];

// 	var report = excel.buildExport(
// 	  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
// 	    {
// 	      name: 'Sheet name', // <- Specify sheet name (optional) 
// 	      heading: heading, // <- Raw heading array (optional) 
// 	      specification: specification, // <- Report specification 
// 	      data: dataset // <-- Report data 
// 	    }
// 	  ]
// 	);

// 	res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
// 	res.send(report);

// });

module.exports = router;