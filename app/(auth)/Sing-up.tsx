import { Link } from "expo-router";
import { Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
      <Link
        href="/(auth)/Sing-in"
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        Sign in
      </Link>
    </View>
  );
};

export default SignUp;
