import { useSignUp } from "@clerk/expo";
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

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loading = fetchStatus === "fetching";

  // Handle registration submission
  const handleSignUp = async () => {
    setErrorMsg("");

    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      setErrorMsg(error.message || "Invalid registration details.");
      return;
    }

    const verificationResult = await signUp.verifications.sendEmailCode();
    if (verificationResult.error) {
      setErrorMsg(
        verificationResult.error.message ||
          "Failed to send verification email.",
      );
    }
  };

  // Handle email verification code submission
  const handleVerify = async () => {
    setErrorMsg("");

    const { error } = await signUp.verifications.verifyEmailCode({
      code,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      setErrorMsg(error.message || "Invalid or incorrect code.");
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
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
      console.error("Sign-up attempt not complete:", signUp);
      setErrorMsg("Verification succeeded but sign up is not complete.");
    }
  };

  const isVerifying =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

  return (
    <SafeAreaView
      className="auth-safe-area"
      style={{ width: "100%", height: "100%" }}>
      <ScrollView
        className="auth-scroll"
        contentContainerStyle={{ flexGrow: 1 }}>
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
              {isVerifying ? "Verify account" : "Get started"}
            </Text>
            <Text className="auth-subtitle">
              {isVerifying
                ? "Enter the verification code sent to your email"
                : "Create an account to manage all your subscriptions"}
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

            {isVerifying ? (
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
                    <Text className="auth-button-text">Verify Email</Text>
                  )}
                </Pressable>

                <Pressable
                  className="auth-secondary-button"
                  onPress={async () => {
                    setErrorMsg("");
                    const { error } =
                      await signUp.verifications.sendEmailCode();
                    if (error) {
                      setErrorMsg(error.message || "Failed to resend code.");
                    } else {
                      setErrorMsg("Verification code resent!");
                    }
                  }}>
                  <Text className="auth-secondary-button-text">
                    Resend Code
                  </Text>
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
                    placeholder="Create a password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    onChangeText={setPassword}
                  />
                </View>

                <Pressable
                  className={`auth-button ${!emailAddress || !password || loading ? "auth-button-disabled" : ""}`}
                  disabled={!emailAddress || !password || loading}
                  onPress={handleSignUp}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="auth-button-text">Sign Up</Text>
                  )}
                </Pressable>
              </View>
            )}

            {!isVerifying && (
              <View className="auth-link-row">
                <Text className="auth-link-copy">Already have an account?</Text>
                <Link href="/(auth)/Sing-in" asChild>
                  <Pressable>
                    <Text className="auth-link">Sign In</Text>
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
