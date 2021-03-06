const {BrowserWindow} = require('electron')
const {configStorage} = require('../config/store')
const path = require('path');


// this function returns a boolean if the configStorage has a record of running on the system before.
function isFirstTimeRunning(){
    //if it is the first time running set the configStorage.isFirstRun to false
    if (typeof(configStorage.get('isFirstRun')) == "undefined" ){
        configStorage.set('isFirstRun', false)
        return true;
    }
    // if its not the first time running return false
    else if (configStorage.get('isFirstRun') == false){
        return false;
    }
}

function getConfigWindowSize(){
    storedHeight = configStorage.get('window.size.height')
    storedWidth = configStorage.get('window.size.width')
}

function buildWindow(){
    getConfigWindowSize();
    mainWindow = new BrowserWindow({
        width: storedWidth,
        height: storedHeight,
        minHeight: 200,
        minWidth: 200,
        alwaysOnTop: true,
        show: true,
        frame: false,
        skipTaskbar: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js')
        }
      })
      mainWindow.setAlwaysOnTop(true, "pop-up-menu");
      mainWindow.loadFile('src/web/html/index.html');
      mainWindow.webContents.openDevTools();
}
// main create window handler.
function createWindow (){
    if (isFirstTimeRunning()){
        //if its the first time running set a default window size.
        configStorage.set('window.size.height', 1000)
        configStorage.set('window.size.width', 1000)
        buildWindow();
    }
    else {
        //if its not first time running build the window
        buildWindow();
    }
    
}

// this function saves the window size after resizing in the configStorage
function changedWindowSize(){
    windowSizeHeight = (mainWindow.getSize())[1]
    windowSizeWidth = (mainWindow.getSize())[0]
    configStorage.set('window.size.height', windowSizeHeight)
    configStorage.set('window.size.width', windowSizeWidth)
}


//export needed functions
exports.createWindow = createWindow
exports.isFirstTimeRunning = isFirstTimeRunning
exports.changedWindowSize = changedWindowSize
