'use strict';

angular.module('inspinia')
    .controller('profilesettingsListCtrl', function ($scope, $state, FileUploader, blockService, toaster, $stateParams) {
        $scope.getList = function () {
            blockService.getList().then(function (data) {
                $scope.block = data.result.list; 
                console.log($scope.block); 
            });
        }
        $scope.getList();
        // get user list api end here
        /********************Excel start  ***********************/
        $scope.exportToExcel = function () {
            alasql('SELECT * INTO XLSX("myinquires.xlsx",{headers:true}) \
                    FROM HTML("#tableToExport",{headers:true})');
        };
        /********************Excel end  ***********************/

        // Delete block api start here
        $scope.delete = function (id) {
            console.log(id);
            blockService.delete(id).then(function (data) {
                console.log(data.result);
                if (data.result.count == 1) {
                    blockService.getList().then(function (data) {
                        $scope.block = data.result.list;  
                    });
                    toaster.success('block Successfully Deleted!');
                     

                } else {
                    toaster.warning('Unable to delete');
                }
            })
        }
        // Delete block api end here

        $scope.edit = function (id) {
            $state.go('profilesettings.edit', {
                id: id
            });
        }
    });