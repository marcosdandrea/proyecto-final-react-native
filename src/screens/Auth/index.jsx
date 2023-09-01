import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { CustomText, InputTextLabeled, StandarIconButton } from "../../components";
import { colors } from "../../theme";
import { icons } from "../../theme/icons";
import { useState } from "react";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../store/auth/auth.API";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth/auth.slice";
import {
  useSetUserDataMutation,
  useUpdateUserDataMutation,
} from "../../store/user/user.API";

const Auth = () => {
  const dispatch = useDispatch();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();
  const [registerUser] = useSetUserDataMutation();
  const [updateUserData] = useUpdateUserDataMutation();

  const displayAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const signIn = async ({ email, password }) => {
    const result = await signInMutation({ email, password });
    if (result?.error) {
      const errorMessage = result.error.data.error.errors[0].message;
      if (
        errorMessage === "INVALID_PASSWORD" ||
        errorMessage === "EMAIL_NOT_FOUND"
      ) {
        displayAlert("Login Error", "Wrong user or password");
        return;
      }
      if (errorMessage.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
        displayAlert(
          "Login Error",
          "Too many attempts, please try again later"
        );
        return;
      }
    }
    updateUserData({
      userID: result.data.localId,
      data: {
        lastTimeSeen: Date.now(),
      },
    });
    if (result?.data) {
      dispatch(setUser(result.data));
    }
  };

  const signUp = async ({ email, password }) => {
    const result = await signUpMutation({ email, password });
    if (result?.error?.data.error.message == "EMAIL_EXISTS") {
      displayAlert("Login Error", "This emails already exists");
    }
    await registerUser({
      userID: result.data.localId,
      data: {
        registerDate: Date.now(),
        mail: result.data.email,
      },
    });
    displayAlert("SignUp", "Congratulations!, you have an new account");
    await signIn({ email, password });
  };

  const onHandlerAuth = async () => {
    try {
      register
        ? await signUp({ email, password })
        : await signIn({ email, password });
    } catch (error) {
      displayAlert("Error", "We are running some problems, try later");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <CustomText text="Welcome" style={styles.mainTitle}/>
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
