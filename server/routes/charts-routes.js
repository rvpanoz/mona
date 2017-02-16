const Controller = require('../controllers/chart-controller');

module.exports = [{
    method: 'GET',
    path: '/data/chart',
    config: {
      handler: Controller.getData
    }
  }
]
