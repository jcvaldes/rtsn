
    var app = angular.module('app', ['ngResource',
        'ngRoute'
    ]);

    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'});


    });

