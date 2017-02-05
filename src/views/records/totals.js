import Marionette from 'backbone.marionette';
import template from '../../templates/records/totals-view.hbs';

var TotalsView = Marionette.View.extend({
  template: template,
  incomes: 0,
  expenses: 0,
  balance: 0,
  className: 'panel panel-success',
  serializeData: function() {
    var expenses = 0, incomes = 0;
    _.each(this.collection.allRecords, function(record) {
      var amount = Number(record.amount);
      var type = record.kind;
      if(type == 2) {
        incomes+=amount;
        incomes = Number(parseFloat(incomes).toFixed(2));
      } else if(type == 1) {
        expenses+=amount;
        expenses = Number(parseFloat(expenses).toFixed(2));
      }
    }, this);

    var balance = parseFloat(incomes - expenses).toFixed(2);
    return {
      recordsNo: this.collection.total,
      incomes: incomes,
      expenses: expenses,
      balance: balance
    }
  }
});

module.exports = TotalsView;
