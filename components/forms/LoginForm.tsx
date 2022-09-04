import {
  StyleSheet,
  Alert,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { colors } from "../../constants/theme";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { LoginValues } from "../../types/formValues";
import { toastErrorMessage } from "../../utils/toastMessage";
import { LoadingSpinner } from "../LoadingSpinner";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string()
    .min(10, "password too short")
    .max(128, "password too long")
    .matches(/^(?=.*[a-z])/, "must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "must contain at least one number")
    .required("required"),
});

const LoginForm = () => {
  const { setCurrentUser } = useAuth();
  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // set user to context
        setCurrentUser({
          user: user,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        toastErrorMessage(error);
      });
  };

  return (
    <View style={styles.formView}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          isSubmitting,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <KeyboardAvoidingView behavior="padding">
            {/** ---------------------Email----------------------- */}
            {touched.email && errors.email ? (
              <Text style={{ color: "red", top: 10 }}>{errors.email}</Text>
            ) : null}
            <TextInput
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={colors.white}
              style={styles.textInput}
              onChangeText={handleChange("email")}
              value={values.email}
            />

            {/** -----------------Password----------------------- */}
            {touched.password && errors.password ? (
              <Text style={{ color: "red", top: 10 }}>{errors.password}</Text>
            ) : null}
            <TextInput
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor={colors.white}
              style={styles.textInput}
              onChangeText={handleChange("password")}
              secureTextEntry
              value={values.password}
            />

            <TouchableOpacity
              style={styles.buttonView}
              onPress={handleSubmit as any}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? <LoadingSpinner /> : "Login"}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formView: {
    width: "80%",
    marginTop: 35,
  },
  textInput: {
   backgroundColor: colors.darkGrey,
    height: 52,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: colors.white,
  },
  buttonView: {
    backgroundColor: colors.primaryBlue,
    elevation: -5,
    borderRadius: 10,
    marginTop: 19,
    width: "100%",
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "400",
  },
});
