class FileProcess {
  constructor(lib, inputs, elms) {
    this.fs = lib.fs;

    this.onlyUpdated = inputs.onlyUpdated;
    this.fromDir = inputs.fromDir;
    this.toDir = inputs.toDir;
    this.submitProg = elms.submitProg;

    this.dirsToPrc = [this.fromDir]; // push된 폴더가 처리되고 pop되는 곳
    this.prcDirInterval;
    this.procFileCount = 0;
    this.procDirCount = 0;

    this.init();
  }
}

let submitProg = document.querySelector('.submitProgress');

FileProcess.prototype.init = function () {
  const fp = this;

  fp.prcDirInterval = setInterval(() => {
    fp.processDirs();
    if (fp.dirsToPrc.length === 0) {
      clearInterval(fp.prcDirInterval);
    }
  }, 0)
}

// 모든 내부 폴더들을 처리
FileProcess.prototype.processDirs = function () {
    const fp = this;
    let dirToPrc = fp.dirsToPrc.pop();
    fp.fs.readdirSync(dirToPrc).forEach((inDir) => {
      let indName = dirToPrc + '/' + inDir;
      if (fp.fs.lstatSync(indName).isDirectory()) {
        fp.dirsToPrc.push(indName);
        fp.procDirCount++;
      } else {
        fp.procFileCount++;
      }
      fp.submitProg.innerHTML = fp.procFileCount + '개 파일, ' + fp.procDirCount + '개 폴더 처리됨';
      console.log(indName);
      console.log(fp.onlyUpdated);
    });
}

module.exports = FileProcess;