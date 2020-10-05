const fs = require("fs");

const availbaleActions = ["encode", "decode"];

const validateParams = ({ action, shift, input, output }) => {
  try {
    if (!action) {
      throw new Error("-action is required");
    }
    if (action && !availbaleActions.includes(action)) {
      throw new Error("Enter valid -action");
    }
    if (!shift) {
      throw new Error("-shift is required");
    }
    if (shift && (isNaN(shift) || shift < 0)) {
      throw new Error("-shift value have to be positive ");
    }
    if (input && !fs.existsSync(input)) {
      throw new Error(`File '${input}' doesn't exist`);
    }
    if (output && !fs.existsSync(output)) {
      throw new Error(`File '${output}' doesn't exist`);
    }
    return false;
  } catch (error) {
    process.stderr.write(error);
    process.exit(1);
  }
};
module.exports = {
  validateParams,
};
