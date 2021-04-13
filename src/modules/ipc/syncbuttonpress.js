const { app,ipcMain } = require('electron')

function listenForAsyncButtonPress(){
ipcMain.handle('asyncButtonPress', async (event, arg) => {
    const result = await arg
    // basic logic for when a button has been pressed.
    if (arg == "exitIcon"){
      app.quit()
    }
  })
}

exports.listenForAsyncButtonPress = listenForAsyncButtonPress;
