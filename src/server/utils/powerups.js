/* eslint-disable no-undef */
// const removeBrackets = (code) => {
//   const currentCode = code;
//   let newCode = currentCode.replaceAll('{', '');
//   newCode = newCode.replaceAll('}', '');
//   return newCode;
// };
const assignmentToEquals = (code) => {
  const currentCode = code;
  const newCode = currentCode.replaceAll('=', '===');
  return newCode;
};

const equalsToAssignment = (code) => {
  const currentCode = code;
  const newCode = currentCode.replaceAll('===', '=');
  return newCode;
};

const flipLet = (code) => {
  const currentCode = code;
  const newCode = currentCode.replaceAll('let', 'const');
  return newCode;
};

const flipTrue = (code) => {
  const currentCode = code;
  const newCode = currentCode.replaceAll('true', 'false');
  return newCode;
};

const deleteCommas = (code) => {
  const currentCode = code;
  const newCode = currentCode.replaceAll(',', '');
  return newCode;
};

// const deleteParens = (code) => {
//   const currentCode = code;
//   let newCode = currentCode.replaceAll('(', '');
//   newCode = newCode.replaceAll(')', '');
//   return newCode;
// };

const changeBoolean = (code) => {
  const currentCode = code;
  let newCode = currentCode.replaceAll('===', '!==');
  newCode = newCode.replaceAll('==', '!=');
  return newCode;
};

module.exports = {
  powerUps: {
    removeBrackets,
    flipLet,
    flipTrue,
    deleteCommas,
    deleteParens,
    changeBoolean,
    assignmentToEquals,
    equalsToAssignment,
  },
};
