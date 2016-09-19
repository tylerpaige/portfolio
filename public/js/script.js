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
  // debugger;
  var gradients = document.querySelectorAll('.section-gradient');
  for (var i = 0, ct = gradients.length; i < ct; i++) {
    var gradient = gradients[i];
    var section = gradient.parentNode;
    var sticky = fixto.fixTo(gradient, section);
  }
};

console.log('lol');
document.addEventListener('DOMContentLoaded', app.init);
