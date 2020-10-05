const fs = require("fs");
const stream = require("stream");

const { makeCaesarCipher } = require("./caesar-cipher");

const inputStream = (text) => {
  if (text) {
    return fs.createReadStream(text);
  }
  console.log("You have to write text");
  return process.stdin;
};

const outputStream = (text) => {
  if (text) {
    return fs.createWriteStream(text, { flags: "a" });
  }
  return process.stdout;
};

const changeText = (params) => {
  class CaesarTransformer extends stream.Transform {
    constructor() {
      super();
      this.on("finish", () => {
        if (fs.existsSync(params.output)) {
          fs.appendFileSync(params.output, `\n`);
        }
      });
    }
    _transform(data, encoding, callback) {
      const chunk = makeCaesarCipher(data, Number(params.shift), params.action);
      this.push(chunk);
      callback();
    }
  }

  return new CaesarTransformer();
};

module.exports = {
  inputStream,
  outputStream,
  changeText,
};
