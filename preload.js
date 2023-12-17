const { contextBridge, ipcRenderer } = require('electron');

// 上下文禁用时
window.caohuiObj = 'caohuiObj';

window.addEventListener('DOMContentLoaded', () => {
    console.log('加载了preloadjs, preloadjs可以访问doucment,window,nodejs环境');
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }

    // 灵活性有限，因为监听器无法直接与渲染器代码交互
    ipcRenderer.on('update-counter', (_event, value) => {
        const oldValue = Number(counter.innerText)
        const newValue = oldValue + value
        counter.innerText = newValue
    })
})

// 主渲染器的js上下文，上下文隔离。
// contextBridge.exposeInIsolatedWorld(1001, 'caohui', {
//     version: 'demo-1',
//     doSth: () => 'this is a dmeo',
//     call: ()=> ipcRenderer.invoke(window.caohui.yaxin),
//     // 除函数之外，我们也可以暴露变量
// })

contextBridge.exposeInMainWorld(
    'caohui',
    {
        test: '11111',
        yaxin: () => {
            console.log('触发yaxin');
            ipcRenderer.send('qingsong', { info: 'qingsong发来消息' });
        },
        onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)
    }
)

// window.electron.doThing()