# Myst

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npm run lint                # lint with Biome (biome check src)
npm run format              # format with Biome (biome format --write src)
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## NativeWind v5 RC & Tailwind v4 Architecture

The app uses **NativeWind `5.0.0-rc.1`** and **`react-native-css` `3.1.0-rc.1`** with **Tailwind CSS `4.x`**.

Refer to the **`design`** skill (`.agents/skills/design/SKILL.md`) when creating or modifying UI components and screens.

### Key Engine & Styling Contracts

1. **Dynamic CSS Variables in `src/global.css`**:
   - Variables that vary across light/dark modes must be declared in `:root` and `@media (prefers-color-scheme: dark)` **without** the `--color-` prefix (e.g., `--foreground`, `--background`, `--tint`, `--primary`).
   - Map them to Tailwind tokens inside `@theme { --color-foreground: var(--foreground); }`.
   - **Never self-reference variables** (e.g., `--color-foreground: var(--color-foreground)`), as this causes circular resolution loops in the native runtime.
2. **Dynamic Variable Exclusion in `metro.config.js`**:
   - Dynamic theme variables must be included in `inlineVariables.exclude` so Metro does not statically inline them at build time.
   - Keep `warnings: "none"` configured to silence non-actionable dropped web property logs.
3. **Text Colors Do NOT Cascade in React Native**:
   - React Native's `<Text>` component **never inherits text color** from parent `<View>` containers.
   - Always specify explicit typography classes (e.g. `text-foreground`, `text-primary`) directly on `<Text>` elements.
4. **Third-Party Component Styling**:
   - `globalClassNamePolyfill` only covers React Native primitives (`View`, `Text`, `Pressable`, `TextInput`, `ScrollView`, `Image`).
   - Third-party components (such as `SafeAreaView` from `react-native-safe-area-context`) must be wrapped with `styled(Component)` from `nativewind`.
5. **Theme Switching**:
   - Native dark mode is tied to React Native's `Appearance` API.
   - Use `Appearance.setColorScheme('dark' | 'light')` for overrides and `'unspecified'` to restore device default.
   - Never use `:root.dark` or `:root[class~="dark"]` in CSS; the native compiler rejects qualified root selectors.
6. **Transparent Navigators**:
   - Set `contentStyle: { backgroundColor: 'transparent' }` in `Stack` screen options so the root container's `bg-background` renders through.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Native & Build Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules and reads top-level `"splash"` from `app.json`. After adding a library with native code or config plugins, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
