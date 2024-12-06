export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    "open-sans-semibold": require("../assets/fonts/open-sans/OpenSans-SemiBold.ttf"),
    "open-sans-bold": require("../assets/fonts/open-sans/OpenSans-Bold.ttf"),
  });

  return fontsLoaded;
};
