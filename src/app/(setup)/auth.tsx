import Wrapper from "@/components/wrapper";
import { Text } from "react-native"
import { AuthForm } from "@/components/auth-form";

export default function SetupAuth() {
	return (
	<Wrapper>
		<Text className="text-xl text-center text-foreground">
		  Configured React Hook Form with Valibot validation
		</Text>
		<AuthForm />
	</Wrapper>
	);
}
