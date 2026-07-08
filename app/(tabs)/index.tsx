import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
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
        href="/Subscriptions"
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        subscriptions
      </Link>

      <Link
        href={{ pathname: "/subscriptions/[id]", params: { id: "calude" } }}
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        subscriptions MEX
      </Link>
    </View>
  );
}
