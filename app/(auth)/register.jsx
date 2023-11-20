import { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { FONT } from "../../constants";
import styles from "../../styles/auth/auth.styles";
import ToonAPI from "../../api/api";
import validator from "../../utils/validator";
import { useSession } from "../../global/session";
import { useTheme } from "../../global/theme";
import { PressableOpacity } from "../../components/common";

const RegisterView = () => {
  const { signIn } = useSession();
  const { theme } = useTheme();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    setMessage(null);
    if (!validator.email(email)) {
      setMessage("Enter valid e-mail address.");
    } else if (!validator.password(password)) {
      setMessage("Password must be 8+ characters with atleast one uppercase, lowercase, numeric and special character.");
    } else if (password != password2) {
      setMessage("Passwords do not match.")
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", password2)

      const results = await ToonAPI.post("/users/register/", formData);
      if (results.status == 200) {
        signIn(results.data);
      } else {
        setMessage(Object.values(results.data)[0]);
      }
    }
    return;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {/* HEADER */}
      <Stack.Screen options={{
        headerStyle: { backgroundColor: theme.primary },
        headerShadowVisible: true,
        headerLeft: () => (
          <PressableOpacity onPress={() => router.push("/login/")}>
            <Text style={{
              fontFamily: FONT.cute,
              fontSize: 36,
              color: theme.secondary,
            }}>Login</Text>
          </PressableOpacity>
        ),
        headerRight: () => (
          <Text style={{
            fontFamily: FONT.cute,
            fontSize: 36,
            color: theme.highlight,
          }}>Register</Text>
        ),
        headerTitle: "",
      }} />

      <ScrollView>
        <View style={styles(theme).controlContainer}>
          {/* ERROR MESSAGE */}
          {message != null && (
            <Text
              style={styles(theme).errorText}
            >{message}</Text>
          )}

          {/* EMAIL */}
          <View style={styles(theme).controlWrapper}>
            <TextInput
              style={styles(theme).controlInput}
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
              placeholder="E-mail address"
              placeholderTextColor={theme.placeholder}
            />
          </View>

          {/* PASSWORD 1 */}
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

          {/* PASSWORD 2 */}
          <View style={styles(theme).controlWrapper}>
            <TextInput
              style={styles(theme).controlInput}
              value={password2}
              onChangeText={(text) => setPassword2(text.trim())}
              placeholder="Re-enter password"
              secureTextEntry={true}
              placeholderTextColor={theme.placeholder}
            />
          </View>

          {/* SUBMIT */}
          <PressableOpacity
            onPress={handleLogin}
            style={styles(theme).controlButton}
          >
            <Text style={styles(theme).controlButtonText}>Register</Text>
          </PressableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterView;
