'use strict';

angular.module('inspinia')

.controller('wareHouseMapCtrl', ['$scope', '$state', 'NgMap', 'CustomerService', 'toaster', 'FileUploader', 'configurationService', '$stateParams', 'routeService', 'regionService', '$timeout', 'GeoCoder', '$uibModal', '$log', '$rootScope', '$uibModalInstance','cityService','$controller', function($scope, $state, NgMap, CustomerService, toaster, FileUploader, configurationService, $stateParams, routeService, regionService, $timeout, GeoCoder, $uibModal, $log, $rootScope, $uibModalInstance,cityService,$controller) {
    var vm = this;
    $scope.searchArea = "Hyderabad"; 
    console.log($scope.searchArea);
    var mapVariable;  
    var map, x, y, z;
    $scope.showBtn = true;
    var zoomVal = 11;
    var dragupdata = {};

    $rootScope.selectedMaparea = {};

    //console.log($rootScope.selectedMaparea.lat);

    function newMapData(lat, lng) {
        $scope.searchArea = String(lat + ',' + lng);
    }
    // newMapData($scope);
     if ($state.current.breadcrumb.text == "Edit") {
         console.log($rootScope.savedAddress); 
         $scope.searchArea = $rootScope.savedAddress.area;
         console.log("enter...");
     }

    if ($rootScope.selectedMaparea.lat != undefined) {

        $scope.zoom = 11;
        NgMap.getMap('billingmap').then(function(map) {
            console.log('enter in ----- NgMap get');
            mapVariable = map;
            google.maps.event.trigger(mapVariable, 'resize');
        })
        console.log($scope.mapcenter);
    } else {

        $scope.zoom = 11;
        NgMap.getMap('billingmap').then(function(map) {
            //console.log('enter in ----- NgMap get');
            mapVariable = map;
            google.maps.event.trigger(mapVariable, 'resize');
        })
    }

    console.log($scope.searchArea);
    $scope.$watch('searchArea', function(newValues, oldValues) {
        console.log(newValues);
        if (newValues) {
            $scope.mapCenter = $scope.searchArea;
            $scope.markerReady = true;
            google.maps.event.trigger(mapVariable, 'resize');
        }
    });


    $scope.ok = function() {

        var latfinall;
        var lngfinall


        var sliptlatlng = $scope.searchArea.split(",");

        console.log($scope.searchArea);

        GeoCoder.geocode({ address: $scope.searchArea }).then(function(result) {
            console.log(result);
            if(sliptlatlng[0]){
            var typeofval = parseInt(sliptlatlng[0])
            }
            console.log(typeofval);
            if (isNaN(typeofval) || (typeofval === " ")) {


                latfinall = Number(result[0].geometry.location.lat());
                lngfinall = Number(result[0].geometry.location.lng());

            } else {
                latfinall = Number(sliptlatlng[0]);
                lngfinall = Number(sliptlatlng[1]);
            }


            $rootScope.selectedMaparea = {
                lat: latfinall,
                lng: lngfinall,
                data: result,
                message: result[0].formatted_address
            };
            console.log($rootScope.selectedMaparea);
            toaster.success($rootScope.selectedMaparea.message + 'added');
            $uibModalInstance.close($rootScope.selectedMaparea);
        });

    };


    $scope.doSth = function() {
        console.log(this.getPosition());
        var testlat = Number(this.getPosition().lat());
        var testlng = Number(this.getPosition().lng());
        newMapData(testlat, testlng);
        $scope.showBtn = false;
    }

    $scope.doclick = function(event) {
        console.log(event.latLng.lat());
        var testlat = Number(event.latLng.lat());
        var testlng = Number(event.latLng.lng());
        newMapData(testlat, testlng);

    }

    $scope.cancle = function() {
        $uibModalInstance.dismiss('cancel');
    }

    $timeout(function() {
        $(".pac-container").appendTo($(".testnew987"));
    }, 500);


}]);
