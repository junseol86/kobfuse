const remote = require('electron').remote;
const dialog = remote.dialog;
const session = remote.session;
const fs = remote.require('fs');
const fileProcess = require('./fileProcess');

session.defaultSession.cookies.get({url: 'https://www.ddhouse.co.kr'}, (error, cookies) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(cookies);
  cookies.forEach((cookie, idx) => {
    if (cookie.name === 'fromDir') {
      setFromDir(cookie.value);
    }
    if (cookie.name === 'toDir') {
      setToDir(cookie.value);
    }
  })
})

let fromDir = null;
let toDir = null;

let submitProg = document.querySelector('.submitProgress');

document.querySelector('.dirSelect.from').addEventListener('click', () => {
  setFromDir(dialog.showOpenDialog({
      properties: ['openDirectory']
  })[0]);
})
document.querySelector('.dirSelect.to').addEventListener('click', () => {
  setToDir(dialog.showOpenDialog({
      properties: ['openDirectory']
  })[0]);
})


function setFromDir (fd) {
  fromDir = fd;
  document.querySelector('.dirStr.from').innerHTML = fromDir;
  session.defaultSession.cookies.set({
    url: 'https://www.ddhouse.co.kr', name: 'fromDir', value: fromDir
  }, (error) => {
    if (error) console.log(error)
  })
}
function setToDir (td) {
  toDir = td;
  document.querySelector('.dirStr.to').innerHTML = toDir;
  session.defaultSession.cookies.set({
    url: 'https://www.ddhouse.co.kr', name: 'toDir', value: toDir
  }, (error) => {
    if (error) console.log(error)
  })
}

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