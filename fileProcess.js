class FileProcess {
  constructor(fs, fromDir, toDir, submitProg) {
    this.fs = fs;
    this.fromDir = fromDir;
    this.toDir = toDir;
    this.submitProg = submitProg;
    this.dirsToPrc = [fromDir]; // push된 폴더가 처리되고 pop되는 곳
    this.procFileCount = 0;
    this.procDirCount = 0;
    this.init();
  }
}

let submitProg = document.querySelector('.submitProgress');

FileProcess.prototype.init = function () {
  const fp = this;

  fp.processDirs();
}

// 모든 내부 폴더들을 처리
FileProcess.prototype.processDirs = function () {
  const fp = this;
  if (fp.dirsToPrc.length === 0) return;

  console.log("+++++");
  console.log(fp.dirsToPrc);
  let dirToPrc = fp.dirsToPrc.pop();
  console.log(dirToPrc);
  console.log(fp.dirsToPrc);
  fp.fs.readdir(dirToPrc, (err, inDirs) => {
    if (err) {
      fp.submitProg.innerHTML = err;
    }
    inDirs.forEach((inDir, idx) => {
      let indName = dirToPrc + '/' + inDir;
      if (fp.fs.lstatSync(indName).isDirectory()) {
        fp.dirsToPrc.push(indName);
        fp.procDirCount++;
      } else {
        fp.procFileCount++;
      }
      fp.submitProg.innerHTML = fp.procFileCount + '개 파일, ' + fp.procDirCount + '개 폴더 처리됨';
      // console.log(indName);
      if (idx == inDirs.length - 1) {
        fp.processDirs();
      }
    });
  });
}

module.exports = FileProcess;