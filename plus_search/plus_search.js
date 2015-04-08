jQuery(document).ready(function($) {
  // $('#block-plus-search-form form').append(pf_modes());
  $('#block-plus-search-form form .form-type-textfield').prepend(pf_types());
  $('#edit-search-type--2').hide();
  $('#edit-search-type').hide();
  $('#sd-fu').click(function() {pf_change_mode('falmouth');});
  $('#sd-uoe').click(function() {pf_change_mode('exeter');});
  $('#sd-refresh').click(function() {pf_change_mode('refresh');});

  $('#page-header.notfront').css("display", "block");
  $('#page-header.notfront').hide();
  //$('#search-toggle').click(function() {pf_reveal_search();});
  //$('.nav-collapse .menu .last').click(function(e) { e.preventDefault(); pf_reveal_search();});

  // change type of search (voyager/onestop/exeter)
  $('#search-type li').click(function() {
    pf_change_type($(this).attr('data'));
  });
  pf_change_type('catalog');
  window.inst_context = readCookie('Drupal.visitor.institution');

  if (window.inst_context) {pf_change_mode(window.inst_context);}
  /*  
  $('#search-type li.inst').click(function() {
    pf_change_institution($(this).attr('data-inst'));
  });
  */

    // Invoke the placeholder plugin
    $('input, textarea').placeholder();
    // That’s it, really.
    // Now display a message if the browser supports placeholder natively
    /*var html;
    if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
     html = '<strong>Your current browser natively supports <code>placeholder</code> for <code>input</code> and <code>textarea</code> elements.</strong> The plugin won’t run in this case, since it’s not needed. If you want to test the plugin, use an older browser ;)';
    } else if ($.fn.placeholder.input) {
     html = '<strong>Your current browser natively supports <code>placeholder</code> for <code>input</code> elements, but not for <code>textarea</code> elements.</strong> The plugin will only do its thang on the <code>textarea</code>s.';
    }
    if (html) {
     $('<p class="note">' + html + '</p>').insertAfter('form');
    }
    */
   
});
function pf_reveal_search() {
  switch(window.search_toggle) { 
    case 1:
      jQuery('#page-header').hide('fast');
      window.search_toggle = 0;
      break;
    default:
      jQuery('#page-header').show('fast');
      window.search_toggle = 1;
      break;
  }

}

//plus_form search domain selection element
function pf_modes() {
  //element = '<h2>Search the Library</h2>';
  element = '<div id="search-domain" class="btn-group">';
  element += '<div id="sd-refresh" class="lib-dom btn"><icon class="icon-refresh"></icon></div>';
  element += '<div id="sd-fu" class="lib-dom btn">Falmouth</div>';
  element += '<div id="sd-uoe" class="web-dom btn">Exeter</div>';
  element += '</div>';
  return element;
}


function pf_types() {
  element = '<div id="search-type" >';
    element += '<ul class="nav nav-tabs">';
      element += '<li data-inst="fx" data="catalog"><a>library</a></li>';
      element += '<li data-inst="fu" data="onestop"><a>one stop <span class="mobile-shorten">search</span></a></li>';
      element += '<li data-inst="uoe" data="exeter"><a>exeter <span class="mobile-shorten">catalogue<span></a></li>';
      //element += '<li data-inst="fx" data="website">website</li>';
      //element += '<li data="encore">encore</li>';
    element += '</ul>';
  element += '</div>';
  return element;
}
/*
function pf_types() {
  element = '<div id="search-type" >';
    element += '<table style="width:100%;">';
      element += '<tr>';
        element += '<td data-inst="fu" data="onestop" class="stype left">one stop search</td>';
        element += '<td data-inst="fx" data="catalog" class="stype central">library catalog</td>';
        element += '<td data-inst="uoe" data="exeter" class="stype right">exeter catalog</td>';
      element += '</tr>';
      element += '<tr>';
        element += '<td data-inst="fu" class="inst first left">Falmouth</td>';
        element += '<td data-inst="fx" class="both"></td>';
        element += '<td data-inst="uoe" class="inst last uoe">Exeter</td>';
      element += '</tr>';
  element += '</div>';
  return element;
}*/

function pf_change_mode(searchmode) {
  switch (searchmode) {
    case 'falmouth':
      jQuery('#sd-fu').addClass('active btn-info');
      jQuery('#sd-uoe').removeClass('active btn-info');
      jQuery('[data-inst=fu]').show();
      jQuery('[data-inst=uoe]').hide();
      pf_change_type('catalog');
      createCookie('Drupal.visitor.institution', 'falmouth', 2);
      //jQuery('#edit-search-type').val('catalog');
      //jQuery('#search-type').show();
      break;
    case 'exeter':
      jQuery('#sd-uoe').addClass('active btn-info');
      jQuery('#sd-fu').removeClass('active btn-info');
      jQuery('[data-inst=uoe]').show();
      jQuery('[data-inst=fu]').hide();
      pf_change_type('catalog');
      createCookie('Drupal.visitor.institution', 'exeter', 2);
      //jQuery('#edit-search-type').val('site');
      //jQuery('#search-type').hide();
      break;
    default:
      jQuery('#sd-uoe').removeClass('active btn-info');
      jQuery('#sd-fu').removeClass('active btn-info');
      jQuery('[data-inst=uoe]').show();
      jQuery('[data-inst=fu]').show();
      pf_change_type('catalog');
      eraseCookie('Drupal.visitor.institution');
      break;
  }
}

function pf_change_type(type) {
  jQuery('#search-type li').removeClass('active');
  jQuery('#search-type li').addClass('inactive');
  jQuery('#search-type li[data='+type+']').addClass('active');
  jQuery('#search-type li[data='+type+']').removeClass('inactive');
  jQuery('#edit-search-type--2').val(type);
  jQuery('#edit-search-type').val(type);
  pf_change_message(type);
  window.pf_type=type;
}
function pf_change_message(type) {
  var message;
  switch (type) {
    case 'onestop':
      message = "search all Falmouth University resources";
      break;
    case 'exeter':
      message = "search University of Exeter catalogue";
      break;
    case 'website':
      message = "search the library website"
      break;
    case 'catalog':
      message = "search the library shelves"
      break;
    default:
      message = 'search the library';
      break;
  }
  jQuery('#block-plus-search-form input.search-query').prop('placeholder', message);
  jQuery('#block-plus-search-form input.search-query').placeholder();
}

function pf_change_institution(institution) {
  jQuery('#search-type td').not('[data-inst='+institution+']').addClass('de-activated').removeClass('activated');
  jQuery('#search-type td[data-inst='+institution+']').addClass('activated').removeClass('de-activated');
  jQuery('#search-type td[data-inst=fx]').addClass('activated').removeClass('de-activated');
  // default to catalog search
  pf_change_type('catalog');
  window.pf_inst=institution;
}


// TODO - move cookie code to institutional_context
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
