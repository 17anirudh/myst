import * as Device from "expo-device";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function LandingHome() {
	return (
		<SafeAreaView
			edges={["top", "bottom", "left", "right"]}
			className="flex-1 flex flex-col w-full h-full justify-center items-center p-4 border border-foreground"
		>
			<Text className="font-bold text-6xl text-center italic text-foreground">{`${Device.osName} ${Device.osVersion}`}</Text>
		</SafeAreaView>
	);
}
