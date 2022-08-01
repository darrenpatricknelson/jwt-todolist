// imports 
// we will be using createContext for global props as well as useReducer to update the state reactively  
import { createContext, useReducer } from 'react';

// create our context
export const UserContext = createContext();

// create my reducer function
export const userReducer = (state, action) => {
    // Create the switch case functionality
    switch (action.type) {
        case 'GET_USER':
            return {
                user: action.payload
            };
        case 'CREATE_USER':
            return {
                user: action.payload
            };
        case 'UPDATE_USER_CREATE_TASK':
            return {
                user: action.payload
            };
        case 'UPDATE_USER_DELETE_TASK':
            return {
                user: action.payload
            };

        default:
            return state;
    }
};

export const UserContextProvider = ({ children }) => {
    // create the reducer hook
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    });


    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
