import { useSignIn } from "@clerk/expo";
import { Link, useRouter, type Href } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loading = fetchStatus === "fetching";

  const handleSubmit = async () => {
    setErrorMsg("");

    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      setErrorMsg(error.message || "Invalid email or password.");
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          router.replace(url as Href);
        },
      });
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
      setErrorMsg("Sign-in attempt not complete. Status: " + signIn.status);
    }
  };

  const handleVerify = async () => {
    setErrorMsg("");
    const { error } = await signIn.mfa.verifyEmailCode({ code });

    if (error) {
      setErrorMsg(error.message || "Invalid verification code.");
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          router.replace(url as Href);
        },
      });
    } else {
      console.error("Sign-in attempt not complete:", signIn);
      setErrorMsg("Verification succeeded but sign in is not complete.");
    }
  };

  return (
    <SafeAreaView
      className="auth-safe-area"
      style={{ width: "100%", height: "100%" }}>
      <ScrollView
        className="auth-scroll"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="auth-content justify-center">
          <View className="auth-brand-block">
            <View className="auth-logo-wrap">
              <View className="auth-logo-mark">
                <Text className="auth-logo-mark-text">$</Text>
              </View>
              <View>
                <Text className="auth-wordmark">Subby</Text>
                <Text className="auth-wordmark-sub">Manage Smarter</Text>
              </View>
            </View>
            <Text className="auth-title">
              {signIn.status === "needs_client_trust"
                ? "Verify account"
                : "Welcome back"}
            </Text>
            <Text className="auth-subtitle">
              {signIn.status === "needs_client_trust"
                ? "Enter your verification code"
                : "Sign in to your account to manage your subscriptions"}
            </Text>
          </View>

          <View className="auth-card">
            {errorMsg ? (
              <View className="p-3 mb-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <Text className="text-destructive text-sm font-sans-medium text-center">
                  {errorMsg}
                </Text>
              </View>
            ) : null}

            {signIn.status === "needs_client_trust" ? (
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Verification Code</Text>
                  <TextInput
                    className="auth-input"
                    value={code}
                    placeholder="Enter code"
                    placeholderTextColor="#888"
                    onChangeText={setCode}
                    keyboardType="number-pad"
                  />
                </View>

                <Pressable
                  className={`auth-button ${!code || loading ? "auth-button-disabled" : ""}`}
                  disabled={!code || loading}
                  onPress={handleVerify}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="auth-button-text">Verify</Text>
                  )}
                </Pressable>

                <Pressable
                  className="auth-secondary-button"
                  onPress={async () => {
                    setErrorMsg("");
                    await signIn.mfa.sendEmailCode();
                    setErrorMsg("Code resent!");
                  }}>
                  <Text className="auth-secondary-button-text">
                    Resend Code
                  </Text>
                </Pressable>

                <Pressable
                  className="auth-secondary-button"
                  onPress={() => {
                    signIn.reset();
                    setErrorMsg("");
                  }}>
                  <Text className="auth-secondary-button-text">Start Over</Text>
                </Pressable>
              </View>
            ) : (
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Email address</Text>
                  <TextInput
                    className="auth-input"
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter your email"
                    placeholderTextColor="#888"
                    onChangeText={setEmailAddress}
                    keyboardType="email-address"
                  />
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Password</Text>
                  <TextInput
                    className="auth-input"
                    value={password}
                    placeholder="Enter your password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    onChangeText={setPassword}
                  />
                </View>

                <Pressable
                  className={`auth-button ${!emailAddress || !password || loading ? "auth-button-disabled" : ""}`}
                  disabled={!emailAddress || !password || loading}
                  onPress={handleSubmit}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="auth-button-text">Sign In</Text>
                  )}
                </Pressable>
              </View>
            )}

            {signIn.status !== "needs_client_trust" && (
              <View className="auth-link-row">
                <Text className="auth-link-copy">Don't have an account?</Text>
                <Link href="/(auth)/Sing-up" asChild>
                  <Pressable>
                    <Text className="auth-link">Sign Up</Text>
                  </Pressable>
                </Link>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
