const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')

const {createOverlayFixWindow} = require('./src/modules/window/windows-taskbar-fix')
const {createWindow, changedWindowSize} = require('./src/modules/window/create-window')
const {createSystemTray} = require('./src/modules/window/system-tray')
const {listenForAsyncButtonPress} = require('./src/modules/ipc/syncbuttonpress')


// handle the squirrel installer events
var handleStartupEvent = function() {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':

      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Always quit when done
      app.quit();

      return true;
    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Always quit when done
      app.quit();

      return true;
    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
  }
};

if (handleStartupEvent()) {
  return;
}


//things to do when app is ready
//create global variables


app.whenReady().then(() => {
  //creat main window and overlay fix
  createOverlayFixWindow();

  createWindow();

  createSystemTray();

  listenForAsyncButtonPress();
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

  ///****** BUTTON PRESS EXAMPLES */
  // // awaits the reply and if no reply hangs the render process
  // ipcMain.on('synchronousButtonPress', (event, arg) => {
  //   console.log(arg + " has been delivered to main")
  // })

  // // allows the program not to hang on button press in the render process
  // ipcMain.handle('asyncButtonPress', async (event, arg) => {
  //   const result = await arg
  //   // basic logic for when a button has been pressed.
  //   console.log(arg + "has been delivered to main")
  // })
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

