'use strict';
angular.module('inspinia')
    .controller('loginCtrl', function ($scope, loginService, $state, $rootScope, $cookieStore, toaster, $timeout, configurationService) {
        $scope.errorLogin = "";
        if ($cookieStore.get('loginAccess') == undefined) {
            $rootScope.hideView = true;
        } else {
            $rootScope.hideView = false;
        }
        $scope.baseUrl = configurationService.baseUrl();

        $scope.login = {};
        $scope.onSubmit = function () {
            $scope.errorLogin = "";
            
            loginService.getLogin($scope.login).then(function (data) {

                console.log(data);
                if (data.success == true) {
                    $rootScope.hideView = false;
                    // get admin userid api  start here
                    data.baseUrl = $scope.baseUrl;
                    $cookieStore.put("loginAccess", data);
                    // get admin userid api end here 
                    $state.go('dashboard');
                    toaster.success('Welcome To Dashboard');
                } else {
                    $scope.errorLogin = "Login failed! Please Check Username And Password";
                }
            });
        };
    });
