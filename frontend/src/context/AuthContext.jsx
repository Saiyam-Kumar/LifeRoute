import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import { getMe } from "../services/authService";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async (firebaseUser) => {

                console.log(
                    "Firebase auth state:",
                    firebaseUser
                        ? firebaseUser.email
                        : "No user"
                );


                setUser(firebaseUser);


                if (!firebaseUser) {

                    setProfile(null);
                    setLoading(false);

                    return;
                }


                try {

                    /*
                     * Wait until Firebase has a valid ID token.
                     */
                    await firebaseUser.getIdToken(true);


                    /*
                     * Ask our FastAPI backend who this
                     * authenticated user belongs to.
                     */
                    const me = await getMe();


                    console.log(
                        "Backend profile loaded:",
                        me
                    );


                    setProfile(me);

                } catch (error) {

                    console.error(
                        "Failed to load authenticated profile:",
                        error
                    );


                    setProfile(null);

                } finally {

                    setLoading(false);

                }
            }
        );


        return unsubscribe;

    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}


export default AuthContext;