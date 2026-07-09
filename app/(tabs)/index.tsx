import "@/global.css";
import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

//  in routs the index file is home page
export default function App() {
  return (
    <SafeAreaView className="flex-1  bg-background p-5">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
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

      <Link
        href="/subscriptions"
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        subscriptions
      </Link>

      <Link
        href={{ pathname: "/subscriptions/[id]", params: { id: "calude" } }}
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        subscriptions MEX
      </Link>
    </SafeAreaView>
  );
}
