const Marionette = require('backbone.marionette');
const RecordSchema = require('schemas/record');
const CategorySchema = require('schemas/category');
const template = require('templates/records/filters.hbs');
const moment = require('moment');

var FiltersView = Marionette.View.extend({
  template: template,
  ui: {
    dateTo: '.input-entry-date-to',
    dateFrom: '.input-entry-date-from',
    category: '.input-category',
    kind: '.input-kind',
    payment: '.input-payment',
    filters: '.filters-form'
  },
  modelEvents: {
    'change': 'onModelChange'
  },
  collectionEvents: {
    'sync': 'render'
  },
  initialize() {
    this.model = new RecordSchema.Record();
    this.collection = new CategorySchema.Categories();
    this.collection.fetch();
  },
  onModelChange: function(model) {
    this._doSearch();
  },
  setDatepickers: function() {
    for (var z in this.ui) {
      if (z.indexOf('date') > -1) {
        this.ui[z].datepicker({
          dateFormat: 'dd/mm/yyyy',
          autoClose: true,
          onSelect: _.bind(function(formatted, value) {
            this._doSearch();
          }, this)
        });
      }
    }

    var dateFrom = moment().startOf('month').format('DD/MM/YYYY');
    var dateTo = moment().endOf('month').format('DD/MM/YYYY');
    this.ui.dateTo.val(dateTo);
    this.ui.dateFrom.val(dateFrom);
  },
  onDomRefresh() {
    this.ui.category.bind('hidden.bs.select', _.bind(function (e) {
      var category_id = this.ui.category.selectpicker('val');
      this.model.set('category_id', category_id);
    }, this));

    this.ui.kind.bind('hidden.bs.select', _.bind(function (e) {
      var category_id = this.ui.kind.selectpicker('val');
      this.model.set('kind', category_id);
    }, this));

    this.ui.payment.bind('hidden.bs.select', _.bind(function (e) {
      var payment_method = this.ui.payment.selectpicker('val');
      this.model.set('payment_method', payment_method);
    }, this));
  },
  onRender: function() {
    this.setDatepickers();
    this.ui.category.selectpicker();
    this.ui.kind.selectpicker();
    this.ui.payment.selectpicker();
  },
  getData: function() {
    var data = _.extend({});
    var serializedData = this.getUI('filters').serializeArray();
    _.each(serializedData, function(d) {
      var datefield = $('#' + d.name);
      var isDateInput = (d.name.indexOf('date') > 0) ? true : false;
      if (isDateInput) {
        data[d.name] = app.stringToDate(d.value, 'dd/mm/yyyy', '/');
      } else {
        data[d.name] = d.value;
      }
    }, this);

    return data;
  },
  _doSearch: function(e) {
    if (e) {
      e.preventDefault();
    }
    app.trigger("apply:filters", {
      data: _.extend(this.getData(), {
        page: 1
      })
    });
    return false;
  },
  serializeData() {
    return {
      categories: this.collection.toJSON()
    };
  }
});

module.exports = FiltersView;
