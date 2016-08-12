var express = require('express');
var router = express.Router();



module.exports = function (passport){
    
      //sends successful login state back to angular
    router.get('/success', function(request, response){
        response.send({state: 'success', user: request.user ? request.user : null});
    });
   
    
    
     //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
    
    
     //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //log out
    router.get('/signout', function(request, response) {
        request.logout(); //Passport feature not express
        request.redirect('/');
    });
    
   return router ;
    
    
}