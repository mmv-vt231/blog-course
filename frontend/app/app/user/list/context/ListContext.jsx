import { createContext, useContext } from 'react';

const ListContext = createContext({});

export const ListProvider = ({ value, children }) => {
    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    );
};

export const useList = () => useContext(ListContext);