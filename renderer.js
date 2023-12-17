console.log(window.caohui.test, window.caohuiObj)
document.getElementById('caohui').innerHTML = window.caohui.test;
document.getElementById('send').addEventListener('click', function(){
    window.caohui.yaxin()
})


const counter = document.getElementById('counter');

window.caohui.onUpdateCounter((_event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue
})