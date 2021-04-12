const Store = require('electron-store');


const userConfig = {
    isFirstRun:{
        value: true
    },
	window: {
		size:{
            type: 'number',
            height: 300,
            width: 300,
            },
        position: 500,
        
	},
};

const configStorage = new Store({userConfig});


exports.configStorage = configStorage
