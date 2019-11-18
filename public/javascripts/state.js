window._gtc.state = {}
window._gtc.state.isDown = false
window._gtc.state.settingSponsor = false
window._gtc.state.logoKey = 'mainLogo'
window._gtc.state.getLogoKey = (setting = true) => {
  var logoKey = setting ? 'sponsorLogo' : 'mainLogo'
  window._gtc.ctx.strokeStyle = setting ? "red" : 'blue';
  if (!window._gtc.state.settingSponsor) {
    logoKey = setting ? 'mainLogo' : 'sponsorLogo'
    window._gtc.ctx.strokeStyle = setting ? "blue" : 'red';
  }
  if (setting) {
    window._gtc.state.logoKey = logoKey
  }
  return logoKey
}
