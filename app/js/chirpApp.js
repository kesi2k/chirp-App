//chirpApp.js
//ngRoute used to supply different page partials


var app = angular.module('chirpApp', ['ngRoute']).run(function($rootScope){
  //rootScope variables
  
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  
  
});


// Controlling routes for partia; displays
app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});


app.controller('mainController', function($scope){
  //scope variables. Tie model controller to view controller
  $scope.posts = [];
  $scope.newPost = {created_by: '', text: '', created_at: ''};

  $scope.post = function(){
    $scope.newPost.created_at = Date.now();
    $scope.posts.push($scope.newPost);
    //reset new post
    $scope.newPost = {created_by: '', text: '', created_at: ''};
  };
});





//Controlling authorization


app.controller('authController', function($scope, $http, $rootScope, $location){
  //scope variables. Tie model controller to view controller
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';


  $scope.login = function(){
    
    
     $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };




  $scope.register = function(){
   
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
   
   
   
  };
});