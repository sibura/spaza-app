// var bcrypt = require('bcryptjs');
exports.login = function(req, res, next){
		req.getConnection(function(error, connection){

		var input = JSON.parse(JSON.stringify(req.body));
		var username = input.username;
		var password = input.password;
			if(error){
				return next(error);
			}

  		connection.query('SELECT  * FROM users WHERE username = ?', username, function(error, users) {
  		     // var user = users[1];
  		     console.log(users);
           console.log(users);
  		   // bcrypt.compare(input.password, users[1].password, function(err, pass){
  		  	 // bcrypt.compare(input.Admin, users.Admin, function(err, admin){
  		    	if (error) {
  		    		console.log(error);
  		    	}

  		    	// console.log(pass);

  		    	if (password) {
  		    		req.session.user = username;
  		    		// req.session.role =  users.role;
  		    		return res.render("home")
  		    		console.log(pass);
  		    		console.log(Admin);
  		  } else {
  		    res.redirect('/home');

  		  };
  		});

  	 })
   // })
 // })
 }
