import { NativeTabs } from 'expo-router/native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs minimizeBehavior='onScrollDown'>
      <NativeTabs.Trigger name="index" role='featured'>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md={{ default: 'home', selected: 'home_filled' }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore" role='bookmarks'>
        <NativeTabs.Trigger.Icon
          sf='compass.drawing'
          md='mobile_wrench'
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
