import images from "@/constants/images";
import "@/global.css";
import dayjs from "dayjs";
import { useUser, useClerk } from "@clerk/expo";

import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Image, Text, View, Pressable } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import ListHeading from "../components/ListHeading";
import SubscriptionCard from "../components/SubscriptionCard";
import UpcomingSubscriptionCard from "../components/UpcomingSubscriptionCard";

const SafeAreaView = styled(RNSafeAreaView);

//  in routs the index file is home page ):
export default function App() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [expandedSubscriptiionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);

  return (
    <SafeAreaView className="flex-1  bg-background p-5 ">
      {/* Subscriptions list of cards */}
      <FlatList
        contentContainerClassName="pb-25"
        ListHeaderComponent={() => (
          <>
            {/* Heading bar */}
            <View className="home-header">
              <View className="home-user">
                <Image
                  source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                  className="home-avatar"
                />
                <View className="justify-center">
                  <Text className="home-user-name">
                    {user?.fullName || user?.primaryEmailAddress?.emailAddress || "User"}
                  </Text>
                  <Pressable onPress={() => signOut()} className="ml-4 mt-1">
                    <Text className="text-sm font-sans-semibold text-accent">Sign Out</Text>
                  </Pressable>
                </View>
              </View>
              <Image source={icons.add} className="home-add-icon" />
            </View>

            {/* Balance Card */}
            <View className="home-balance-card">
              <Text className="home-balance-label">Balance</Text>
              <View className="home-balance-row">
                <Text className="home-balance-amount">
                  {formatCurrency(HOME_BALANCE.amount)}
                </Text>
                <Text className="home-balance-date">
                  {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                </Text>
              </View>
            </View>

            {/* upcoming list of cards */}
            <View>
              <ListHeading title="Upcoming" />

              <FlatList
                data={UPCOMING_SUBSCRIPTIONS}
                renderItem={({ item }) => (
                  <UpcomingSubscriptionCard {...item} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                  <Text className="home-empty-state">
                    No upcoming renewals yet.
                  </Text>
                }
              />
            </View>

            <ListHeading title="All Subscriptions" />
          </>
        )}
        keyExtractor={(item) => item.id}
        data={HOME_SUBSCRIPTIONS}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-5" />}
        ListEmptyComponent={
          <Text className="home-empty-state">No Subscriptions yet.</Text>
        }
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptiionId === item.id}
            onPress={() =>
              setExpandedSubscriptionId((prev) =>
                prev === item.id ? null : item.id,
              )
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
