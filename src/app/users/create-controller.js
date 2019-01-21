'use strict';
angular.module('inspinia')
    .controller('usersCreateCtrl', ['$scope', '$state', 'NgMap', 'toaster', '$timeout', '$stateParams', '$rootScope', '$uibModal', '$log', 'FileUploader', 'configurationService', '$controller', 'usersService', function ($scope, $state, NgMap, toaster, $timeout, $stateParams, $rootScope, $uibModal, $log, FileUploader, configurationService, $controller, usersService) {
        $scope.users = {};
        $scope.genders = ['Male', 'Female'];
        $scope.users.sex = "Male";
        $scope.users.location = { lat: "", lng: "" };
        $scope.allfav = [];
        $scope.allplaces = '';
        $scope.favourites = '';
        $scope.genderChange = function (genderValue) {
            $scope.users.sex = genderValue;
        };
        if ($state.current.breadcrumb.text == "Edit") {
            usersService.edit($stateParams.id).then(function (data) {
                $scope.users = data.result;
                $scope.users.location.lat = $scope.latlng[0];
                $scope.users.location.lng = $scope.latlng[1];
                $scope.favourites = data.result.favourites;
                //    $scope.users=data.result;  
            });
        }
        $scope.addfav = function(addfavr){

            var selected = JSON.parse(addfavr);
            $scope.allfav.push({'id':selected.id, "name":selected.name});
            console.log($scope.allfav);
        }
        $scope.getpos = function (event) {
            $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
            if($scope.latlng){
                $scope.users.location.lat = $scope.latlng[0];
                $scope.users.location.lng = $scope.latlng[1];
            }
        };
        usersService.getallplaces().then(function (data) {
            $scope.allplaces = data.result.list;
            console.log(data);
        })
        
        // save / update api start here
        $scope.save = function (model) {
            if($scope.latlng){
                $scope.users.location.lat = $scope.latlng[0];
                $scope.users.location.lng = $scope.latlng[1];
            }
            $scope.users.favourites = $scope.allfav;
            var CurrentDate = moment().unix();
            $scope.users.locationUpdateTimestamp = CurrentDate;
            var error = 0;
            console.log($scope.users);
            $scope.errorsinp = {
                "name": "",
                "sex": "",
                "race": "",
                "deviceId": "",
                "locationlat": "",
                "langvalue": "",
                "locationUpdateTimestamp": "",
                "favourites":""
            }
            if ($scope.users.name == undefined || $scope.users.name == '') {
                $scope.errorsinp.name = "Please enter name";
                error++;
            }
            if ($scope.users.sex == undefined || $scope.users.sex == '') {
                $scope.errorsinp.sex = "Please select gender";
                error++;
            }
            if ($scope.users.race == undefined || $scope.users.race == '') {
                $scope.errorsinp.race = "Please enter race";
                error++;
            }
            if ($scope.users.deviceId == undefined || $scope.users.deviceId == '') {
                $scope.errorsinp.deviceId = "Please enter deviceid";
                error++;
            }
            if ($scope.users.location.lat == undefined || $scope.users.location.lat == '') {
                $scope.errorsinp.locationlat = "Please enter Lat value";
                error++;
            }
            if ($scope.favourites== undefined || $scope.favourites == '') {
                $scope.errorsinp.favourites = "Please enter favourites";
                error++;
            }
            if ($scope.users.location.lng == undefined || $scope.users.location.lng == '') {
                $scope.errorsinp.langvalue = "Please enter lang value";
                error++;
            }
            if ($scope.users.locationUpdateTimestamp == undefined || $scope.users.locationUpdateTimestamp == '') {
                $scope.errorsinp.locationUpdateTimestamp = "Please enter location Update time";
                error++;
            }
            if (error == 0) {
                if ($state.current.breadcrumb.text == "Create") {

                    usersService.create($scope.users).then(function (data) {
                        console.log(data);
                        $state.go('users');
                        toaster.pop({
                            type: 'success',
                            title: 'User Created Successfully',
                            showCloseButton: true
                        });
                    })
                } else {
                    usersService.update($scope.users, $stateParams.id).then(function (data) {
                        $state.go('users');
                        toaster.pop({
                            type: 'success',
                            title: 'User Updated Successfully',
                            showCloseButton: true
                        });
                    })
                }
            }
        }
        
    }]);