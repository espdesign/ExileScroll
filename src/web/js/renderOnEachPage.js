// this page is for scripts to run on every page/tool

//wait for the dom content to load
    window.addEventListener('DOMContentLoaded', () => {

        console.log("DOMContentLoaded...(indexrender.js)")
        //send a async message to main process to exit aplication
        
        document.getElementById('exitIcon').addEventListener('click', () => {
            console.log(window.electron.contextBridgeAPI.asyncButtonPress('exitIcon'))
        })
    })

