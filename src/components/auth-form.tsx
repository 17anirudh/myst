import { Text, View, TextInput as TI, Pressable } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { styled } from "nativewind"
import { useTheme } from "@/hooks/ThemeProvider"

const TextInput = styled(TI)

const schema = z.object({
  name: z.string().min(3).max(75),
  email: z.email(),
  password: z.string().min(9).max(99),
})

type Schema = z.infer<typeof schema>

export function AuthForm() {
  const { currentTheme } = useTheme()
  const router = useRouter()
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
  function onSubmit(data: Schema): void {
    console.log(JSON.stringify(data, null, 3))
    router.replace("/(landing)")
  }

  return (
    <View className="border border-foreground will-change-variable p-7">
      <Controller
        control={form.control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            key={2}
            className="text-foreground will-change-variable"
            placeholderTextColor={currentTheme === "dark" ? "white" : "black"}
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {form.formState.errors.name && <Text className="text-red-700">Name is required.</Text>}

      <Controller
        control={form.control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            key={4}
            className="text-foreground will-change-variable"
            placeholderTextColor={currentTheme === "dark" ? "white" : "black"}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {form.formState.errors.email && <Text className="text-red-700">Email is required.</Text>}

      <Controller
        control={form.control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            key={6}
            className="text-foreground placeholder:text-foreground will-change-variable"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {form.formState.errors.password && <Text className="text-red-700">Password is required.</Text>}


      <Pressable onPress={() => form.handleSubmit(onSubmit)} className="bg-primary px-5 py-2 rounded-3xl">
        <Text className="text-lg text-foreground will-change-variable">Submit</Text>
      </Pressable>
    </View>
  )
}
