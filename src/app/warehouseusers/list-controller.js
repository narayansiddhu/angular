'use strict';

angular.module('inspinia')
    .controller('wareHouseUsersListCtrl', function($scope, $state, toaster, $stateParams, stockService, $timeout,wareHouseUsersService) {
        var vm = this;
        //console.log($stateParams);
        
        // list franchise start here
        $scope.listWareHouse = function() {
            wareHouseUsersService.listHouseUser().then(function(data) {
                console.log(data); 
                vm.list = data;
                $scope.wareHouseList = data;
            });
        }
        $scope.listWareHouse(); 
        // list franchise end here

        $scope.edit = function(id) {

            $state.go('warehouse.edit', { id: id});
        } 


        $scope.delete = function(id) { 
            wareHouseUsersService.deleteHouseUser(id).then(function(data) {
                if (data.count == 1) {
                    toaster.success('User Successfully Deleted!');
                    wareHouseUsersService.listHouseUser().then(function(data) {
                        $scope.wareHouseList = data;
                        $state.go('warehouse'); 
                    })
                } else {
                    console.log(data.error);
                    toaster.warning('Unable to delete');
                }
            })
        }
    });
