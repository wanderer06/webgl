window.onload = ready;


function ready() {

  function glMain() {
    this.gl = this.createOpenGLContext();

    this.setupScene();
    setInterval(this.loop.bind(this), 150);
  }

  glMain.prototype = {

    loop: function () {
      this.updateScene();
      this.drawGraphics();
      this.presentGraphics();
    },

    setupScene: function () {
      this.buildTriangle();
    },

    buildTriangle: function () {
      // define triangle vertices
      var triangleVertices = [
        0.0, 0.5,
        0.5, -0.5,
        -0.5, -0.5
      ];

      // upload data to the GPU
      // done via a Vertex Buffer Object (VBO)
      // first, create the buffer
      var vbo = this.gl.createBuffer(1, vbo);

      // make this the active array buffer
      // creates an active "bridge" to the specified vbo
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);

      // we can now send (or buffer) data to it
      // notice it's not using the vbo id
      // but rather the array buffer we activated
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangleVertices), this.gl.STATIC_DRAW);

      // vertex data is now on the GPU, however it's only a collection of points
      // creating a shader will tell the graphic card how to handle them
      var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
      this.gl.shaderSource(vertexShader, this.getVertexShaderText());

      // compile shader to executable
      this.gl.compileShader(vertexShader);

      // get compilation status
      // check compile status
      if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
        console.warn('Vertex shader compilation failed: ' + this.gl.getShaderInfoLog(vertexShader));
      }

      // fragment shader is compiled in exactly the same way
      // code duplication follows, but can be done in single function
      var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
      this.gl.shaderSource(fragmentShader, this.getFragmentShaderText());

      this.gl.compileShader(fragmentShader);

      if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
        console.warn('Fragment shader compilation failed: ' + this.gl.getShaderInfoLog(fragmentShader));
      }

      // now that we have both shaders compiled succesfully
      // we can compile them into a program
      var shaderProgram = this.gl.createProgram();
      this.gl.attachShader(shaderProgram, vertexShader);
      this.gl.attachShader(shaderProgram, fragmentShader);

      // linking a program applies the vertex and fragment shader changes
      // shaders can still be modified but will not take effect unless re-linked
      this.gl.linkProgram(shaderProgram);

      // to start using a shader in the program
      this.gl.useProgram(shaderProgram);
    },

    createOpenGLContext: function () {
      // first get our canvas element
      var canvas = document.getElementById('glcanvas');

      // retrieve the gl context
      return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    },

    updateScene: function () {

    },

    drawGraphics: function () {

    },

    presentGraphics: function () {

    },

    getVertexShaderText: function () {
      return document.getElementById('vertex-shader').text;
    },

    getFragmentShaderText: function () {
      return document.getElementById('fragment-shader').text;
    }

  };

  var app = new glMain();

}

