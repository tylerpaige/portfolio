var app = {};

//ELEMENTS To TRACK
app.init = function() {
  var els = app.captureElements();
  console.log('els', els);
  var headers = els.headers;
  var gradients = els.gradients;
  app.setupStick(headers, gradients);
}

app.captureElements = function() {
  var headers = document.querySelectorAll('.js-sticky-hed');
  var gradients = document.querySelectorAll('.js-sticky-gradient');

  return {
    headers : headers,
    gradients : gradients
  };
}

app.setupStick = function(headers, gradients) {

  for (var i = 0, ct = headers.length; i < ct; i++) {
    var header = headers[i];
    var gradient = gradients[i];
    var section = header.parentNode;
    var stickyOptions = {
      useNativeSticky : false
    };
    var stickyHed = fixto.fixTo(header, section, stickyOptions);
    var stickyGrad = fixto.fixTo(gradient, section, stickyOptions);
  }
};

document.addEventListener('DOMContentLoaded', app.init);
