const { capital, lower } = require("./alphabet");

const makeCaesarCipher = (data, shift, operation) => {
  const alphabetLength = capital.length - 1;
  const convertedData = data.toString().split("");
  const offset = shift % alphabetLength;
  const result = [];

  convertedData.forEach((letter) => {
    let targetArr;

    if (lower.includes(letter)) {
      targetArr = lower;
    } else if (capital.includes(letter)) {
      targetArr = capital;
    }

    if (targetArr) {
      const index = targetArr.indexOf(letter);
      let newIndex;

      if (operation === "encode") {
        newIndex =
          index + offset > alphabetLength
            ? (index + offset) % 26
            : index + offset;
      } else {
        newIndex =
          index - offset < 0
            ? alphabetLength + (index - offset) + 1
            : index - offset;
      }
      result.push(targetArr[newIndex]);
    } else {
      result.push(letter);
    }
  });
  return result.join("");
};

module.exports = { makeCaesarCipher };
