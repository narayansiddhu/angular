'use strict';

angular.module('inspinia')
    .controller('logoutCtrl', function($scope, loginService, $state, $rootScope, $cookieStore) {
        $cookieStore.remove('loginAccess'); 
        $state.go('login');
        $scope.hideView = true;   
    }); 
