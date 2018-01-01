/**
* UsersController
*
* @description :: Server-side logic for managing users
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
	login: function (req, res) {
		var email = req.param('email');
		var password = req.param('password');

		if (!email || !password) {
			return res.json(401, {err: 'email and password required'});
		}

		Users.findOne({email: email}, function (err, user) {
			if (!user) {
				return res.json(401, {err: 'iinvalid email or password'});
			}

			Users.comparePassword(password, user, function (err, valid) {
				if (err) {
					return res.json(403, {err: 'forbidden'});
				}

				if (!valid) {
					//return res.json(401, {err: 'Invalid email or Password'});
					//request issue no 8
					return res.json({status:"Invalid email or Password"});
				} else {
					//fi issue #7
					user.picture = user.picture || 'holder.jpg';
					res.json({
						status:"success",
						user: user,
						token: jwToken.issue({id : user.id })
					});
				}
			});
		})
	},

	create: function (req, res) {
		if (req.body.password !== req.body.confirmPassword) {
			return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
		}
		Users.create(req.body).exec(function (err, users) {
			if (err) {
				return res.json(err.status, {err: err});
			}
			// If user created successfuly we return user and token as response
			if (users) {
				// NOTE: payload is { id: user.id}
				res.json(200, {user: users, token: jwToken.issue({id: users.id})});
			}
		});
	},
};
