'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('inspinia')

    .filter('currentpage', function () {
        return function (input) {

            if (input == 0) {
                return 1;
            } else {
                var div = input / 10;
                return div;
            }
        };
    })

    .filter('currentpage1', function () {
        return function (input) {

            if (input == 0) {
                return 1;
            } else {
                var div = input / 10;
                return div + 1;
            }
        };
    })
    .filter('getlatlngStatus', function () {

        return function (input) {
            var result;
            switch (input) {
                case 0:
                    return result = "lat";

                case 1:
                    return result = "lng";
            }

        };
    })
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    })
    .filter('dateTime', function ($filter) {

        return function (input) {

            if (input == null) {
                return "";
            }
            var splitdatetime = input.split('T');
            var dateval = splitdatetime[0];
            var splittime = splitdatetime[1].split(':');
            var timeval = splittime[0] + ':' + splittime[1];
            var cond = dateval + ' ' + timeval;


            var _date = $filter('date')(new Date(cond), 'dd-MM-yyyy hh:mm:ss a');

            return _date.toUpperCase();

        };
    })

    .filter('dateOnly', function ($filter) {

        return function (input) {

            if (input == null) {
                return "";
            }
            var splitdatetime = input.split('T');
            var dateval = splitdatetime[0];
            var splittime = splitdatetime[1].split(':');
            var timeval = splittime[0] + ':' + splittime[1];
            var cond = dateval + ' ' + timeval;


            var _date = $filter('date')(new Date(cond), 'dd-MM-yyyy');

            return _date.toUpperCase();

        };
    })
    .filter('tel', function () {
        return function (tel) {
            console.log(tel);
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 1:
                case 2:
                case 3:
                    city = value;
                    break;

                default:
                    city = value.slice(0, 3);
                    number = value.slice(3);
            }

            if (number) {
                if (number.length > 3) {
                    number = number.slice(0, 3) + '-' + number.slice(3, 7);
                }
                else {
                    number = number;
                }

                return ("(" + city + ") " + number).trim();
            }
            else {
                return "(" + city;
            }

        };
    })

    .directive('sideNavigation', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function () {
                    $timeout(function () {
                        element.metisMenu();
                    });
                });

            }
        };
    })
    .directive('minimalizaSidebar', function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope, $element) {
                $scope.minimalize = function () {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            angular.element('#side-menu').fadeIn(400);
                        }, 200);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    })

    //List view Dynamic pagenation
    .directive('listView', function ($timeout, $parse) {
        return {
            restrict: 'E',
            templateUrl: function (elem, attr) {
                return 'components/common/directives/' + attr.type + '.html';
            },
            controller: 'directiveList'
        };
    })
    // .directive('orderlistView', function($timeout) {
    //     return {
    //         restrict: 'E',
    //         templateUrl: 'components/common/directives/subscribe-order-list.html',
    //         controller: 'directiveList'
    //     };
    // }) 

    .directive('ngConfirmClick', [
        function () {
            return {
                priority: 1,
                terminal: true,
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.ngClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }
    ])
    .directive('validFile', function () {
        return {
            require: 'ngModel',
            link: function (scope, el, attrs, ctrl) {
                ctrl.$setValidity('validFile', el.val() != '');
                //change event is fired when file is selected
                el.bind('change', function () {
                    ctrl.$setValidity('validFile', el.val() != '');
                    scope.$apply(function () {
                        ctrl.$setViewValue(el.val());
                        ctrl.$render();
                    });
                });
            }
        }
    })
    .directive('validPasswordC', function () {
        return {
            require: 'ngModel',
            scope: {

                reference: '=validPasswordC'

            },
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {

                    var noMatch = viewValue != scope.reference
                    ctrl.$setValidity('noMatch', !noMatch);
                    return (noMatch) ? noMatch : !noMatch;
                });

                scope.$watch("reference", function (value) {
                    ;
                    ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

                });
            }
        }
    })
    .directive("removeMe", function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.bind("click", function () {
                    element.remove();
                });
            }
        }

    })
    .directive('onlyDigits', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                max: '=',
                value: '=ngModel'
            },
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9]/g, '');

                        if (digits.split('.').length > 2) {
                            digits = digits.substring(0, digits.length - 1);
                        }

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return parseFloat(digits);
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
                element.bind("keydown keypress", function (e) {
                    if (scope.value != undefined) {
                        var valueLength = scope.value.toString().length;
                    }
                    if (valueLength == scope.max) {
                        scope.$apply(function () {
                            scope.$eval(attr.onlyDigits);
                        });
                        if (e.keyCode >= 48 && e.keyCode <= 57) {
                            e.preventDefault();
                        }
                    }
                });
            }
        };
    })
    .directive('onlyDigitsanddots', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                max: '=',
                value: '=ngModel'
            },
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9.]/g, '');

                        if (digits.split('.').length > 2) {
                            digits = digits.substring(0, digits.length - 1);
                        }

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return parseFloat(digits);
                    }
                    return undefined;
                }
                ctrl.$parsers.push(inputValue);
                element.bind("keydown keypress", function (e) {
                    if (scope.value != undefined) {
                        var valueLength = scope.value.toString().length;
                    }
                    if (valueLength == scope.max) {
                        scope.$apply(function () {
                            scope.$eval(attr.onlyDigits);
                        });
                        if (e.keyCode >= 48 && e.keyCode <= 57) {
                            e.preventDefault();
                        }
                    }
                });
            }
        };
    })
    .directive('phoneInput', function ($filter, $browser) {
        return {
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModelCtrl) {
                var listen = function () {
                    var value = $element.val().replace(/[^0-9]/g, '');
                    $element.val($filter('tel')(value, false));
                };
                //This function runs when we update the text field
                ngModelCtrl.$parsers.push(function (viewValue) {
                    return viewValue.replace(/[0-9]/g, '').slice(0, 10);
                });
                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function () {
                    $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function (event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function () {
                    $browser.defer(listener);
                });
            }
        };

    })
