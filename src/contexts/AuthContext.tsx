import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({children}: AuthContextProviderProps){

  const [user, setUser] = useState<User>();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.');
        }

        setUser(
          {
            id: uid,
            name: displayName,
            avatar: photoURL
          }
        )
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])
  
  const signInWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const authResult = await auth.signInWithPopup(provider);
    
    if(authResult.user){
      const { displayName, photoURL, uid } = authResult.user;

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.');
      }

      setUser(
        {
          id: uid,
          name: displayName,
          avatar: photoURL
        }
      )
    }
  }

  return(
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>{
  return useContext(AuthContext);
}