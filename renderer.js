const fs = require('fs');

document.querySelector('button#submit').addEventListener('click', () => {
  let fromDir = document.querySelector('input#fromDir').value;
  let toDir = document.querySelector('input#toDir').value;

  console.log(fromDir + ' ' + toDir);
})