define(['jquery'],function($) {
	var api = {};
	/*公共请求*/
	api.doAjax  = function(url,params,callback) {
		$.ajax({
			type:"get",
			url:url,
			data:params,
			success:function(ret) {
				callback&&callback(ret);
			},
			error: function(e) {
				console.error('get global config error!');
				console.error(e);
			}
		});
	};
	//初始化加载主页请求路径
	api.loadConfig = function(url,callback) {
		api.doAjax(url,'',function(obj) {
			/*将获取到的请求地址对象丢出去*/
			window.config = obj;
			callback&&callback(obj);
		})
	};
	return api;
});