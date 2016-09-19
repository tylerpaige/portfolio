var app = {};

//ELEMENTS To TRACK

app.init = function() {
  console.log('init');
  app.captureElements();
  app.setupHeaders();
}

app.captureElements = function() {
  app.headers = document.querySelectorAll('section h1');
}

app.setupHeaders = function() {

  var headers = document.querySelectorAll('section h1');
  for (var i = 0, ct = app.headers.length; i < ct; i++) {
    var header = app.headers[i];
    var section = header.parentNode;
    var sticky = fixto.fixTo(header, section);
  }

  var gradients = document.querySelectorAll('.section-gradient');
  for (var i = 0, ct = app.headers.length; i < ct; i++) {
    var gradient = gradients[i];
    var section = gradient.parentNode;
    var sticky = fixto.fixTo(gradient, section);
  }
};

console.log('lol');
document.addEventListener('DOMContentLoaded', app.init);
