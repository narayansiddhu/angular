'use strict';
angular.module('inspinia')
    .controller('profilesettingsCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'blockService','projectService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, blockService,projectService) {
        $scope.block = {};
        $scope.status = "";
        $scope.block.status = true;
        $scope.block.project = "";
        // $scope.regEx = /^[0-9]{10,10}$/;
        projectService.getList().then(function (data) {
            $scope.project = data.result.list;  
        });


        
        if ($state.current.breadcrumb.text == "Edit") {
            blockService.edit($stateParams.id).then(function (data) {
                // console.log(data.result);
                console.log(data.result.projectId);
                $scope.block.projectId = data.result.projectId;
                $scope.block=data.result;
            
                // $scope.block.block=data.result.block;
                // $scope.block.status=data.result.status;
                //   $scope.block.projectName = data.result.projectData.projectName;
                  if($scope.block.status==1001){
                    $scope.block.status =true;
                    $scope.status = 1001;
                    console.log($scope.status);
                }else{
                    $scope.block.status =false;
                    $scope.status = 1002;
                    console.log($scope.status);
                }
                
              });
          }
        // save / update api start here
        $scope.save = function (model) {
            var error = 0;
            if($scope.block.status){
                $scope.status = 1001;

                console.log($scope.status);
            }else{
                $scope.status = 1002;
                console.log($scope.status);
            }
            $scope.errorsinp ={
                "projectId": "",
                "block": "",
              }
              if ($scope.block.projectId == undefined || $scope.block.projectId == '') {
                $scope.errorsinp.projectId = "Please select project";
                error++;
            }
            if ($scope.block.block == undefined || $scope.block.block == '') {
                $scope.errorsinp.block = "Please select block";
                error++;
            }
            console.log($scope.status);
            $scope.post = {
                "projectId":$scope.block.projectId,
                "block":$scope.block.block,
                "status":$scope.status,
            }
            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {
                    blockService.create($scope.post).then(function (data) {
                        console.log(data);
                        $state.go('block');
                        toaster.pop({
                            type: 'success',
                            title: 'block Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    blockService.update($scope.post, $stateParams.id).then(function (data) {
                        $state.go('block');
                        toaster.pop({
                            type: 'success',
                            title: 'block Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
    }]);