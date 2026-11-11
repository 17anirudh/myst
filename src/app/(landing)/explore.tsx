import { styled } from "nativewind";
import { Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function LandingHome() {
	return (
		<SafeAreaView
			edges={["top", "bottom", "left", "right"]}
			className="flex flex-col w-full h-full justify-center items-center p-4 gap-10 will-change-variable"
		>
			<Text className="font-bold text-6xl text-center italic text-foreground">app/(landing)/home</Text>
		</SafeAreaView>
	);
}
