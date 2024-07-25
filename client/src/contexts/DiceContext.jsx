import { createContext, useCallback, useMemo, useState } from 'react';

export const DiceContext = createContext();

const initialState = [0, 0, 0, 0, 0];

export const DiceContextProvider = ({ children }) => {
  const [dices, setDices] = useState(initialState);

  const setDice = useCallback(
    (index, newState) => {
      setDices(Object.assign([], dices, { [index]: newState }));
    },
    [dices],
  );

  const resetDices = () => {
    setDices(initialState);
  };

  const contextValues = useMemo(
    () => [dices, { setDice, resetDices }],
    [dices, setDice],
  );

  return (
    <DiceContext.Provider value={contextValues}>
      {children}
    </DiceContext.Provider>
  );
};
