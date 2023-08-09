import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { InputTextLabeled, StandarIconButton } from "../../components";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";
import { useState } from "react";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../store/auth/auth.API";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth/auth.slice";
import { useSetUserDataMutation } from "../../store/user/user.API";

const Auth = () => {
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { data }] = useSignInMutation();
  const [registerUser, { data: registerData }] = useSetUserDataMutation();
  const [signUp] = useSignUpMutation();

  const onHandlerAuth = async () => {
    try {
      if (!register) {
        const result = await signIn({ email, password });
        if (result?.data) dispatch(setUser(result.data));
      } else {
        const result = await signUp({ email, password });
        if (result?.error?.data.error.message == "EMAIL_EXISTS") {
          Alert.alert(
            "Error",
            "Email already exists",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ],
            { cancelable: false }
          );
        }
        const registeredUser = await registerUser({
          userID: result.data.localId,
          name: "",
          mail: result.data.email,
          profilePic: ""
        });
        console.log (registeredUser);
        Alert.alert("User registered")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.textDecoration}>Fitapp</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {register ? "Sign Up for an account" : "Log in to your account"}
          </Text>
        </View>
        <View style={styles.body}>
          <InputTextLabeled
            label={"email"}
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
            containerBackgroundColor={colors.background.terciary}
          />
          <InputTextLabeled
            label={"password"}
            value={password}
            onChangeText={setPassword}
            style={styles.inputField}
            containerBackgroundColor={colors.background.terciary}
            isPassword={true}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => setRegister((prev) => !prev)}>
            <Text style={styles.footerText}>
              {register ? "I already have an account" : "Need an account?"}
            </Text>
          </TouchableOpacity>
          <StandarIconButton
            onPress={onHandlerAuth}
            icon={register ? icons.register : icons.login}
            buttonProperties={styles.button}
            text={register ? "Register" : "Login"}
          />
        </View>
      </View>
    </View>
  );
};

export default Auth;
