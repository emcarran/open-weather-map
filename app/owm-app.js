//declare your module named OWMApp and inject ngRoute as a dependency.
angular.module('OWMApp', ['ngRoute'])
    .value('owmCities', ['New York', 'Dallas', 'Chicago', 'San Francisco', 'Los Angeles', 'Houston'])

//inject a $routeProvide and use it to set URL routing rules
.config(['$routeProvider', function ($routeProvider) {
        //used to specify that when users request root url, the app should respond with the home.html template and the home controller.
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl as home'
            })
            .when('/error', {
                template: '<p class="error">Ups! This city sunk in Atlantic around 300 BC</p>'
            })
            .when('/cities/:city', {
                templateUrl: 'city.html',
                controller: 'CityCtrl',
                resolve: {
                    city: function (owmCities, $route, $location) {
                        var city = $route.current.params.city;

                        if (owmCities.indexOf(city) === -1) {
                            $location.path('/error');
                            return;
                        }
                        return city;

                    }
                }
            })
            .otherwise({
                redirectTo: '/error'
            });
}])
    .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function () {
            $location.path('/error');
        })
    })

.controller('HomeCtrl', ['$scope', function ($scope) {
        this.welcomeMessage = 'Welcome home';
    }])
    .controller('CityCtrl', function ($scope, city) {
        $scope.city = city;
    });
