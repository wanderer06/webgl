window.onload = start;
var gl; // global for WebGL

// see http://docs.gl

function start() {

  var canvas = document.getElementById('glcanvas');

  // init gl context
  gl = initWebGL(canvas);

  // check if webgl is running
  if (!gl) {
    return;
  }

  // set clear color to black
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // enable depth testing
  gl.enable(gl.DEPTH_TEST);
  // near things obscure far things
  gl.depthFunc(gl.LEQUAL);
  // clear the color and the depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // resize the canvas?
  gl.viewport(0, 0, canvas.width, canvas.height);

}

function initWebGL(canvas) {

  gl = null;

  // retrieve context
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    alert('Cannot initialize WebGL');
  }

  return gl;

}

function initShaders() {

  var fragmentShader = getShader(gl, 'shader-fs');
  var vertexShader = getShader(gl, 'shader-vs');

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize shader program: ' + gl.getProgramInfoLog(shader));
  }

  gl.useProgram(shaderProgram);

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(vertexPositionAttribute);

}

function getShader() {



}

