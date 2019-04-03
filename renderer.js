const remote = require('electron').remote;
const dialog = remote.dialog;
const fs = remote.require('fs');
const fileProcess = require('./fileProcess');

let fromDir = null;
let toDir = null;

let submitProg = document.querySelector('.submitProgress');

document.querySelector('.dirSelect.from').addEventListener('click', () => {
  fromDir = dialog.showOpenDialog({
      properties: ['openDirectory']
  })[0];
  document.querySelector('.dirStr.from').innerHTML = fromDir;
})

document.querySelector('.dirSelect.to').addEventListener('click', () => {
  toDir = dialog.showOpenDialog({
      properties: ['openDirectory']
  })[0];
  document.querySelector('.dirStr.to').innerHTML = toDir;
})

document.querySelector('.submitBtn').addEventListener('click', () => {
  if (fromDir === null || toDir === null) {
    submitProg.innerHTML = '입력 폴더와 출력 폴더를 모두 선택하세요.'
  } else {
    let fp = new fileProcess(
      {
        fs: fs
      }, 
      {
        fromDir: fromDir,
        toDir: toDir,
        onlyUpdated: document.querySelector('#onlyUpdated').checked
      }, 
      {
        submitProg, submitProg
      });
  }
})