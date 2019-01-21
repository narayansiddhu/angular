'use strict';

angular.module('inspinia').service('configurationService', ['$q','$location', function($q,$location) {
    this.baseUrl = function() {
       	return "http://54.169.63.1:3050/api";                                                      
       	//return "http://10.3.101.232:3045/api";                                                      
    }     
}]);      

