import { Slot, useSegments, useRouter } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../hooks/authContext";
import { useEffect, useLayoutEffect } from "react";

const MainLayout = () => {
  const { isAuthenticated, inPreference } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useLayoutEffect(() => {
    //router.replace("/screens/userPreference"); // for designing any page
  });

  useEffect(() => {
    if (inPreference) {
      router.replace("/screens/userDetails");
    }
    //check if user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;

    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      //redirect to home
      router.replace("/(app)/home");
    } else if (!isAuthenticated) {
      //redirect to sign in
      router.replace("/");
    }
  }, [isAuthenticated, inPreference]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
