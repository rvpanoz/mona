const config = require('../config');
const _ = require('lodash');
const async = require('async');
const moment = require('moment');
const Record = require('../models/record');
const Category = require('../models/category');
const mongoose = require('mongoose');

var ChartController = _.extend({
  getData: function(req, reply) {
    var id = req.auth.credentials.id;
    var opts = _.pick(req.query, 'type', 'year');
    var today = new Date();

    Record.aggregate([{
        $match: {
          user_id: new mongoose.Types.ObjectId(id),
          kind: 1,
          entry_date: {
            '$gte':  moment().dayOfYear(1).toDate(),
            '$lt': moment().dayOfYear(366).toDate()
          }
        }
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$entry_date"
            },
            year: {
              $year: "$entry_date"
            },
            // day: {
            //   $dayOfMonth: "$entry_date"
            // }
          },
          totalAmount: {
            $sum: "$amount"
          }
        }
      }
    ], function(err, records) {
      console.log(records);
      if(err) throw new Error(err);
      reply({
        success: true,
        data: records
      });
    });
  }
});

module.exports = ChartController;
