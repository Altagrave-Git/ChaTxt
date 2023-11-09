import { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView, Pressable } from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, SIZES, FONT, icons } from "../../constants";
import styles from "../../styles/auth";

const LoginView = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.gray1
    }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.warning },
        headerShadowVisible: true,
        headerLeft: () => (
          <Text style={{ fontFamily: FONT.cute, fontSize: 40, color: COLORS.orange }}>Login</Text>
        ),
        headerTitle: ""
      }} />

      <View style={styles.controlContainer}>
        <View style={styles.controlWrapper}>
          <TextInput
            style={styles.controlInput}
            value={email}
            onChange={(e) => setEmail(e.value)}
            placeholder="E-mail address"
            placeholderTextColor={COLORS.placeholder}
          />
        </View>
        <View style={styles.controlWrapper}>
          <TextInput
            style={styles.controlInput}
            value={password}
            onChange={(e) => setPassword(e.value)}
            placeholder="Password"
            passwordRules="required: upper; required: lower; required: digit; minlength: 8"
            secureTextEntry={true}
            placeholderTextColor={COLORS.placeholder}
          />
        </View>
        <Pressable 
          style={styles.controlButton}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default LoginView;