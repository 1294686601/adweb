// 百度地图API功能
var map = new BMap.Map("allmap");    // 创建Map实例
map.centerAndZoom(new BMap.Point(121.600756, 31.196855), 12);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

var mainApp = angular.module("mainApp", []);
mainApp.config(function($provide) {
	$provide.provider('MathService', function() {
		this.$get = function() {
			var factory = {};
			factory.search = function(a, b) {
				map.clearOverlays();
				var walking = new BMap.WalkingRoute(map, 
                    {renderOptions: {map: map, panel: "result", autoViewport: true}});
				walking.search(a, b);
				return "具体路线如下：";
            }
        	return factory;
        };
    });
});
			
mainApp.value("defaultInput", 5);

mainApp.factory('MathService', function() {
	var factory = {};
    factory.search = function(a, b) {
    	var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "result", autoViewport: true}});
		walking.search(a, b);
    	return "具体路线如下：";
    }
    return factory;
});


mainApp.service('CalcService', function(MathService){
    this.work = function(start, end) {
    	return MathService.search(start, end);
    }
});
         
mainApp.controller('CalcController', function($scope, CalcService) {
    //$scope.result = CalcService.square($scope.number);

    $scope.work = function() {
    	//alert($scope.start + " " + $scope.end);
    	$scope.result = CalcService.work($scope.start, $scope.end);
    }
});