import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect
 } from "react";

 const AuthContext= createContext();

 export function useAuth(){
    return useContext(AuthContext);
 }
 export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsubscribe;


    })
        const logout = ()=>signOut(auth);
        const value = {user, logout};
        return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        )
 }