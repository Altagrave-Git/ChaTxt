import { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { FONT } from "../../constants";
import styles from "../../styles/auth/auth.styles";
import ToonAPI from "../../api/api";
import validator from "../../utils/validator";
import { useSession, useTheme } from "../../global";
import { PressableOpacity } from "../../components/common/button";
import HeaderButton from "../../components/common/button/headerbtn";

const LoginView = () => {
  const { signIn } = useSession();
  const { theme } = useTheme();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    setMessage(null);
    if (!validator.email(email)) {
      setMessage("Enter valid e-mail address.");
    } else if (!validator.password(password)) {
      setMessage("Password must be 8+ characters with atleast one uppercase, lowercase, numeric and special character.");
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const results = await ToonAPI.post("/users/login/", formData);
      if (results.status == 200) {
        await signIn(results.data);
      } else {
        setMessage(Object.values(results.data)[0]);
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HEADER */}
      <Stack.Screen options={{
        headerStyle: { backgroundColor: theme.primary },
        headerShadowVisible: true,
        headerLeft: () => <Text style={{ fontFamily: FONT.cute, fontSize: 36, color: theme.highlight }}>Login</Text>,
        headerRight: () => <HeaderButton text='Register' onPress={() => router.push('/register/')} theme={theme} />,
        headerTitle: ""
      }} />

      <ScrollView>
        <View style={styles(theme).controlContainer}>
          {/* ERROR MESSAGE */}
          { message != null &&
            <Text style={styles(theme).errorText}>{message}</Text>
          }

          {/* EMAIL INPUT */}
          <View style={styles(theme).controlWrapper}>
            <TextInput
              style={styles(theme).controlInput}
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
              placeholder="E-mail address"
              placeholderTextColor={theme.placeholder}
            />
          </View>

          {/* PASSWORD INPUT */}
          <View style={styles(theme).controlWrapper}>
            <TextInput
              style={styles(theme).controlInput}
              value={password}
              onChangeText={(text) => setPassword(text.trim())}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={theme.placeholder}
            />
          </View>

          {/* SUBMIT */}
          <PressableOpacity
            onPress={handleLogin}
            theme={theme}
            style={styles(theme).controlButton}
          >
            <Text style={styles(theme).controlButtonText}>Login</Text>
          </PressableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginView;