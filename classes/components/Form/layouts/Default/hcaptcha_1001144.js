/* global $ */

// docs for rendering hcaptcha widgets:
// https://docs.hcaptcha.com/configuration/
(function(){
  'use strict';

  // Scale hcaptcha widget to fit within the form container.
  function scaleCaptcha(el) {
    var hCaptchaWidth = 304;
    var formWidth = $(el).closest('form').width();

    if(hCaptchaWidth > formWidth) {
      var captchaScale = formWidth / hCaptchaWidth;
      $(el).closest('.h-captcha-wrap').css({
        'transform':'scale('+captchaScale+')'
      });
    }
  }

  function render(id){
    var el = document.getElementById(id);
    var sitekey = el.getAttribute('data-sitekey');
    var locale = el.getAttribute('data-locale');
    window.hcaptcha.render(el, {sitekey: sitekey, hl: locale});

    scaleCaptcha(el);
  }

  function renderQueue() {
    while(window.formWidgetHcaptchaQueue.length) {
      render(window.formWidgetHcaptchaQueue.pop());
    }
  }

  window.hcaptchacb = window.hcaptchacb || renderQueue;
  if(window.hcaptcha) {
    renderQueue();
  }

})();
