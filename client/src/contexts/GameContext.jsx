import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { UserContext } from './UserContext';

export const GameContext = createContext();

const initialState = { round: 0, turn: 0, gameEnded: false };

export const GameContextProvider = ({ children }) => {
  const [users, { resetUsers }] = useContext(UserContext);
  const [state, setState] = useState(initialState);

  const nextTurn = useCallback(() => {
    if (state.turn + 1 >= users.length) {
      setState((previousState) => ({
        ...previousState,
        turn: 0,
        round: previousState.round + 1,
      }));
    } else {
      setState((previousState) => ({
        ...previousState,
        turn: previousState.turn + 1,
      }));
    }
  }, [state.turn, users.length]);

  const resetGame = useCallback(() => {
    setState(initialState);
    resetUsers();
  }, [resetUsers]);

  const endGame = useCallback(
    () =>
      setState((previousState) => ({
        ...previousState,
        gameEnded: true,
      })),
    [],
  );

  const contextValues = useMemo(
    () => [state, { nextTurn, resetGame, endGame }],
    [state, nextTurn, resetGame, endGame],
  );

  return (
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  );
};
