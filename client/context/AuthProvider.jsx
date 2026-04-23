// src/context/AuthProvider.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { auth, db } from "../src/firebase/firebase";
import { AiOutlineLoading } from "react-icons/ai";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUser(currentUser);
            setRole(docSnap.data().role);
            setFirstName(docSnap.data().firstName);
          } else {
            setUser(currentUser);
            setRole(null);
          }
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);

        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, firstName }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <AiOutlineLoading className="w-8 h-8 animate-spin text-[#348293]" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
