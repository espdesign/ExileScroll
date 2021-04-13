const { contextBridge, ipcRenderer,} = require('electron')
// preload node modules and use context bridge to make them
// available in the renderer process.
// https://www.electronjs.org/docs/api/context-bridge

  contextBridge.exposeInMainWorld(
    'electron',
    {
      contextBridgeAPI:{
        synchronousButtonPress: (buttonID ) => {
          ipcRenderer.send("synchronousButtonPress", buttonID);
        },
        asyncButtonPress: (buttonID) =>{
          return ipcRenderer.invoke("asyncButtonPress",buttonID);
        }

      }

    }
  )



