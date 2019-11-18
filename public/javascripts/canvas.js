
window._gtc.canvas = document.getElementById("canvas");
window._gtc.canvasImage = ''
window._gtc.imageEl = new Image()

const initCanvas = () => {
  // get references to the canvas and context
  window._gtc.ctx = canvas.getContext("2d");

  // style the context
  window._gtc.ctx.strokeStyle = "blue";
  window._gtc.ctx.lineWidth = 1;

  // calculate where the canvas is on the window
  // (used to help calculate mouseX/mouseY)
  window._gtc.$canvas = $("#canvas");
  window._gtc.canvasOffset = window._gtc.$canvas.offset();
  window._gtc.offsetX = window._gtc.canvasOffset.left;
  window._gtc.offsetY = window._gtc.canvasOffset.top;
  window._gtc.scrollX = window._gtc.$canvas.scrollLeft();
  window._gtc.scrollY = window._gtc.$canvas.scrollTop();
}

initCanvas()
var myDropzone = new Dropzone("div#myDropzone", { url: "/file-upload"});

myDropzone.on("thumbnail", function(file, dataURL) {
  /* Maybe display some more file information on your page */
  window._gtc.canvas.classList.remove('hidden')
  window._gtc.canvas.width = file.width
  window._gtc.canvas.height = file.height
  window._gtc.canvas.style.width = file.width + 'px'
  window._gtc.canvas.style.height = file.height + 'px'
  window._gtc.canvasImage = file.dataURL;
  document.getElementById('myDropzone').classList.add('hidden')
  initCanvas()
  var background = new Image();
  window._gtc.imageEl.src = window._gtc.canvasImage;

  // Make sure the image is loaded first otherwise nothing will draw.
  window._gtc.imageEl.onload = function(){
    window._gtc.ctx.drawImage(window._gtc.imageEl,0,0);   
  }
});
