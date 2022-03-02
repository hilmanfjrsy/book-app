import React, { createContext, Component, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ContextProvider = createContext()

export default function BaseContext({ children }) {
    const location = useLocation()
    const [myBook, setMyBook] = useState([])
    const [category, setCategory] = useState([])
    
    useEffect(() => {
        let book = JSON.parse(localStorage.getItem('myBook')) || []
        setMyBook(book)
    }, [location])

    return (
        <ContextProvider.Provider
            value={{
                myBook,
                category,
                setMyBook,
                setCategory
            }}
        >
            {children}
        </ContextProvider.Provider>
    )

}