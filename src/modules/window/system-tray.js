const {Tray, Menu, app} = require('electron');
const path = require('path');
const iconPath = (path.join(__dirname, '../../assets/icon.ico'))

 //make system tray and set icon and rightclick menu
  function createSystemTray(){
    systemTray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit', click: function () {
          app.isQuiting = true;
          app.quit()
        }
      },
    ])
    systemTray.setToolTip('ExileScroll.')
    systemTray.setContextMenu(contextMenu)
  }


  exports.createSystemTray = createSystemTray

  
