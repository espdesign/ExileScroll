const { app, BrowserWindow, globalShortcut } = require('electron')

const {createOverlayFixWindow} = require('./src/modules/window/windows-taskbar-fix')
const {createWindow} = require('./src/modules/window/create-window')

console.log(app.getPath('appData'));

app.whenReady().then(() => {

  createOverlayFixWindow();
  createWindow();

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