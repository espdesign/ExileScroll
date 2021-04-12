const {BrowserWindow} = require('electron')
const path = require('path')
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
      preload: path.join(__dirname, '../preload/preload.js')
    }
  })
  mainWindow.setAlwaysOnTop(true, "pop-up-menu");
  mainWindow.loadFile('src/html/index.html');
  mainWindow.webContents.openDevTools();
}
  
exports.createWindow = createWindow
