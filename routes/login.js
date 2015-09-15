 exports.login = function(req, res, next){
  		req.getConnection(function(error, connection){
  		var input = JSON.parse(JSON.stringify(req.body));
		var username = input.username;
		var password = input.password;
      //	var columns = ['username'];
  			if(error){
  				return next(error);
  			}

			connection.query('SELECT  * FROM users WHERE username = ? AND password = ?;', username, password, function(error, results) {
			    if (error) return next(error);     
				console.log(username);

			    res.render( 'home', {
				login : results,
			
			    });
		    });
  		});

  }

