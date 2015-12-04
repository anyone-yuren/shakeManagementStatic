require.config({
	paths:{
		'jquery':'../libs/jquery.min',
		'bs':'../libs/bootstrap.min',
		'API':'../js/common'//公共类包
	},
	shim:{
		//解决bs和jq之间的依赖关系
		'bs':{
			deps:['jquery']
		}
	}
}) 

require(['jquery','bs','../js/createHeader','../js/createBroadSide','API'],function($,bs,CtHeader,CtBside,api) {
	/*加载请求路径*/
	api.loadConfig('../data/loadConfig.json',function(config) {
		var ctheader = new CtHeader('.header .collapse',{
			url:config.master.loadHeader.value,
			/*后期添加新的参数...*/
		});
		var broadside = new CtBside('.content-left',{
			url:config.master.loadHeader.value
		},function() {
			
		});
	});
})