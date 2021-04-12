const {BrowserWindow} = require('electron')
const createOverlayFixWindow = () => {
    overlayFixWindow = new BrowserWindow({
      skipTaskbar: true,
      frame: false,
      kiosk: true,
      transparent: true,
      alwaysOnTop: true,
    });
    //hide the overlayFix Window and ignore all clicks
    overlayFixWindow.setIgnoreMouseEvents(true);
    overlayFixWindow.setAlwaysOnTop(true, "normal");
    overlayFixWindow.hide();
  }
  
exports.createOverlayFixWindow = createOverlayFixWindow
