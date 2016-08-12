//chirpApp.js
//ngRoute used to supply different page partials


var app = angular.module('chirpApp', ['ngRoute','ngResource']).run(function($http, $rootScope){
  //rootScope variables
  
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  
  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };

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
    .when('/signup', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});



/*
//no longer needed as ngResource is used
app.factory('postService', function($http){
	var factory = {};
  factory.getAll = function(){
  return  $http.get('api/posts');
    
  }
  
  return factory;
});

*/



app.factory('postService', function($resource){
 
 
return $resource('/api/posts/:id');
  

  
});



app.controller('mainController', function($scope, $rootScope, postService){
  

   
   
  
  //scope variables. Tie model controller to view controller
  $scope.posts = postService.query();
  $scope.newPost = {created_by: '', text: '', created_at: ''};



  $scope.post = function() {
  $scope.newPost.created_by = $rootScope.current_user;
  $scope.newPost.created_at = Date.now();
  
  
  
  

  
  
  postService.save($scope.newPost, function(){
    $scope.posts = postService.query();
    $scope.newPost = {created_by: '', text: '', created_at: ''};
    
    
    

    
    
    
  });
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
        $rootScope.current_user =  $scope.user.username;
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
        $rootScope.current_user = $scope.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
   
   
   
  };
});