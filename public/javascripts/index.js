
const toggleVisibleElements = () => {
  let classToShow = window._gtc.state.settingSponsor ? 'show-sponsor-active' : 'show-main-active'
  let classToHide = window._gtc.state.settingSponsor ? 'show-main-active' : 'show-sponsor-active'
  Array.from(document.querySelectorAll(`.${classToShow}`)).forEach(el => {
    el.classList.remove('hidden')
  })
  Array.from(document.querySelectorAll(`.${classToHide}`)).forEach(el => {
    el.classList.add('hidden')
  })
}

document.getElementById("editMain").onclick=(() => {
  window._gtc.state.settingSponsor = !window._gtc.state.settingSponsor
  toggleVisibleElements()
})
document.getElementById("editSponsor").onclick=(() => {
  window._gtc.state.settingSponsor = !window._gtc.state.settingSponsor
  toggleVisibleElements()
})

const updateSponsorArea = () => {
  let mainArea = window._gtc.mainLogo.getArea()
  let sponsorArea = window._gtc.sponsorLogo.getArea()
  if (mainArea <= 1 || sponsorArea <= 1) {
    document.getElementById(`sponsorLogoPercent`).value='invalid'
    return
  }
  document.getElementById(`sponsorLogoPercent`).value=(((sponsorArea / mainArea) * 100).toFixed(2) + '%')
}

function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    window._gtc.state.getLogoKey()
    var logoKey = window._gtc.state.logoKey

    // save the starting x/y of the rectangle
    window._gtc[logoKey].startX = parseInt(e.clientX - window._gtc.offsetX + window.scrollX);
    window._gtc[logoKey].startY = parseInt(e.clientY - window._gtc.offsetY + window.scrollY);
    // set a flag indicating the drag has begun
    window._gtc.state.isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    window._gtc.state.isDown = false;
}

function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    window._gtc.state.isDown = false;
}

function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!window._gtc.state.isDown) {
        return;
    }
    window._gtc.state.getLogoKey()
    var logoKey = window._gtc.state.logoKey

    // get the current mouse position
    window._gtc[logoKey].mouseX = parseInt(e.clientX - window._gtc.offsetX + window.scrollX);
    window._gtc[logoKey].mouseY = parseInt(e.clientY - window._gtc.offsetY + window.scrollY);

    // Put your mousemove stuff here

    // clear the canvas
    var leftCorner = window._gtc[logoKey].startX < window._gtc[logoKey].mouseX ? window._gtc[logoKey].startX - 1 : window._gtc[logoKey].mouseX - 1
    var topCorner = window._gtc[logoKey].startY < window._gtc[logoKey].mouseY ? window._gtc[logoKey].startY - 1 : window._gtc[logoKey].mouseY - 1

    var rightCorner = window._gtc[logoKey].startX > window._gtc[logoKey].mouseX ? window._gtc[logoKey].startX : window._gtc[logoKey].mouseX
    var bottomCorner = window._gtc[logoKey].startY > window._gtc[logoKey].mouseY ? window._gtc[logoKey].startY : window._gtc[logoKey].mouseY

    window._gtc.ctx.clearRect(
      0,
      0,
      window._gtc.canvas.width,
      window._gtc.canvas.height
    );

    window._gtc[logoKey].setLast(leftCorner, topCorner, rightCorner, bottomCorner)

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    var width = window._gtc[logoKey].mouseX - window._gtc[logoKey].startX;
    var height = window._gtc[logoKey].mouseY - window._gtc[logoKey].startY;

    window._gtc.ctx.drawImage(window._gtc.imageEl,0,0);

    // draw a new rect from the start position
    // to the current mouse position
    window._gtc.ctx.strokeRect(window._gtc[logoKey].startX, window._gtc[logoKey].startY, width, height);

    let otherKey = window._gtc.state.getLogoKey(false)
    window._gtc.ctx.strokeRect(
      window._gtc[otherKey].lastRect.leftCorner,
      window._gtc[otherKey].lastRect.topCorner,
      window._gtc[otherKey].lastRect.rightCorner - window._gtc[otherKey].lastRect.leftCorner,
      window._gtc[otherKey].lastRect.bottomCorner - window._gtc[otherKey].lastRect.topCorner
    );

    width = Math.abs(width)
    height = Math.abs(height)
    let area = width * height
    document.getElementById(`${logoKey}Width`).value=width
    document.getElementById(`${logoKey}Height`).value=height
    document.getElementById(`${logoKey}Area`).value=area
    updateSponsorArea()
}

// listen for mouse events
window._gtc.$canvas.mousedown(function (e) {
    handleMouseDown(e);
});
window._gtc.$canvas.mousemove(function (e) {
    handleMouseMove(e);
});
window._gtc.$canvas.mouseup(function (e) {
    handleMouseUp(e);
});
window._gtc.$canvas.mouseout(function (e) {
    handleMouseOut(e);
});
