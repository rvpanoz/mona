define([
  'jquery'
], function($) {

  quickmenu($('.quickmenu__item.active'));

  $('body').on('click', '.quickmenu__item', function() {
    quickmenu($(this));
  });

  function quickmenu(item) {
    var menu = $('.sidebar__menu');
    menu.removeClass('active').eq(item.index()).addClass('active');
    $('.quickmenu__item').removeClass('active');
    item.addClass('active');
    menu.eq(0).css('margin-left', '-' + item.index() * 200 + 'px');
  }

  $('.sidebar li').on('click', function(e) {
    // e.stopPropagation();
    var second_nav = $(this).find('.collapse').first();
    if (second_nav.length) {
      second_nav.collapse('toggle');
      $(this).toggleClass('opened');
    }
  });

  $('body').on('click', '.header-navbar-mobile__menu button', function() {
    $('.dashboard').toggleClass('dashboard_menu');
  });

});
