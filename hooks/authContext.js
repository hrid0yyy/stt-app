import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseConfig"; // Make sure to configure and export your Supabase client
import { useRouter } from "expo-router";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [inPreference, setInPreference] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setSession(session);
          setIsAuthenticated(true);
          await updateUserData(session.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => subscription;
  }, []);

  async function updateUserDetails(fullName, mobileNumber, loc, profileUrl) {
    console.log(fullName, mobileNumber, loc, profileUrl);
    try {
      // Update the user details in the database
      const { data, error } = await supabase
        .from("users") // Specify the table name
        .update({
          full_name: fullName,
          mobile_number: mobileNumber,
          profile_url: profileUrl,
          location: loc,
        })
        .eq("id", user?.id); // Match the user by ID

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Error updating user details:", error.message);
      return { success: false, error: error.message };
    }
  }

  const updateUserData = async (user) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      if (data) {
        setUser({
          last_sign_in: user.last_sign_in_at,
          email: user.email,
          username: data.username,
          id: data.id,
          createdAt: user.created_at,
          fullName: data.full_name,
          number: data.mobile_number,
          preferredGenre: data.preferred_genre,
          location: data.location,
          profileUrl: data.profile_url,
        });
      }
      console.log(user);
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

      if (error) throw error;

      // After signup, store additional user info in the 'users' table
      const { error: dbError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          username,
        },
      ]);

      if (dbError) throw dbError;

      setUser({ id: data.user.id, username: username });

      setIsAuthenticated(true);
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
        updateUserDetails,
        updateUserData,
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
