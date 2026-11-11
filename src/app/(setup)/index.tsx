import Wrapper from "@/components/wrapper";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function SetupHome() {
	return (
		<Wrapper>
			<Text className="text-5xl text-center text-foreground">
			  Welcome to myst, this is a starter Expo SDK 58 configured with NativeWind v5
			</Text>
			<Link
  			href="/(setup)/auth"
  			push
  			className="px-5 border border-foreground py-2 will-change-variable"
      >
       	<Text className="will-change-variable text-foreground p-2 uppercase">
      		Login
       	</Text>
      </Link>
		</Wrapper>
	);
}
