import { createContext, useCallback, useMemo, useState } from 'react';
import User from '../models/User';

export const UserContext = createContext();

const initialState = [new User('Player 1'), new User('Player 2')];

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState(initialState);

  const createUser = useCallback(
    (name) => {
      setUsers([...users, new User(name)]);
    },
    [users],
  );

  const setUserValue = useCallback((userIndex, rowIndex, value) => {
    setUsers((previousUsers) =>
      Object.assign([], previousUsers, {
        [userIndex]: {
          ...previousUsers[userIndex],
          column: Object.assign([], previousUsers[userIndex].column, {
            [rowIndex]: { value },
          }),
        },
      }),
    );
  }, []);

  const setUserName = useCallback((userIndex, name) => {
    setUsers((previousUsers) =>
      Object.assign([], previousUsers, {
        [userIndex]: {
          ...previousUsers[userIndex],
          name,
        },
      }),
    );
  }, []);

  const deleteUser = useCallback((userIndex) => {
    setUsers((previousUsers) =>
      previousUsers.filter((_, index) => index !== userIndex),
    );
  }, []);

  const resetUsers = useCallback(() => {
    setUsers(initialState);
  }, []);

  const contextValues = useMemo(
    () => [
      users,
      { createUser, setUserValue, resetUsers, setUserName, deleteUser },
    ],
    [users, createUser, setUserValue, resetUsers, setUserName, deleteUser],
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
