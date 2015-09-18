var bcrypt = require('bcrypt');
exports.login = function(req, res, next){
  		req.getConnection(function(error, connection){
  			
  			var input = JSON.parse(JSON.stringify(req.body));
			var username = input.username;
			var password = input.password;
  			if(error){
  				return next(error);
  			}

			connection.query('SELECT  password FROM users WHERE username = ?', username, function(error, users) {
			     var user = users[0];
			     console.log(users);

			    bcrypt.compare(input.password, user.password, function(err, pass){
			  	 bcrypt.compare(input.Admin, user.Admin, function(err, admin){
			    	if (err) {
			    		console.log(err);
			    	}

			    	console.log(pass);

			    	if (pass) {
			    		req.session.user = username;
			    		req.session.role =  user.User_role;
			    		return res.render("home")
			    		console.log(password);
			    		console.log(Admin);
			    	} else {
			    		 res.redirect('/home');
			    	
			    	};
				});
			  	});
			});
		    });
  		};