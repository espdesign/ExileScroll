const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
// 
//FIX FOR OVERLAY NO FLASHING WINDOWED MODE
// Create the special window to make the taskbar hidden always
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
///
/// END OF FIX FOR OVERLAY NO FLASHING WINDOWED MODE
///
function createWindow () {
    mainWindow = new BrowserWindow({
    width: 900,
    height: 900,
    center:true,
    alwaysOnTop: true,
    show: true,
    frame: false,
    skipTaskbar: true,
    backgroundColor: '#FFF',

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.setAlwaysOnTop(true, "pop-up-menu");
  mainWindow.loadFile('index.html');

}

app.whenReady().then(() => {
  createOverlayFixWindow();
  createWindow();

     // Register a 'CommandOrControl+X' shortcut listener.
     const ret = globalShortcut.register('CommandOrControl+D', () => {

      //check window state
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      }
      else {
        mainWindow.show();
      }
  
    })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})