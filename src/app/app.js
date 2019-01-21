'use strict';

angular.module('inspinia', ['ngAnimate', 'angularFileUpload', 'jcs-autoValidate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'datatables', 'ui.footable', 'ngMap', 'vsGoogleAutocomplete', 'toaster', 'ngDraggable', 'ui.router.breadcrumbs', '720kb.datepicker', 'ngToast', 'schemaForm', 'angular.filter', 'ui.bootstrap.datetimepicker', 'angular.filter', 'ui.select', 'pascalprecht.translate', 'ngSchemaFormFile', 'ngMessages', 'ngMaterial', 'sc.select', 'colorpicker.module', 'ui.calendar', 'ui.toggle', 'ngCsvImport', 'schemaForm-datepicker', 'schemaForm-timepicker', 'schemaForm-datetimepicker', 'pascalprecht.translate', 'ngSchemaFormFile', 'ngPrint', 'chart.js'])

    .service('APIInterceptor', function ($cookieStore) {
        var service = this;
        service.request = function (config) {
            if ($cookieStore.get('loginAccess')) {
                config.headers.Authorization = $cookieStore.get('loginAccess').id;
            }
            return config;
        }
    })
    .run(function ($rootScope, $state, $cookieStore, NgMap) {

        NgMap.getMap().then(function (map) {
            $rootScope.map = map;
        });

        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.$state = $state;

            if ($cookieStore.get('loginAccess') == undefined) {
                $rootScope.hideView = true;
                $state.go('login');
            }
        });
        $rootScope.cancel = function () {
            window.history.back();
        };
        $rootScope.redirectSub = '';
        $rootScope.mapLatLngValues = {
            lat: '',
            lng: '',
            data: {},
            message: ''
        };
        $rootScope.tempRoute = {};
        $rootScope.selectedMaparea = {};
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, breadcrumbsProvider, $translateProvider, $mdDateLocaleProvider, ChartJsProvider) {
        ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD-MM-YYYY');
        };

        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'DD-MM-YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $translateProvider.translations('en', {
            'modules.upload.dndNotSupported': 'Drag n drop not surpported by your browser',
            'modules.attribute.fields.required.caption': 'Required',
            'modules.upload.descriptionMultifile': 'Drop your file(s) here',
            'buttons.add': 'Open file browser',
            'modules.upload.field.filename': 'Filename',
            'modules.upload.field.preview': 'Preview',
            'modules.upload.multiFileUpload': 'Multifile upload',
            'modules.upload.field.progress': 'Progress',
            'buttons.upload': 'Upload',
            'modules.upload.descriptionSinglefile': '',
        });
        $translateProvider.preferredLanguage('en');
        $stateProvider.state('login', {
            title: 'B-Buzz',
            url: "/login",
            templateUrl: "app/login/index.html",
            controller: 'loginCtrl'
        })
            .state('logout', {
                url: "/logout",
                controller: 'logoutCtrl',
                templateUrl: "app/logout/index.html"
            })
            .state('dashboard', {
                url: "/dashboard",
                views: {
                    "@": {
                        templateUrl: "app/dashboard/view.html",
                        controller: 'adminDashboardCtrl'
                    }
                },
                title: 'Welcome To  Scouter Dashboard ',
                breadcrumb: {
                    class: 'highlight',
                    text: 'Dashboard',
                    stateName: 'dashboard'
                }
            })
                // cities start here
                        .state('cities', {
                            url: "/cities",
                            views: {
                                "@": {
                                    templateUrl: "app/cities/list.html",
                                    controller: 'citiesListCtrl'
                                }
                            },
                            title: 'Cities',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'List',
                                stateName: 'cities'
                            }
                        })
                        .state('cities.create', {
                            url: "/create",
                            views: {
                                "@": {
                                    templateUrl: "app/cities/create.html",
                                    controller: 'citiesCreateCtrl'
                                }
                            },
                            title: 'City Scraping',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Create',
                                stateName: 'cities.create'
                            }
                        })
                        .state('cities.edit', {
                            url: "/edit/:id",
                            views: {
                                "@": {
                                    templateUrl: "app/cities/create.html",
                                    controller: 'citiesCreateCtrl'
                                }
                            },
                            title: 'City Edit',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Edit',
                                stateName: 'cities.edit'
                            }
                        })
                        // cities End here
                        // Users start here
                        .state('users', {
                            url: "/users",
                            views: {
                                "@": {
                                    templateUrl: "app/users/list.html",
                                    controller: 'usersListCtrl'
                                }
                            },
                            title: 'Users',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'List',
                                stateName: 'users'
                            }
                        })
                        .state('users.create', {
                            url: "/create",
                            views: {
                                "@": {
                                    templateUrl: "app/users/create.html",
                                    controller: 'usersCreateCtrl'
                                }
                            },
                            title: 'Users Create',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Create',
                                stateName: 'users.create'
                            }
                        })
                        .state('users.edit', {
                            url: "/edit/:id",
                            views: {
                                "@": {
                                    templateUrl: "app/users/create.html",
                                    controller: 'usersCreateCtrl'
                                }
                            },
                            title: 'Users Edit',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Edit',
                                stateName: 'users.edit'
                            }
                        })
                        // Users end here
                        // places start here
                        .state('places', {
                            url: "/places",
                            views: {
                                "@": {
                                    templateUrl: "app/places/list.html",
                                    controller: 'placesListCtrl'
                                }
                            },
                            title: 'Places',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'List',
                                stateName: 'places'
                            }
                        })
                        .state('places.create', {
                            url: "/create",
                            views: {
                                "@": {
                                    templateUrl: "app/places/create.html",
                                    controller: 'placesCreateCtrl'
                                }
                            },
                            title: 'Places Create',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Create',
                                stateName: 'places.create'
                            }
                        })
                        .state('places.edit', {
                            url: "/edit/:id",
                            views: {
                                "@": {
                                    templateUrl: "app/places/create.html",
                                    controller: 'placesCreateCtrl'
                                }
                            },
                            title: 'Places Edit',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Edit',
                                stateName: 'places.edit'
                            }
                        })  
                        // places End here
                        // events start here
                        .state('events', {
                            url: "/events",
                            views: {
                                "@": {
                                    templateUrl: "app/events/list.html",
                                    controller: 'eventsListCtrl'
                                }
                            },
                            title: 'Events',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'List',
                                stateName: 'events'
                            }
                        })
                        .state('events.create', {
                            url: "/create",
                            views: {
                                "@": {
                                    templateUrl: "app/events/create.html",
                                    controller: 'eventsCreateCtrl'
                                }
                            },
                            title: 'Events Create',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Create',
                                stateName: 'events.create'
                            }
                        })
                        .state('events.edit', {
                            url: "/edit/:id",
                            views: {
                                "@": {
                                    templateUrl: "app/events/edit.html",
                                    controller: 'eventseditCtrl'
                                }
                            },
                            title: 'Events Edit',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Edit',
                                stateName: 'events.edit'
                            }
                        })
                        // events end here

                        .state('feedback', {
                            url: "/feedback",
                            views: {
                                "@": {
                                    templateUrl: "app/feedback/list.html",
                                    controller: 'feedbackListCtrl'
                                }
                            },
                            title: 'Feedback',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'List',
                                stateName: 'feedback'
                            }
                        })
                        .state('feedback.create', {
                            url: "/create",
                            views: {
                                "@": {
                                    templateUrl: "app/feedback/create.html",
                                    controller: 'feedbackCreateCtrl'
                                }
                            },
                            title: 'feedback Create',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Create',
                                stateName: 'feedback.create'
                            }
                        })
                        .state('feedback.edit', {
                            url: "/edit/:id",
                            views: {
                                "@": {
                                    templateUrl: "app/feedback/create.html",
                                    controller: 'feedbackCreateCtrl'
                                }
                            },
                            title: 'feedback Edit',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Edit',
                                stateName: 'feedback.edit'
                            }
                        })
                        // profile settings start here
                        .state('profilesettings', {
                            url: "/profilesettings",
                            views: {
                                "@": {
                                    templateUrl: "app/profilesettings/list.html",
                                    controller: 'profilesettingsListCtrl'
                                }
                            },
                            title: 'Personal and Profile Settings',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'List',
                                stateName: 'profilesettings'
                            }
                        })
                        .state('profilesettings.create', {
                            url: "/create",
                            views: {
                                "@": {
                                    templateUrl: "app/profilesettings/create.html",
                                    controller: 'profilesettingsCreateCtrl'
                                }
                            },
                            title: 'Personal and Profile Create',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Create',
                                stateName: 'profilesettings.create'
                            }
                        })
                        .state('profilesettings.edit', {
                            url: "/edit/:id",
                            views: {
                                "@": {
                                    templateUrl: "app/profilesettings/create.html",
                                    controller: 'profilesettingsCreateCtrl'
                                }
                            },
                            title: 'Personal and Profile Settings Edit',
                            breadcrumb: {
                                class: 'highlight',
                                text: 'Edit',
                                stateName: 'profilesettings.edit'
                            }
                        })
                        // profile settings end here
                                $urlRouterProvider.otherwise('dashboard');
                                $httpProvider.interceptors.push('APIInterceptor');
                            })