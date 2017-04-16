const Controller = require('../controllers/record-controller');

module.exports = [{
		method: 'GET',
		path: '/data/records',
		config: {
			handler: function (req, reply) {
				var uid = req.auth.credentials.id;
				var dataParams = req.query;
				return Controller.browse(uid, reply, dataParams);
			}
		}
	},
	{
		method: 'POST',
		path: '/data/records',
		config: {
			handler: function (req, reply) {
				var payload = req.payload;
				var uid = req.auth.credentials.id;

				if(payload.mobile) {
					var data = payload.data || {};
					if(data != null) {
						data = JSON.parse(data);
					}
				} else {
					data = payload;
				}

				return Controller.insert(uid, data, reply);
			}
		}
	},
	{
		method: 'GET',
		path: '/data/records/{id}',
		config: {
			handler: function (req, reply) {
				var rid = req.params.id;
				var uid = req.auth.credentials.id;
				return Controller.get(uid, rid, reply);
			}
		}
	},
	{
		method: 'PUT',
		path: '/data/records/{id?}',
		config: {
			handler: function (req, reply) {
				var payload = req.payload
				var id = req.params.id;
				var uid = req.auth.credentials.id;

				if(!id && payload.mobile) {
					var data = payload.data || {};
					if(data != null) {
						data = JSON.parse(data);
						id = data._id;
					}
				} else {
					data = payload;
				}

				return Controller.update(uid, id, data, reply);
			}
		}
	},
	{
		method: 'DELETE',
		path: '/data/records/{id}',
		config: {
			handler: function (req, reply) {
				var uid = req.auth.credentials.id;
				var rid = req.params.id;
				return Controller.remove(uid, rid, reply);
			}
		}
	}
];
