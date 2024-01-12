import { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import styles from "../../styles/auth/auth.styles";
import ToonAPI from "../../api/api";
import validator from "../../utils/validator";
import { useSession, useTheme } from "../../global";
import { PressableOpacity } from "../../components/common/button";
import HeaderButton from "../../components/common/button/headerbtn";

const LoginView = () => {
  const { signIn } = useSession();
  const { theme } = useTheme();

  const [authMode, setAuthMode] = useState('Login');

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
    } else if (authMode === 'Register' && password != password2) {
      setMessage("Passwords do not match.")
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      
      let url = "/users/";
      if (authMode === 'Register') {
        formData.append("password2", password2);
        url += "register/";
      } else {
        url += "login/";
      }

      const results = await ToonAPI.post(url, formData);
      if (results.status == 200) {
        signIn(results.data);
      } else {
        setMessage(Object.values(results.data)[0]);
      }
    }
    return;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HEADER */}
      <Stack.Screen options={{
        headerShadowVisible: true,
        headerLeft: () => <HeaderButton text={'Login'} onPress={() => setAuthMode('Login')} theme={theme} active={authMode === 'Login' ? true : false} />,
        headerRight: () => <HeaderButton text={'Register'} onPress={() => setAuthMode('Register')} theme={theme} active={authMode === 'Register' ? true : false} />,
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

          {/* RE-ENTER PASSWORD */}
          { authMode === "Register" &&
            <View style={styles(theme).controlWrapper}>
              <TextInput
                style={styles(theme).controlInput}
                value={password2}
                onChangeText={(text) => setPassword2(text.trim())}
                placeholder="Confirm password"
                secureTextEntry={true}
                placeholderTextColor={theme.placeholder}
              />
            </View>
          }

          {/* SUBMIT */}
          <PressableOpacity
            onPress={handleLogin}
            theme={theme}
            style={styles(theme).controlButton}
          >
            <Text style={styles(theme).controlButtonText}>{authMode}</Text>
          </PressableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginView;