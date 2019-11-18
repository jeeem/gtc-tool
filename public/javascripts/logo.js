window._gtc.logoFactory = (logoKey) => {
  window._gtc[logoKey] = {};
  window._gtc[logoKey].startX = 0;
  window._gtc[logoKey].startY = 0;
  window._gtc[logoKey].lastRect = {
    leftCorner: 0,
    topCorner: 0,
    rightCorner: 0,
    bottomCorner: 0,
  };
  window._gtc[logoKey].setLast = (left, top, right, bot) => {
    window._gtc[logoKey].lastRect = {
      leftCorner: left,
      topCorner: top,
      rightCorner: right,
      bottomCorner: bot,
    };
  }
  window._gtc[logoKey].getArea = () => {
    let width = window._gtc[logoKey].lastRect.rightCorner - window._gtc[logoKey].lastRect.leftCorner - 1
    let height = window._gtc[logoKey].lastRect.bottomCorner - window._gtc[logoKey].lastRect.topCorner - 1
    return height * width
  }
}
window._gtc.logoFactory('mainLogo')
window._gtc.logoFactory('sponsorLogo')
