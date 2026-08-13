import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const register = async (email, password) => {
    const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    return result.user;
};

export const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return result.user;
};

export const logout = async () => {
    await signOut(auth);
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const getIdToken = async () => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User is not authenticated.");
    }

    return await user.getIdToken();
};

export const getMe = async () => {
    const token = await getIdToken();

    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Unable to fetch user profile.");
    }

    return await response.json();
};