import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Animated, Appearance, StyleSheet } from "react-native";

interface ThemeContextType {
	currentTheme: Appearance.ColorSchemeName;
	toggleTheme: () => void;
	setTheme: (theme: Appearance.ColorSchemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [curr, setCurr] = useState<Appearance.ColorSchemeName>(
		Appearance.getColorScheme() ?? "dark",
	);
	const overlayOpacity = useRef(new Animated.Value(0)).current;
	const [overlayColor, setOverlayColor] = useState<string>("transparent");
	const isTransitioning = useRef(false);

	useEffect(() => {
		const sub = Appearance.addChangeListener(({ colorScheme }) => {
			setCurr(colorScheme === "dark" ? "dark" : "light");
		});
		return () => sub.remove();
	}, []);

	const toggleTheme = useCallback(() => {
		if (isTransitioning.current) return;
		isTransitioning.current = true;

		const activeScheme = Appearance.getColorScheme();
		const isCurrentlyDark = activeScheme === "dark";
		const nextTheme: NonNullable<Appearance.ColorSchemeName> = isCurrentlyDark
			? "light"
			: "dark";
		const targetBg = isCurrentlyDark ? "#e3f2fd" : "#092328";
		setOverlayColor(targetBg);

		// 1. Smoothly fade the target color in
		Animated.timing(overlayOpacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start(() => {
			// 2. Commit the actual theme swap under the hood
			Appearance.setColorScheme(nextTheme);
			setCurr(nextTheme);

			// 3. Fade out the overlay cleanly
			Animated.timing(overlayOpacity, {
				toValue: 0,
				duration: 350,
				useNativeDriver: true,
			}).start(() => {
				isTransitioning.current = false;
			});
		});
	}, [overlayOpacity]);

	const setTheme = useCallback((theme: Appearance.ColorSchemeName) => {
		Appearance.setColorScheme(theme);
		setCurr(theme);
	}, []);

	const value = useMemo(
		() => ({
			currentTheme: curr,
			toggleTheme,
			setTheme,
		}),
		[curr, toggleTheme, setTheme],
	);

	return (
		<ThemeContext.Provider value={value}>
			{children}
			<Animated.View
				pointerEvents="none"
				style={[
					StyleSheet.absoluteFill,
					{
						backgroundColor: overlayColor,
						opacity: overlayOpacity,
						zIndex: 99999,
					},
				]}
			/>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a <ThemeProvider>");
	}
	return context;
}
