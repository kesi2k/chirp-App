//Use express and bind router to express

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
//var Post = require('./app/models/models')

var Post = mongoose.model('Post');
var User = mongoose.model('User');



//Used for routes that must be authenticated.
function isAuthenticated (request, response, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object.

	//allow all get request methods
	if(request.method === "GET"){
		return next();
	}
	if (request.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return response.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);


router.route('/posts')

//creates a new post
    
    .post(function(request, response){
    
       console.log('THIS IS THE REQUEST BODY', request.body);
        
        var post = new Post();
        post.text = request.body.text;
        post.created_by = request.body.created_by;
        console.log('This is the request:', request.body.created_by);
        post.save(function(err, post) {
            if (err){
                return response.send(500, err);
            }
            return response.json(post);

    });
    
    })
    
       //return all posts
    .get(function(request, response){
        Post.find(function(err, posts){
            if(err){
                return response.send(500, err);
            }
            return response.send(posts);
        });
    });
    
router.route('/posts/:id')

    // returns a particular post
     .get(function(request, response){
         console.log('the request is', request.params.id)
        Post.findById(request.params.id, function(err, post){
            if(err)
               { response.send(err)}
            response.json(post);
        });
    })
    
    //updates specified post
    .put(function(request, response){
        Post.findById(request.params.id, function(err, post){
            if(err){
                response.send(err)};

            post.created_by = request.body.created_by;
            post.text = request.body.text;

            post.save(function(err, post){
                if(err)
                    {response.send(err)}

                response.json(post);
            });
        });
    })
    
   //deletes the post
    .delete(function(request, response) {
        Post.remove({
            _id: request.params.id
        }, function(err) {
            if (err)
                {response.send(err)};
            response.json("deleted :(");
        });
    });
    
module.exports = router;




