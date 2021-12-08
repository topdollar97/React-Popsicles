import React, { useState } from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

const GoogleAuthContext = React.createContext()

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: "500671644474-7jlufpju8ll3phlit7n893f3ek95j23c.apps.googleusercontent.com"
  })
  const [user, setUser] = useState('');

  return (
    <GoogleAuthContext.Provider value={{googleAuth, user, setUser}}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)