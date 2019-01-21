'use strict';

angular.module('inspinia')

.controller('regionMapController', ['$scope', '$state', 'NgMap', 'CustomerService', 'toaster', 'FileUploader', 'configurationService', '$stateParams', 'routeService', 'regionService', '$timeout', 'GeoCoder', '$uibModal', '$rootScope', '$uibModalInstance', '$log', 'PCService', 'cityService', function($scope, $state, NgMap, CustomerService, toaster, FileUploader, configurationService, $stateParams, routeService, regionService, $timeout, GeoCoder, $uibModal, $rootScope, $uibModalInstance, $log, PCService, cityService) {

    var regionMap;
    var polygonInstance;
    var polygonData;
    $rootScope.polyFinalData = {};
    var getPathOverlaydata = {};
     $scope.showOk = false;
    $scope.coordinates = [];
    $scope.getCitiesByCatId = $rootScope.getCitiesByCatId;
    $scope.searchArea = "Hyderabad";

    cityService.listCities().then(function(data) {

        $scope.cities = data;
    });

    if ($state.current.breadcrumb.text == "Edit") {
        $scope.showOk = true; 
        $scope.region = $rootScope.regionCoordinates;
        $timeout(function() {
            var temp = $rootScope.regionCoordinates;
            if (temp.savedAddress[0]) {
                $scope.mapCenter = [temp.savedAddress[0].geopoint.lat, temp.savedAddress[0].geopoint.lng];
                $scope.markerReady = true;
                $scope.markerOption = {};
                $scope.markerOption.label = temp.franchiseName;
            }
        }, 1000);
    }

    $scope.listAllRegions = $rootScope.listRegions;
    //console.log($scope.listAllRegions);  
    $scope.drawing_control_options = {
        position: 'TOP_CENTER',
        editable: true,
        drawingModes: ['polygon']
    };

    function getMyPath(e) {
        var polygon = [];
        //console.log(polygon);
        for (var i = 0; i < e.overlay.getPath().getLength(); i++) {
            var xy = e.overlay.getPath().getAt(i);
            var temp = {};
            temp.lat = xy.lat();
            temp.lng = xy.lng();
            polygon.push(temp)
        }
        return polygon;
        console.log(polygon);
    
    }

    $scope.dragEnd = function() { 
        var fencePaths = [],
            len = this.getPath().getLength();

        for (var i = 0; i < len; i++) {
            var latLngArr = this.getPath().getAt(i).toUrlValue(8).split(',');
            fencePaths.push([latLngArr[0], latLngArr[1]]);
        }

        $scope.fence = fencePaths;
        console.log("Drag");
        if ($scope.fence) {
            $scope.showOk = false; 
        } else {
            $scope.showOk = true;
        }
    };

    $scope.insertAt = function() {
        console.log('insertAt');
    }

    $scope.resetMap = function() {
        polygonInstance.setMap(null);
        $scope.drawing_control_options.drawingModes = ['polygon'];
    }

    function update_polygon_closure(polygon, i) {
        // console.log(i);
        return function(event) {
            polygon.getPath().setAt(i, event.latLng);
        }
    }
    $scope.PolygonDataNgmap = function(e) {
        polygonInstance = e.overlay;
        polygonData = getMyPath(e);
        getPathOverlaydata = e;
        //console.log(e.overlay.getPath()); 
        google.maps.event.addListener(e.overlay.getPath(), 'set_at', function() {
            polygonData = getMyPath(e);
        });
        google.maps.event.addListener(e.overlay.getPath(), 'insert_at', function(index, obj) {
            polygonData = getMyPath(e);
        });
        google.maps.event.addListener(e.overlay.getPath(), "mouseover", function() {
            this.setMap(null);
            polygonInstance.setMap(map);
        });
        $scope.drawing_control_options.drawingModes = [];
    }

    NgMap.getMap('regionMap').then(function(map) {
        //console.log($rootScope.selectedMaparea);
        regionMap = map;
        //console.log(regionMap);
        google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');

            if ($rootScope.mapLatLngValues.data.TotalData != undefined) {
                $scope.PolygonDataNgmap($rootScope.mapLatLngValues.data.TotalData);
            }

            $scope.onMapOverlayCompleted = function(e) {
                console.log('enter....');
                $scope.PolygonDataNgmap(e);
            };

            // $scope.onMapOverlayCompleted = function(e) {
            //     if (e.type == google.maps.drawing.OverlayType.MARKER) {
            //         var pos = e.overlay.getPosition();
            //         console.log("Test");
            //     }
            // };
        })

        $scope.$watch('searchArea', function(newValues, oldValues) {
            //  console.log(newValues);
            if (newValues[1]) {
                $scope.mapCenter = $scope.searchArea;
                $scope.markerReady = false;
                $scope.zoom = 12;
            } else if (newValues[0]) {
                var temp = JSON.parse($scope.regionModel.PC);
                $scope.mapCenter = [temp.address.coordinates.lat, temp.address.coordinates.lng];
                $scope.markerReady = true;
                $scope.markerOption = {};
                $scope.markerOption.label = temp.name;
            }
        });

        $scope.ok = function() {

            $rootScope.mapLatLngValues = {
                lat: '',
                lng: '',
                data: { polygon: polygonData, TotalData: getPathOverlaydata, name: $rootScope.mapLatLngValues.data.name },
                message: ''
            };

            //console.log($rootScope.mapLatLngValues.data.polygon); 
            // $uibModalInstance.close($rootScope.mapLatLngValues.data.polygon);  
            if ($state.current.breadcrumb.text == "Edit") {
                //console.log($scope.region.coordinates); 
                $uibModalInstance.close($scope.region.coordinates);
            } else {
                $uibModalInstance.close($rootScope.mapLatLngValues.data.polygon);
            }

        };

        $scope.cancle = function() {
            $uibModalInstance.dismiss('cancel');
        }

        Windowresize();
    });
    $timeout(function() {
        $(".pac-container").appendTo($(".testnew987"));
    }, 200);
}]);

function Windowresize() {
    var test = $(window).width();
    //console.log($(window).width());
}
