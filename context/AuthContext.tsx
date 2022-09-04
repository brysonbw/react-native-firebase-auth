import React, { createContext, useContext, useState, useEffect } from "react"
import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { User } from "../types/user"
import { toastErrorMessage, toastMessage } from "../utils/toastMessage"
import { auth } from "../config/firebase"



type Props = {
  children: React.ReactNode
}

type Context = {
  currentUser: {
    isLoggedIn: boolean
    user: User | null
  } | null
  setCurrentUser: React.Dispatch<any> 
  logout: () => void
  loading: boolean
} | null


const AuthContext = createContext<Context | null>(null)

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<any>({
    user: null,
    isLoggedIn: false
  })
  const[loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
       user ? setCurrentUser({user:user, isLoggedIn: true}) :  setCurrentUser({user: null, isLoggedIn: false})
       setLoading(false)
        })
        return () => unsubscribe()
      }, [])

  useEffect(() => {
  }, [currentUser])

  function logout() {
    signOut(auth).then(() => {
      setCurrentUser({
        user: null,
        isLoggedIn: false
      })
     toastMessage(`You've logged out.`)
    }).catch((error) => {
      console.log(error)
     toastErrorMessage(error)
    });
  }



  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext)
    throw new Error("AuthContext must be called from within the ContextProvider")

  return authContext
}