import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

const ProfileEditScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text>Profile Edit</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;
