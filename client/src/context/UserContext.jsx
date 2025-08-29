import React ,{ createContext }from 'react'


export const userDataContext = createContext()

const UserContext = ({ children }) => {


    const serverUrl = import.meta.env.VITE_SERVER_URL

    const value = {
        serverUrl
    }

    return (
        <div>
            <userDataContext.Provider value={value} >
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext