const { program } = require("commander");
const { pipeline } = require("stream");

const { inputStream, outputStream, changeText } = require("./src/streams");
const { validateParams } = require("./src/validation");

program
  .storeOptionsAsProperties(false)
  .option("-s, --shift <number>", "Shift")
  .option("-i, --input <string>", "Input File")
  .option("-o, --output <string>", "Output File")
  .option("-a, --action <string>", "Encode or Decode");

try {
  program.parse(process.argv);
  const params = program.opts();

  validateParams(params);

  pipeline(
    inputStream(params.input),
    changeText(params),
    outputStream(params.output),
    (error) => {
      if (error) {
        console.error("Failed", error);
      } else {
        console.log("Done");
      }
    }
  );
} catch (error) {
  console.error(error);
  process.exit(1);
}
