import * as Device from "expo-device";
import { styled } from "nativewind";
import { Pressable, Text } from "react-native";
import {
	SunIcon as SI,
	MoonIcon as OI,
} from "lucide-react-native";
import { useTheme } from "@/hooks/ThemeProvider";
import { Link } from "expo-router";
import { Image as IM } from "expo-image";
import { useEffect } from "react";
import Wrapper from "@/components/wrapper";

const SunIcon = styled(SI);
const MoonIcon = styled(OI);
const Image = styled(IM)
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function HomeScreen() {
	const { toggleTheme, currentTheme } = useTheme();
	const item: string = `${Device.brand} ${Device.platformApiLevel}`;
	useEffect(() => {
  	console.log("Mounted");
	})
	return (
		<Wrapper>
		  <Image
        source={require('@assets/images/logo/512.png')}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        className="flex-1 w-90"
      />
			<Text className="font-bold text-4xl text-center italic will-change-variable text-foreground">
				Hello {item}
			</Text>
			<Text className="text-2xl text-center will-change-variable text-foreground">
				User prefers {currentTheme} theme
			</Text>
			<Pressable
        onPress={toggleTheme}
        className="p-3 rounded-full active:opacity-70"
      >
        {currentTheme === "dark" ? (
          <SunIcon size={24} className="text-foreground will-change-variable" />
        ) : (
          <MoonIcon size={24} className="text-foreground will-change-variable" />
        )}
      </Pressable>
      <Link
       	href="/(setup)"
       	className="px-5 border border-foreground py-2 will-change-variable"
      >
       	<Text className="will-change-variable text-foreground p-2 uppercase">
      		Setup
       	</Text>
      </Link>
		</Wrapper>
	);
}
