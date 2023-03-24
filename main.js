const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater")
const isDev = require('electron-is-dev');


autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'


autoUpdater.on('checking-for-update', () => {
    console.log('Checking updates....')
})

autoUpdater.on('update-available', (info) => {
    console.log('update available')
    console.log('Version', info.version)
    console.log('ReleaseDate', info.releaseDate)
})


autoUpdater.on('download-progress', (progress) => {
    console.log(`Progress ${Math.floor(progress.percent)}`)
})

autoUpdater.on('update-downloaded', (info) => {
    console.log('update downloaded')
    autoUpdater.quitAndInstall()
})


autoUpdater.on('error', (error) => {
    console.error(error);
})


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadFile('index.html')
}

app.on('ready', () => {
    if (!isDev) {
        autoUpdater.checkForUpdates();
    }
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})