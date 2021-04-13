const { app, BrowserWindow, globalShortcut } = require('electron')
const {createOverlayFixWindow} = require('./src/modules/window/windows-taskbar-fix')
const {createWindow, isFirstTimeRunning, changedWindowSize} = require('./src/modules/window/create-window')
const {createSystemTray} = require('./src/modules/window/system-tray')



//things to do when app is ready
//create global variables


app.whenReady().then(() => {
  //creat main window and overlay fix
  createOverlayFixWindow();
  createWindow();
  createSystemTray();
  
  // when the main window is resized saves to configStorage
  mainWindow.on('resize', changedWindowSize);
  // Register a 'CommandOrControl+D' shortcut listener.
  globalShortcut.register('CommandOrControl+D', () => {
    //check window state show/hide
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

