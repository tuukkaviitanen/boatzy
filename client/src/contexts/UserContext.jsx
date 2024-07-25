import { createContext, useCallback, useMemo, useState } from 'react';
import User from '../models/User';

export const UserContext = createContext();

const initialState = [new User('Player 1'), new User('Player 2')];

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState(initialState);

  const createUser = useCallback(
    (name) => {
      setUsers(...users, new User(name));
    },
    [users],
  );

  const setUserValue = useCallback(
    (userIndex, rowIndex, value) => {
      setUsers(
        Object.assign([], users, {
          [userIndex]: {
            ...users[userIndex],
            column: Object.assign([], users[userIndex].column, {
              [rowIndex]: { value },
            }),
          },
        }),
      );
    },
    [users],
  );

  const contextValues = useMemo(
    () => [users, { createUser, setUserValue }],
    [users, createUser, setUserValue],
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
