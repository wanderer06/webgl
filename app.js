// WebGL tutorials
// mdn  https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL
// docs http://docs.gl

window.onload = start;
var gl; // global for WebGL

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

  var horizAspect = 480.0/640.0;
  initShaders();
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

function getShader(gl, id, type) {
  var shaderScript, theSource, shader;

  shaderScript = document.getElementById(id);

  if (!shaderScript) {
    alert('No shader script');
    return null;
  }

  theSource = shaderScript.text;

  if (!type) {
    if (shaderScript.type == 'x-shader/x-fragment') {
      type = gl.FRAGMENT_SHADER;
    } else if (shaderScript.type == 'x-shader/x-vertex') {
      type = gl.VERTEX_SHADER;
    } else {
      return null; // unknown type
    }
  }

  shader = gl.createShader(type);
  gl.shaderSource(shader, theSource);

    // compile shader program
  gl.compileShader(shader);

  // check compile status
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('Compilation failed: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  console.log(theSource);
  return shader;
}

function initBuffers() {
  var squareVerticesBuffer;

  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

}

