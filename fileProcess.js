class FileProcess {
  constructor(lib, inputs, elms) {
    this.fs = lib.fs;

    this.fromDir = inputs.fromDir;
    this.toDir = inputs.toDir;
    this.onlyUpdated = inputs.onlyUpdated;
    this.onlyJs = inputs.onlyJs;

    this.submitProg = elms.submitProg;

    this.dirsToPrc = [this.fromDir]; // push된 폴더가 처리되고 pop되는 곳
    this.prcDirInterval;
    this.procFileCount = 0;

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
      } else {
        if (!fp.onlyJs || inDir.slice(-3) === '.js') {
          fp.obfuscate(dirToPrc.replace(fp.fromDir, ''), inDir);
        }
      }
    });
}

// 입력 폴더의 js파일들을 출력 폴더로 처리
FileProcess.prototype.obfuscate = function (dirPath, fileName) {
  const fp = this;
  let toDir = (fp.toDir + dirPath);
  fp.fs.ensureDirSync(toDir);

  fp.procFileCount++;
  fp.submitProg.innerHTML = fp.procFileCount + '개 파일 폴더 처리됨';
}

module.exports = FileProcess;