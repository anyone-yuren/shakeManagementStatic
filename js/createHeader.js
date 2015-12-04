define(['jquery','API'],function($,api) {
	var CreateHeader = function(dom,params,callback) {
		this.parentDom = $(dom);
		this.postUrl = params.url;
		this.init(function() {
			callback&&callback();
		});
	}
	CreateHeader.prototype = {
		/*初始化头部*/
		init:function(callback) {
			var me = this;
			me.createDom();
		},
		createDom : function() {
			var me = this;
			/*请求加载头部数据*/
			api.doAjax(me.postUrl,'',function(obj) {
				var content = '';
				var navDom = getNavDom(obj.data);
				me.parentDom.append(navDom);
			}) 
			
		},
		_thisEvent:function() {
			
		}
	}
	function getNavDom(data) {
		var content = '<ul class="nav navbar-nav">';
		$.each(data, function(index,node) {
			var dpLis = '';
			if(node.child) {
				dpLis = '<ul class="dropdown-menu" role="menu">';
				$.each(node.child,function(index,obj) {
					dpLis+='<li> <a href="'+obj.url+'">'+obj.name+'</a></li>'
				});
				dpLis+='</ul>';
			};
			content+='<li class="dropdown">'+
						'<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+node.name+'<span class="caret"></span></a>'+
						dpLis+
					'</li>'
		});
		content+='</ul>';
		return content;
	}
	/*定义初始化参数配置*/
	CreateHeader.prototype.defaults = {
		
	};
	return CreateHeader;
})