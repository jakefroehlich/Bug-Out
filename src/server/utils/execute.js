// execute.js
import preprocess from './transpile';

export default function executeCode(code) {
  try {
    return new Function(preprocess(code));
  } catch (error) {
    console.error(error);
  }
}