import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <Link
        href="/(auth)/Sing-up"
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        sign up
      </Link>
      <Link
        href="/"
        className="mt-4 rounded bg-primary    p-4 text-xl text-white">
        home
      </Link>
    </View>
  );
};

export default SignIn;
