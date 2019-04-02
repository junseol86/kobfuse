const fs = require('fs');
const {dialog} = require('electron').remote;

let fromDir = null;
let toDir = null;

document.querySelector('.dirSelect.from').addEventListener('click', () => {
  fromDir = dialog.showOpenDialog({
      properties: ['openDirectory']
  });
  document.querySelector('.dirStr.from').innerHTML = fromDir;
})

document.querySelector('.dirSelect.to').addEventListener('click', () => {
  toDir = dialog.showOpenDialog({
      properties: ['openDirectory']
  });
  document.querySelector('.dirStr.to').innerHTML = toDir;
})