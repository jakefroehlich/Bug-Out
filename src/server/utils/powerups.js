/* eslint-disable no-undef */
const removeBrackets = () => {
  const currentCode = valueGetter.current();
  let newCode = currentCode.replaceAll('{', '');
  newCode = newCode.replaceAll('}', '');
  setCode(newCode);
};

const flipLet = () => {
  const currentCode = valueGetter.current();
  const newCode = currentCode.replaceAll('let', 'const');
  setCode(newCode);
};

const flipTrue = () => {
  const currentCode = valueGetter.current();
  const newCode = currentCode.replaceAll('true', 'false');
  setCode(newCode);
};

const deleteCommas = () => {
  const currentCode = valueGetter.current();
  const newCode = currentCode.replaceAll(',', '');
  setCode(newCode);
};

const deleteParens = () => {
  const currentCode = valueGetter.current();
  let newCode = currentCode.replaceAll('(', '');
  newCode = newCode.replaceAll(')', '');
  setCode(newCode);
};

const changeBoolean = () => {
  const currentCode = valueGetter.current();
  let newCode = currentCode.replaceAll('===', '!==');
  newCode = newCode.replaceAll('==', '!=');
  setCode(newCode);
};

module.exports = {
  powerUps: {
    removeBrackets,
    flipLet,
    flipTrue,
    deleteCommas,
    deleteParens,
    changeBoolean,
  },
};
