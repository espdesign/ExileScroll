const Store = require('electron-store');


const userConfig = {
};

const configStorage = new Store({userConfig});


exports.configStorage = configStorage
