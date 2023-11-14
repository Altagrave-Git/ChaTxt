import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { COLORS, SIZES, FONT, icons } from "../../constants";
import styles from "../../styles/forms";
import ToonAPI from "../../api/api";
import validator from "../../utils/validator";

const RegisterView = () => {
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
        console.log(results.data);
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
        backgroundColor: COLORS.gray1,
      }}
    >
      {/* HEADER */}
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.warning },
        headerShadowVisible: true,
        headerLeft: () => (
          <Pressable onPress={() => router.push("/auth/login/")}>
            <Text style={{
              fontFamily: FONT.cute,
              fontSize: 36,
              color: COLORS.secondary,
            }}>Login</Text>
          </Pressable>
        ),
        headerRight: () => (
          <Text style={{
            fontFamily: FONT.cute,
            fontSize: 36,
            color: COLORS.light,
          }}>Register</Text>
        ),
        headerTitle: "",
      }} />

      <ScrollView>
        <View style={styles.controlContainer}>
          {/* ERROR MESSAGE */}
          {message != null && (
            <Text
              style={{
                color: COLORS.danger,
                fontFamily: FONT.regular,
                fontSize: 16,
                textAlign: "center",
              }}
            >{message}</Text>
          )}

          {/* EMAIL */}
          <View style={styles.controlWrapper}>
            <TextInput
              style={styles.controlInput}
              value={email}
              onChangeText={(text) => setEmail(text.trim())}
              placeholder="E-mail address"
              placeholderTextColor={COLORS.placeholder}
            />
          </View>

          {/* PASSWORD 1 */}
          <View style={styles.controlWrapper}>
            <TextInput
              style={styles.controlInput}
              value={password}
              onChangeText={(text) => setPassword(text.trim())}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={COLORS.placeholder}
            />
          </View>

          {/* PASSWORD 2 */}
          <View style={styles.controlWrapper}>
            <TextInput
              style={styles.controlInput}
              value={password2}
              onChangeText={(text) => setPassword2(text.trim())}
              placeholder="Re-enter password"
              secureTextEntry={true}
              placeholderTextColor={COLORS.placeholder}
            />
          </View>

          {/* SUBMIT */}
          <Pressable style={styles.controlButton} onPress={handleLogin}>
            <Text style={{
              color: COLORS.warning,
              fontFamily: FONT.cute,
              fontSize: 30,
            }}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterView;
