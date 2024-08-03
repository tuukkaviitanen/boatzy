import { createContext, useCallback, useMemo, useState } from 'react';

export const PopoverContext = createContext();

const initialState = { userPopover: { anchorEl: null, userIndex: null } };

export const PopoverContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setUserPopover = useCallback((anchorElement, userIndex) => {
    setState((previousState) => ({
      ...previousState,
      userPopover: {
        anchorElement,
        userIndex,
      },
    }));
  }, []);

  const contextValues = useMemo(
    () => [state, { setUserPopover }],
    [setUserPopover, state],
  );

  return (
    <PopoverContext.Provider value={contextValues}>
      {children}
    </PopoverContext.Provider>
  );
};
