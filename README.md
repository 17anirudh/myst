# Myst

![Photo](./assets\images\512.png)

Bootstrapped Expo 58 SDK created with Nativewind v5

## Get started

1. Install dependencies

```bash
npm install
```

2. Start the app

```bash
npx expo start
```

## 3rd party support

1. Static Widgets

```tsx
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);
...
```

2. Dynamic Widgets

```tsx
import { TabletIcon, MonitorIcon, type LucideProps } from "lucide-react-native";

const iconMap: Record<Device.DeviceType, Styled<LucideProps>> = {
  [Device.DeviceType.TABLET]: styled(TabletIcon),
  [Device.DeviceType.DESKTOP]: styled(MonitorIcon),
};
```
