import "@/global.css";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

//  in routs the index file is home page
export default function App() {
  return (
    <SafeAreaView className="flex-1  bg-background p-5">
      <Text className="text-5xl font-sans-bold">Home</Text>

      <Link
        href="/onbording"
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        go to onbording
      </Link>
      {/*  */}
      <Link
        href="/(auth)/Sing-in"
        className="mt-4 rounded bg-primary  p-4 text-xl text-white">
        go to sign in
      </Link>
      <Link
        href="/(auth)/Sing-up"
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        go to sign up
      </Link>
    </SafeAreaView>
  );
}
