var bcrypt = require('bcryptjs');
var plain_password = process.argv[2];

if (!plain_password) {
	throw new Error('password is missing');
}

bcrypt.hash(plain_password, 10, function (err, hash) {
	console.log(hash);
});
