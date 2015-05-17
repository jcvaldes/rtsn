var app = angular.module('app', ['ngResource',
    'ngRoute'
]);

app.config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function(mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            }

        }
    }
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', {templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: routeRoleChecks.admin
              //  auth : function(mvIdentity, $q) {
              ////      if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('admin') > -1){
              //      if(mvIdentity.isAuthorized('admin')){
              //          return true;
              //      }
              //      else {
              //          return $q.reject('not authorized')
              //      }
              //  }

        });
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    })
});
