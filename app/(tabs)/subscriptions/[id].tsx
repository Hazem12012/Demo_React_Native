import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function subscriptionsDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>subscriptions Detail : {id || "- - -"}</Text>
      <Link href="/" className="mt-4 rounded bg-primary p-4 text-xl text-white">
        &lt;- Go Back
      </Link>
    </View>
  );
}
