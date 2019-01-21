'use strict';

angular.module('inspinia')
    .controller('usersListCtrl', function ($scope, $state, FileUploader, usersService, toaster, $stateParams) {
        usersService.getList().then(function (data) {
                $scope.users = data.result.list; 
                console.log($scope.users); 
            });
        // get user list api end here
        /********************Excel start  ***********************/
        $scope.exportToExcel = function () {
            alasql('SELECT * INTO XLSX("users.xlsx",{headers:true}) \
                    FROM HTML("#tableToExport",{headers:true})');
        };
        /********************Excel end  ***********************/

        // Delete  api start here
        $scope.delete = function (id) {
            console.log(id);
            usersService.delete(id).then(function (data) {
                console.log(data.result);
                if (data.result.count == 1) {
                    usersService.getList().then(function (data) {
                        $scope.users = data.result.list;  
                    });
                    toaster.success('User Successfully Deleted!');
                     

                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete  api end here

        $scope.edit = function (id) {
            $state.go('users.edit', {
                id: id
            });
        }
    });