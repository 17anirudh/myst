# Myst

![Photo](./assets/images/logo/512.png)

Opinionated bootstrap of Expo 58 SDK created with Nativewind v5

## Dependencies

1. **Nativewind**: Used v5 RC dependency which mimics tailwind v4 in web (use excat version pinning when deploying)
2. **Zod**: Tree Shaking aware and lightweight runtime validation
3. **React-hook-form**: Prod ready form with built in form states and validation layer
4. **Biome**: Configured with Biome compared to less setup than prettier and eslint

## NativeWind Deployment

This project currently uses an RC version of NativeWind, so a pre-deployment check is recommended before deploying to EAS.

Give the following prompt to any coding agent:

```txt
This project is going to be deployed to EAS. For now, ignore the code conventions, logical errors, and EAS configuration. Run `npx skills use "https://github.com/nativewind/nativewind" --skill "nativewind-preview-to-rc"` and follow the generated skill instructions. Compare the guide from the skill with the project's NativeWind setup. Give a comprehensive and honest audit, stating whether the project's conventions are followed and identifying any deviations or potential deployment issues.
```

## Code style

```tsx
import * as Device from "expo-device";
import { TabletIcon, MonitorIcon, type LucideProps } from "lucide-react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

// Keep 3rd-party wrappers at module level for className transformation.
// Yes, it's boilerplate (sucks when compared to web). No, it won't hamper performance.
const SafeAreaView = styled(RNSafeAreaView);
const iconMap: Record<Device.DeviceType, Styled<LucideProps>> = {
  [Device.DeviceType.TABLET]: styled(TabletIcon),
  [Device.DeviceType.DESKTOP]: styled(MonitorIcon),
};
```
