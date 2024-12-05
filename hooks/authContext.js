import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseConfig"; // Make sure to configure and export your Supabase client
import { useRouter } from "expo-router";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [inPreference, setInPreference] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setUser(session.user);
          await updateUserData(session.user.id);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  const updateUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      if (data) {
        setUser({
          ...user,
          username: data.username,
          createdAt: data.created_at,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Login successful:", data);
      if (error) throw error;
      return { success: true };
    } catch (e) {
      console.error("Login failed:", e.message);
      return { success: false, msg: e.message };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log(data);

      if (error) throw error;

      // After signup, store additional user info in the 'users' table
      const { error: dbError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          username,
          created_at: new Date(),
        },
      ]);

      if (dbError) throw dbError;

      setInPreference(true);
      return { success: true, data: data.user };
    } catch (e) {
      return { success: false, msg: e.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        inPreference,
        setInPreference,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
