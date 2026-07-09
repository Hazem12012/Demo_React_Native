import { formatCurrency, formatStatusLabel } from "@/lib/utils";
import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const SubscriptionCard = ({
  icon,
  name,
  price,
  billing,
  color,
  plan,
  category,
  paymentMethod,
  startDate,
  status,
  currency,
  renewalDate,
  expanded,
  onPress,
}: SubscriptionCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx("sub-card", expanded ? "sub-card-expanded" : " bg-card")}
      style={!expanded && color ? { backgroundColor: color } : {}}>
      <View className="sub-head">
        <View className="sub-main">
          <Image source={icon} className="sub-icon" />
          <View className="sub-copy">
            <Text numberOfLines={1} className="suv-title">
              {name}
            </Text>
            <Text numberOfLines={1} className="sub-meta">
              {category?.trim() || plan?.trim() || "- - -"}
            </Text>
          </View>
          <View className="sub-price-box">
            <Text className="sub-price">{formatCurrency(price)}</Text>
            <Text className="sub-billing">{billing}</Text>
          </View>
        </View>
      </View>

      {/* subscription details */}
      {expanded && (
        <View className="sub-bdy">
          <View className="sub-details">
            {/*  category detail row */}

            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Category:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {category?.trim() || plan?.trim() || "- - -"}
                </Text>
              </View>
            </View>

            {/*  payment detail row */}
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Payment:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {paymentMethod?.trim() || "- - -"}
                </Text>
              </View>
            </View>

            {/* start  date detail row */}
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Started:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {dayjs(startDate).format("MM/DD/YYYY") || "- - -"}
                </Text>
              </View>
            </View>

            {/*  renewal date row */}
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Renewal date:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {dayjs(renewalDate).format("MM/DD/YYYY") || "- - -"}
                </Text>
              </View>
            </View>

            {/*  status row */}
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Status:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {status ? formatStatusLabel(status) : "- - -"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionCard;
