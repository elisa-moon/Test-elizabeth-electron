const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => mainWindow.webContents.send('update-counter', 1),
                    label: 'Increment'
                },
                {
                    click: () => mainWindow.webContents.send('update-counter', -1),
                    label: 'Decrement'
                }
            ]
        }

    ])

    Menu.setApplicationMenu(menu)

    mainWindow.loadFile('index.html');
    // mainWindow.webContents.openDevTools()
}

// 初始化完成
app.whenReady().then(() => {
    // send时只能用on监听，invoke时，可以用handle监听
    ipcMain.on('qingsong', async (event, someArgument) => {
        console.log('listner qingsong', someArgument);
    })

    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
      })

    createWindow();
    // 激活时，打开窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 窗口都关掉时，程序退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})