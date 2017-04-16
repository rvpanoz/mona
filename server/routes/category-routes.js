const Controller = require('../controllers/category-controller');

module.exports = [{
    method: 'GET',
    path: '/data/categories',
    config: {
      handler: function (req, reply) {
        var params = req.params;
        var uid = req.auth.credentials.id;
        return Controller.browse(uid, reply);
      }
    }
  },
  {
    method: 'POST',
    path: '/data/categories',
    config: {
      handler: function (req, reply) {
        var payload = req.payload;
        var uid = req.auth.credentials.id;

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
    method: 'PUT',
    path: '/data/categories/{id?}',
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
    path: '/data/categories/{id}',
    config: {
      handler: function (req, reply) {
        var cid = req.params.id;
        var uid = req.auth.credentials.id;
        return Controller.remove(uid, cid, reply);
      }
    }
  },
  {
    method: 'GET',
    path: '/data/categories/{id}',
    config: {
      handler: function (req, reply) {
        var cid = req.params.id;
        var uid = req.auth.credentials.id;
        return Controller.get(uid, cid, reply);
      }
    }
  }
];
