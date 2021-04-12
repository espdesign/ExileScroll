const { app, BrowserWindow, globalShortcut } = require('electron')

const {createOverlayFixWindow} = require('./src/modules/window/windows-taskbar-fix')
const {createWindow, isFirstTimeRunning, changedWindowSize} = require('./src/modules/window/create-window')

console.log(app.getPath('appData'));

app.whenReady().then(() => {

  createOverlayFixWindow();
  createWindow();

  // when the main window is resized saves to configStorage
  mainWindow.on('resize', changedWindowSize);

     // Register a 'CommandOrControl+X' shortcut listener.
     globalShortcut.register('CommandOrControl+D', () => {
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
