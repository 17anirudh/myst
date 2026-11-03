import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/hooks/ThemeProvider";

SplashScreen.preventAutoHideAsync();

export default function InitialLayout() {
	const [loaded, error] = useFonts({
		"Open-Sans": require("@assets/font/OpenSans-VariableFont.ttf"),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}
	return (
		<ThemeProvider>
			<SafeAreaProvider>
				<View className="flex-1 bg-background text-foreground font-display">
					<StatusBar style="auto" animated />
					<Stack
						screenOptions={{
							headerShown: false,
							contentStyle: { backgroundColor: "transparent" },
						}}
					/>
				</View>
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
