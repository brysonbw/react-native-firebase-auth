import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { colors } from "../../constants/theme";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { SignupValues } from "../../types/formValues";
import { toastErrorMessage, toastMessage } from "../../utils/toastMessage";
import { useNavigation } from "@react-navigation/native";
import { LoadingSpinner } from "../LoadingSpinner";
import { usernamesDocID } from "../../utils/usernamesDocID";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "username too short")
    .max(25, "username too long")
    .trim()
    .matches(
      /^[a-zA-Z0-9_]{3,25}$/,
      "no spaces in-between & alphanumeric or underscore characters only"
    )
    .required("required"),
  email: Yup.string().email("invalid email").required("required"),
  password: Yup.string()
    .min(10, "password too short")
    .max(128, "password too long")
    .matches(/^(?=.*[a-z])/, "must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "must contain at least one number")
    .required("required"),
});

const SignUpForm = () => {
  const { setCurrentUser } = useAuth();
  const navigation: any = useNavigation();


  const [usernamesList, setUsernamesList] = useState<any | null>(null);
  const usernamesRef = doc(db, "usernames", usernamesDocID);

  useEffect(() => {
    async function fetchUsernameList() {
      const querySnapshot = await getDocs(collection(db, "usernames"));
      querySnapshot.forEach((doc) => {
        setUsernamesList(doc.data().usernames);
      });
    }
    fetchUsernameList();
  }, []);

  const initialValues: SignupValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values: SignupValues) => {
    try {
      // if username exists throw error exit function
      if (usernamesList?.includes(values.username)) {
        throw new Error("Username taken");
      }

      const userCredential = createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = (await userCredential).user;
      const usersRef = doc(db, "users", user.uid);

      // add current user username to usernames array
      updateDoc(usernamesRef, {
        usernames: arrayUnion(values.username),
      });

      // set user to context
      setCurrentUser({
        user: user,
        isLoggedIn: true,
      });

      // update user profile
      updateProfile(user, {
        displayName: values.username,
      });

      // send email verification
      sendEmailVerification(user);

      // save users to 'users' collection in DB
      setDoc(usersRef, {
        username: values.username,
        email: user.email,
        uid: user.uid,
        createdAt: user.metadata.creationTime,
        updatedAt: user.metadata.creationTime,
      });

      // notify account created
      toastMessage("Account created.", "LONG");

      // navigate to verify email screen
      navigation.navigate("VerifyEmail");
    } catch (error: any) {
      if (error.message === "Username taken")
        toastMessage('Sorry, that username is taken.','LONG');
      else toastErrorMessage(error);
    }
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
          handleSubmit,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <KeyboardAvoidingView behavior="padding">

            {/*  ---------------------Username----------------------- */}
            {touched.username && errors.username ? (
              <Text style={{ color: "red", top: 10 }}>{errors.username}</Text>
            ) : null}
            <TextInput
              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor={colors.white}
              style={styles.textInput}
              onChangeText={handleChange("username")}
              value={values.username}
            />

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
                {isSubmitting ? <LoadingSpinner /> : "Sign up"}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

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
