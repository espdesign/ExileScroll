const path = require('path');
const iconDir = path.resolve(__dirname, 'src','assets');
const config = {

packagerConfig: {
    name: 'ExileScroll',
    executableName: 'ExileScroll',
    icon: path.resolve(__dirname, 'src', 'assets', 'icon'),
},
makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "ExileScroll",
        exe: 'ExileScroll.exe',
        setupIcon: path.resolve(iconDir, 'icon.ico'),
        loadingGif: path.resolve(iconDir, 'installgif.gif')
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ]
}

module.exports = config;
