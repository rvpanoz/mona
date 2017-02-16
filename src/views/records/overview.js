const Marionette = require('backbone.marionette');
const template = require('templates/records/overview.hbs');

var TotalsView = Marionette.View.extend({
  template: template,
  incomes: 0,
  expenses: 0,
  balance: 0,
  className: 'panel panel-success',
  ui: {
    progressBalance: '.progress-bar'
  },
  _get(i) {
    return this[i];
  },
  onDomRefresh() {
    var pb = this.getUI('progressBalance');
    var b = this.balance;
    var e = this.expenses;
    var i = this.incomes;

    pb.attr({
      'aria-valuenow': this.expenses,
      'aria-valuemin': 0,
      'aria-valuemax': this.incomes,
      'style': 'width: ' + (this.incomes * this.incomes) / 100 + '%'
    });
  },
  serializeData: function() {
    var expenses = 0, incomes = 0;
    _.each(this.collection.allRecords, _.bind(function(record) {
      var amount = Number(record.amount);
      var type = record.kind;
      if(type == 2) {
        this.incomes+=amount;
        this.incomes = Number(parseFloat(this.incomes).toFixed(2));
      } else if(type == 1) {
        this.expenses+=amount;
        this.expenses = Number(parseFloat(this.expenses).toFixed(2));
      }
    }, this));

    this.balance = parseFloat(this.incomes - this.expenses).toFixed(2);

    return {
      recordsNo: this.collection.total,
      incomes: this.incomes,
      expenses: this.expenses,
      balance: this.balance
    }
  }
});

module.exports = TotalsView;
