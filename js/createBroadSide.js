define(['jquery', 'API'], function($, api) {
	var CreateBroadSize = function(dom, params, callback) {
		/*定义默认左侧菜单栏参数*/
		this.defaults = {
			url: '',
			defaultIcon: 'glyphicon glyphicon-cog'
		};
		this.options = $.extend({}, this.defaults, params);
		this.parentDom = $(dom);

		/*创建侧边栏*/
		this.init(function(me) {
			me._initEvent()
		});
	}
	CreateBroadSize.prototype = {
		/*初始化侧边栏*/
		init: function(callback) {
			var me = this;
			/*请求侧边栏数据*/
			api.doAjax(me.options.url, {}, function(obj) {
				obj.data.length ? (function() {
					var child = me.createDom(obj.data);
					var panelGroup = '<div class="panel-group" id="accordion">' + child + '</div>';
					me.parentDom.html(panelGroup);
					callback&&callback(me);
				})() : alert('没有数据');
			})
		},
		/*创建don节点*/
		createDom: function(data) {
			var content = '';
			$.each(data, function(index, node) {
				var child = '';
				/*如果有子节点。则创建*/
				if (node.child.length) {
					var alist = '';
					$.each(node.child, function(e, obj) {
						alist += '<a href="#" data-url="' + obj.url + '" class="list-group-item"><i class="fa fa-caret-right"></i>' + obj.name + '</a>'
					});
					child += '<div id="collapse' + index + '" class="panel-collapse collapse">' +
						'<div class="list-group">' +
						alist +
						'</div>' +
						'</div>'
				};
				content += '<div class="panel panel-default">' +
					'<div class="panel-heading">' +
					'<h4 class="panel-title">' +
					'<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + index + '">' +
					'<div class="media-left"><span class="glyphicon glyphicon-cog"></span></div>' +
					'<div class="media-body text-center">' + node.name + '</div>' +
					'<div class="media-right"><span class="badge">4</span></div>' +
					'</a>' +
					'</h4>' +
					'</div>' +
					child +
					'</div>'
			});
			return content;
		},
		/*初始化列表菜单事件*/
		_initEvent: function() {
			var me = this;
			me.parentDom.find('.panel-collapse').on('click','.list-group-item',function() {
				$(this).css({'color':'blue'})
			})
		}
	}

	return CreateBroadSize;
});