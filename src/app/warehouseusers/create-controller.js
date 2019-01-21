'use strict';

angular.module('inspinia')
    .controller('wareHouseUsersCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', 'wareHouseUsersService', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'stockService', 'FileUploader', 'configurationService', '$controller', function($scope, $state, NgMap, toaster, wareHouseUsersService, $timeout, $stateParams, $rootScope, $uibModal, $log, stockService, FileUploader, configurationService, $controller) {

        var polygonInstance;
        var polygonData;
        var regionMap;
        var deliveryMap;
        $scope.wareHouseModel = {};
        $scope.selectedvalue = '';
        $scope.imgobj = [];
        $scope.genders = ['Male', 'Female'];
        $scope.wareHouseModel.gender = "Male";
        $scope.regEx = /^[0-9]{10,10}$/;
        $rootScope.mapLatLngValues = {
            lat: '',
            lng: '',
            data: {},
            message: ''
        };


        // polygon defined text start here

        $rootScope.pmapLatLngValues = {
            lat: '',
            lng: '',
            data: {},
            message: ''
        };

        $rootScope.selectedMaparea = {};

        // $scope.customerModel.dob =  new Date('24-01-1988');


        // pcmap pop code start here 

        $scope.open1 = function(index, selected, size) {
            //  console.log(selected);
            NgMap.getMap('billingmap').then(function(map) {
                regionMap = map;
                google.maps.event.trigger(regionMap, 'resize');
            });
            $scope.searchArea = "Hyderabad";

            $scope.Mapindex = index;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/warehouseusers/mapTemplate.html',
                controller: 'wareHouseMapCtrl',
                size: size,
                // resolve: { 
                //   items: function () {
                //     return $scope.items;
                //   }
                // } 
            });

            modalInstance.result.then(function(selectedItem) {
                $rootScope.pmapLatLngValues = selectedItem;
                $scope.selectedMap = selectedItem;
                latlngAddress($scope.selectedMap.data);

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // Display Data In Edit Region Start Here
        $scope.editRegion = function() {
            if ($state.current.breadcrumb.text == "Edit") {
                wareHouseUsersService.getHouseUser($stateParams.id).then(function(data) {
                    //console.log(data);
                    $scope.wareHouseModel = data;
                    $scope.wareHouseModel.dob = new Date(data.dob);
                });
            }
        }
        $scope.editRegion();

        // Display Data In Edit Region End Here

        $scope.save = function(model) {

            var error = 0;
            $scope.errorsinp = { "firstName": "", "lastName": "", "dob": "", "alternate_contact": "", "username": "", "password": "", "email": ""};
            if ($scope.wareHouseModel.username == undefined || $scope.wareHouseModel.username == '') {
                $scope.errorsinp.username = "Enter Franchise User Name";
                error++;
            }
            if ($scope.wareHouseModel.firstName == undefined || $scope.wareHouseModel.firstName == '') {
                $scope.errorsinp.firstName = "Enter First  Name";
                error++;
            }
            if ($scope.wareHouseModel.alternate_contact == undefined || $scope.wareHouseModel.alternate_contact == '') {
                $scope.errorsinp.alternate_contact = "Enter  Alternate Contact";
                error++;
            }

            if ($scope.wareHouseModel.dob == undefined || $scope.wareHouseModel.dob == '') {
                $scope.errorsinp.dob = "Enter  dob";
                error++;
            }
            if ($scope.wareHouseModel.lastName == undefined || $scope.wareHouseModel.lastName == '') {
                $scope.errorsinp.lastName = "Enter Last Name";
                error++;
            }
            if ($scope.wareHouseModel.password == undefined || $scope.wareHouseModel.password == '') {
                $scope.errorsinp.password = "Enter Franchise Password";
                error++;
            }
            if ($scope.wareHouseModel.email == undefined || $scope.wareHouseModel.email == '') {
                $scope.errorsinp.email = "Enter email";
                error++;
            }

            if (error == 0) {

                if ($state.current.breadcrumb.text == "Create") {

                    //console.log($scope.getSelectedRegion);
                    console.log(model);
                    wareHouseUsersService.addHouseUser(model).then(function(data) {
                        $state.go('warehouse');
                        toaster.pop({
                            type: 'success',
                            title: 'Warehouse User created',
                            showCloseButton: true

                        });
                    })
                } else {
                    
                    console.log(model);
                    wareHouseUsersService.updateHouseUser(model).then(function(data) {
                        $state.go('warehouse');
                        toaster.pop({
                            type: 'success',
                            title: 'Warehouse User Updated Successfully',
                            showCloseButton: true

                        });
                    })
                }
            }
        }

    }]);
