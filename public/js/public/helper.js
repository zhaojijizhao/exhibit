define(['jquery','underscore','backbone'],
	function($,_,Backbone){
		var helper={
			islogin:function(){
				return !!localStorage.getItem("exhibitUser")
			},
			setlogin:function(data){
				localStorage.setItem("exhibitUser",JSON.stringify(data));
			},
			getlogin:function(){
				return JSON.parse(localStorage.getItem("exhibitUser"));
			},
			deletelogin:function(){
				localStorage.removeItem("exhibitUser");
			},
			setrefer:function(str){
				localStorage.setItem("exhibitRefer",str);
			},
			getrefer:function(){
				return localStorage.getItem("exhibitRefer");
			},
			template:{
				userTemplate:'<ul class="user-list">\
									<li>\
										<span class="fl w50">所有人</span>\
										<span class="f1">&nbsp;</span>\
										<span class="fr w80 tc"><button class="send">发送所有人</button></span>\
									</li>\
									<% _.each(user,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.name%></span>\
											<span class="f1"><%=v.cell%></span>\
											<span class="fr w80 tc"><button class="send" uid=<%=v._id%>>发送</button></span>\
										</li>\
									<%});%>\
								</ul>',
				requestListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<span class="fr w80 tc"><a class="detail" href="/client/request/detail/<%=v._id%>">查看详情</a></span>\
										</li>\
									<%});%>\
								</ul>',
				onlinerequestListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<%if(v.state==2){%>\
												<span class="f1 red">已确认</span>\
												<span class="fr w80 tc"><a class="orange" href="/online/result/<%=v.offer_id%>">查看报表</a></span>\
											<%}%>\
											<span class="fr w80 tc"><a class="detail" href="/online/client/request/detail/<%=v._id%>">查看详情</a></span>\
										</li>\
									<%});%>\
								</ul>',
				mobilerequestListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<%if(v.state==2){%>\
												<span class="f1 red">已确认</span>\
												<span class="fr w80 tc"><a class="orange" href="/mobile/result/<%=v.offer_id%>">查看报表</a></span>\
											<%}%>\
											<span class="fr w80 tc"><a class="detail" href="/mobile/client/request/detail/<%=v._id%>">查看详情</a></span>\
										</li>\
									<%});%>\
								</ul>',
				materialListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<span class="fr w80 tc"><a class="detail" href="/client/material/detail/<%=v._id%>">添加物料</a></span>\
										</li>\
									<%});%>\
								</ul>',
				requestVendorListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<span class="fr w80 tc"><a class="detail" href="/vendor/request/detail/<%=v._id%>">查看详情</a></span>\
										</li>\
									<%});%>\
								</ul>',
				onlinerequestVendorListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<span class="fr w80 tc"><a class="detail" href="/online/vendor/request/detail/<%=v._id%>">查看详情</a></span>\
										</li>\
									<%});%>\
								</ul>',
				mobilerequestVendorListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<span class="fr w80 tc"><a class="detail" href="/mobile/vendor/request/detail/<%=v._id%>">查看详情</a></span>\
										</li>\
									<%});%>\
								</ul>',
				responseRequestListTemplate:'<ul class="request-list">\
									<% _.each(list,function(v,k){%>\
										<li id="<%=v._id%>">\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<!--<span class="fr w80 tc"><a class="detail" eid="<%=v._id%>">点击展开</a></span>-->\
										</li>\
									<%});%>\
								</ul>',
				responseListTemplate:'<li class="trend"><ul class="response-list">\
									<% _.each(list,function(v,k){%>\
										<li>\
											<span class="fl w50"><%=v.info.cname%></span>\
											<span class="f1"><%=v.info.name%></span>\
											<span class="f1">报价：<%=v.total%>元</span>\
											<span class="fr w80 tc"><a class="response" href="/client/response/detail/<%=v._id%>" >查看详情</a></span>\
										</li>\
									<%});%>\
								</li></ul>',
				onlineresponseListTemplate:'<ul class="response-list">\
									<%if(list.length>0){%>\
										<% _.each(list,function(v,k){%>\
											<li>\
												<span class="f1 w50"><%=v.uname%></span>\
												<span class="f1">报价得分：90分</span>\
												<span class="f1">服务满意度：90分</span>\
												<span class="f1">报价：<span class="red"><%=v.total%></span>元</span>\
												<span class="fr w80 tc"><a class="response" target="blank" href="/online/client/response/detail/<%=v._id%>" >查看详情</a></span>\
											</li>\
										<%});%>\
									<%}else{%>\
										<li>目前暂无报价</li>\
									<%}%>\
								</ul>',
				mobileresponseListTemplate:'<ul class="response-list">\
									<%if(list.length>0){%>\
										<% _.each(list,function(v,k){%>\
											<li>\
												<span class="f1 w50"><%=v.uname%></span>\
												<span class="f1">报价得分<br/>90分</span>\
												<span class="f1">服务满意度<br/>90分</span>\
												<span class="f1">报价<br/><span class="red"><%=v.total%></span>元</span>\
												<span class="fr w80 tc"><a class="response" target="blank" href="/mobile/client/response/detail/<%=v._id%>" >查看详情</a></span>\
											</li>\
										<%});%>\
									<%}else{%>\
										<li>目前暂无报价</li>\
									<%}%>\
								</ul>',
				hotListTemplate:'<ul class="response-list">\
									<%if(list.length>0){%>\
										<% _.each(list,function(v,k){%>\
											<li>\
												<span class="fl w50"><%=v.info.cname%></span>\
												<span class="f1"><%=v.info.name%></span>\
												<span class="f1">报价：<%=v.total%>元</span>\
											</li>\
										<%});%>\
									<%}else{%>\
										<li>目前暂无报价</li>\
									<%}%>\
								</ul>',
				onlineresponseVendorListTemplate:'<ul class="response-list">\
									<%if(list.length>0){%>\
										<% _.each(list,function(v,k){%>\
											<li>\
												<span class="fl w50"><%=v.info.cname%></span>\
												<span class="f1"><%=v.info.name%></span>\
												<span class="f1">报价：<%=v.total%>元</span>\
												<%if(v.state==2){%>\
													<span class="f1 red">已确认</span>\
													<span class="fr w80 tc"><a class="orange" href="/online/result/<%=v._id%>">查看报表</a></span>\
												<%}%>\
												<span class="fr w80 tc"><a class="response" href="/online/vendor/response/detail/<%=v._id%>" >查看详情</a></span>\
											</li>\
										<%});%>\
									<%}else{%>\
										<li>目前暂无报价</li>\
									<%}%>\
								</ul>',
				mobileresponseVendorListTemplate:'<ul class="response-list">\
									<%if(list.length>0){%>\
										<% _.each(list,function(v,k){%>\
											<li>\
												<span class="fl w50"><%=v.info.cname%></span>\
												<span class="f1"><%=v.info.name%></span>\
												<span class="f1">报价：<%=v.total%>元</span>\
												<%if(v.state==2){%>\
													<span class="f1 red">已确认</span>\
													<span class="fr w80 tc"><a class="orange" href="/mobile/result/<%=v._id%>">查看报表</a></span>\
												<%}%>\
												<span class="fr w80 tc"><a class="response" href="/mobile/vendor/response/detail/<%=v._id%>" >查看详情</a></span>\
											</li>\
										<%});%>\
									<%}else{%>\
										<li>目前暂无报价</li>\
									<%}%>\
								</ul>',
				onlineLoginTemplate:'<ul class="toplink fr">\
									<li>欢迎您:<%=name%>&nbsp;<%=cell%></li>\
									<li><a id="exit" href="#">退出</a></li>\
									<li><a href="/online/collect">收藏我们</a></li>\
								</ul>',
				mobileLoginTemplate:'\
									<li><%=name%></li>\
									<li><%=cell%></li>\
									<li><a id="exit" href="#">退出</a></li>\
									<li><a href="/online/collect">收藏我们</a></li>',
				pagecontent:'<%var max = Math.ceil(count/limit);%>\
							<div class="pagelist">\
								<a <%if(page>1){%>href="<%=(baseurl+(page-1))%>"<%}%> class="<%if(page==1){%>off<%}%>" >上一页</a>\
								<%if(page>4){%>...<%}%>\
								<% _.each(_.range(-3,4),function(v,k){\
									if(page+v>0 && page+v<=max){%>\
									<a href="<%=(baseurl+(page+v))%>" class="<%if(v==0){%>on<%}%>" ><%=(page+v)%></a>\
								<%}});%>\
								<%if(max-page>3){%>...<%}%>\
								<a <%if(page<max){%>href="<%=(baseurl+(page+1))%>"<%}%> class="<%if(page==max){%>off<%}%>" >下一页</a>\
							</div>'
			}
		};
	return helper;
});