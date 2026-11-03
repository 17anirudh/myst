import * as Device from "expo-device";
import { styled } from "nativewind";
import { Pressable, Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import {
	TabletIcon,
	MonitorIcon,
	TvIcon,
	SunIcon as SI,
	MoonIcon as MI,
	type LucideProps,
} from "lucide-react-native";
import { useTheme } from "@/hooks/ThemeProvider";
import { Link } from "expo-router";

const SafeAreaView = styled(RNSafeAreaView);
const SunIcon = styled(SI);
const MoonIcon = styled(MI);

const iconMap: Record<Device.DeviceType, Styled<LucideProps>> = {
	[Device.DeviceType.UNKNOWN]: styled(TabletIcon),
	[Device.DeviceType.PHONE]: styled(TabletIcon),
	[Device.DeviceType.TABLET]: styled(TabletIcon),
	[Device.DeviceType.DESKTOP]: styled(MonitorIcon),
	[Device.DeviceType.TV]: styled(TvIcon),
};

export default function HomeScreen() {
	const { currentTheme: pref, toggleTheme } = useTheme();
	const Icon: Styled<LucideProps> =
		iconMap[Device.deviceType ?? Device.DeviceType.UNKNOWN];
	const item: string = `${Device.brand} ${Device.platformApiLevel}`;
	return (
		<SafeAreaView
			edges={["top", "bottom", "left", "right"]}
			className="flex flex-col w-full h-full justify-center items-center p-4 gap-10 will-change-variable"
		>
			<Icon className="text-foreground" size={120} />
			<Text className="font-bold text-4xl text-center italic will-change-variable text-foreground">
				User is using {item}
			</Text>
			<Text className="text-2xl text-center will-change-variable text-foreground">
				User prefers {pref} theme
			</Text>
			<Pressable
        onPress={toggleTheme}
        className="p-3 rounded-full active:opacity-70"
      >
        {pref === "dark" ? (
          <SunIcon size={24} className="text-foreground" />
        ) : (
          <MoonIcon size={24} className="text-foreground" />
        )}
      </Pressable>
			<Link
				href="/(landing)"
				className="border border-foreground rounded-full p-6"
			>
				<Text className="text-xl text-center will-change-variable text-foreground p-2 uppercase">
					Landing
				</Text>
			</Link>
			{/*<ThemeToggler />*/}
		</SafeAreaView>
	);
}
