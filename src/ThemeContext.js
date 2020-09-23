import React, {useState} from 'react'

const ThemeContext = React.createContext()

export function ThemeProvider({ children}) {
return(
    <ThemeContext.Provider>
        {children}
    </ThemeContext.Provider>
)
}