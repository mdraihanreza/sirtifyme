import jQuery from "jquery";

jQuery(document).ready(function ($) {
  // hamburgers
  var forEach = function (t, o, r) { if ("[object Object]" === Object.prototype.toString.call(t)) for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t); else for (var e = 0, l = t.length; l > e; e++)o.call(r, t[e], e, t) };
  var hamburgers = document.querySelectorAll(".hamburger");
  if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
      hamburger.addEventListener("click", function () {
        this.classList.toggle("is-active");
      }, false);
    });
  }
  // hamburgers

  //menu
  // var pull = jQuery('#pull');
  // var menu = jQuery('#menu-bg');
  // var menuHeight = menu.height();
  // jQuery(pull).on('click', function (e) {
   
  //   e.preventDefault();
  //   menu.slideToggle(500);
  // });
  // jQuery(window).resize(function () {
  //   var w = $(window).width();
  //   if (w > 320 && menu.is(':hidden')) {
  //     menu.removeAttr('style');
  //   }
  // });

  jQuery(document).on('click', '#pull', function(){
    // alert("success");
     // menu.slideToggle(500);

     jQuery('#menu-bg').slideToggle(500);

 });

  // Profile pic change

  jQuery("#imageUpload").change(function (data) {

    var imageFile = data.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = function (evt) {
      jQuery('#imagePreview').attr('src', evt.target.result);
      jQuery('#imagePreview').hide();
      jQuery('#imagePreview').fadeIn(650);
    }

  });


  // Scroll tabs


  jQuery.fn.tabbing = function (options) {
    // alert(1)
    var opts = { delayTime: 300 };
    options = options || {};
    opts = jQuery.extend(opts, options);
    return this.each(function () {
      jQuery(this).on('click', function (event) {
        event.preventDefault();
        var sum = 0;
        jQuery(this).prevAll().each(function () { sum += jQuery(this).width(); });
        var get = document.getElementById('tabs').scrollWidth
        var dist = sum - (jQuery(this).parent().width() - jQuery(this).width()) / 2;
        if (dist < 0) {
          dist = 0;
        }
        /* else if(dist+sum > get){
          dist = get-sum+dist+dist;
        } */
        jQuery(this).parent().animate({
          scrollLeft: dist
        }, opts['delayTime']);
      });
    });
  };

  jQuery('#tabs li').tabbing();


  jQuery('#tabs li').click(function () {
    var hashit = jQuery(this).find('a').attr('href')
  });

});

//menu

