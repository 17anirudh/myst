import { SafeAreaView as SFA, type SafeAreaViewProps } from "react-native-safe-area-context";
import { styled } from "nativewind";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import type { ReactNode } from "react";
import { cn } from "cn";

const SafeAreaView = styled(SFA);

interface Props extends SafeAreaViewProps {
  children: ReactNode;
  keyboard?: boolean;
  scroll?: boolean;
}

export default function Wrapper({
  children,
  keyboard = false,
  scroll = false,
  className,
  ...props
}: Props) {
  const content = scroll ? (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView
      {...props}
      edges={["top", "bottom", "left", "right"]}
      className={cn(
          "flex-1 flex bg-background flex-col justify-center items-center p-4 gap-10 will-change-variable",
          className
        )}
    >
      {keyboard ? (
        <KeyboardAvoidingView
          className="flex-1 w-full"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
