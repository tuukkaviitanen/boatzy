import { Fragment } from 'react';
import InlineDice from './InlineDice';

const TextWithInlineDice = ({ children }) => {
  const replacedText = Array.from(children).map((char, index) => {
    if (/\d/.test(char)) {
      const number = parseInt(char);
      return <InlineDice key={index} number={number} />;
    }

    if (/\t/.test(char)) {
      return <Fragment key={index}>&emsp;</Fragment>;
    }

    return <Fragment key={index}>{char}</Fragment>;
  });

  return <span>{replacedText}</span>;
};

export default TextWithInlineDice;
