import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { colors } from "../.././constants/theme";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toastErrorMessage, toastMessage } from "../../utils/toastMessage";
import { PasswordResetValues } from "../../types/formValues";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("required"),
});

const ResetPasswordScreen = () => {
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const initialValues: PasswordResetValues = {
    email: "",
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toastMessage(`Password reset email sent successfully!`);
        resetForm();
        setPasswordResetSuccess(true);
      })
      .catch((error) => {
        toastErrorMessage(error);
      });
  };

  return (
    <View style={styles.screen}>
      {/** Header View */}
      <View style={styles.headerView}>
        {/** Icon Background View */}
        <View style={styles.iconBackgroundView}>
          {/** Icon */}
          {passwordResetSuccess ? (
            <MaterialIcons name="mark-email-read" size={24} color="white" />
          ) : (
            <MaterialCommunityIcons name="lock-reset" size={24} color="white" />
          )}
        </View>
        {/** Header Text */}
        {passwordResetSuccess ? (
          <>
            <Text style={styles.headerText}>
              Password reset instructions sent!
            </Text>
            <Text style={styles.emailSubText}>
              Check your inbox or junk/spam folder, follow instructions, and
              login in with your new password.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.headerText}>Forgot password?</Text>
            <Text style={styles.emailSubText}>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </Text>
          </>
        )}
      </View>

      {/** Password Reset Form */}

      {passwordResetSuccess ? null : (
        <View style={styles.formView}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              handleSubmit,
              isSubmitting,
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

                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={handleSubmit as any}
                >
                  <Text style={styles.buttonText}>
                    {isSubmitting ? (
                      <LoadingSpinner />
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            )}
          </Formik>
        </View>
      )}
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.secondaryBlack,
  },

  headerView: {
    marginTop: Platform.OS === "ios" ? 10 : 5,
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
    marginTop: 15,
    fontWeight: "500",
  },
  emailSubText: {
    color: colors.white,
    top: 15,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    width: 300,
  },
  iconBackgroundView: {
    width: 50,
    height: 50,
    borderRadius: 400 / 2,
    backgroundColor: colors.primaryBlue,
    justifyContent: "center",
    alignItems: "center",
  },
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
