import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import { styles } from "../styles/login";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/auth.thunk";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNavigation } from "@react-navigation/native";
import { toastConfig } from "../utils/custom";
import { Formik } from "formik";
import { loginValidationSchema } from "../validation/login";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login() {
  //101A100001
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleLogin = async (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        if (typeof res.data === "string") {
          Toast.show({
            type: "error",
            text2: res.data,
          });
        } else {
          if (res.data.isAdmin === 2) {
            navigation.navigate("Main");
          } else {
            Toast.show({
              type: "error",
              text2: "Ứng dụng chỉ dành cho giảng viên",
            });
          }
        }
      })
      .catch((err) => {});
  };

  return (
    <View style={styles.container}>
      
      <Toast
        config={toastConfig}
        position="bottom"
        ref={(ref) => {
          Toast.setRef(ref);
        }}
      ></Toast>
      <KeyboardAwareScrollView contentContainerStyle={styles.Scroll}>
      <Image style={styles.image} source={require("../images/logo.jpg")} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <View>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <Text style={styles.error}>{errors.email}</Text>
            </View>
            <View>
              <TextInput
                style={styles.TextInput}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={values.password}
                onChangeText={handleChange('password')}

              />
              <Text style={styles.error}>{errors.password}</Text>
            </View>

            <View style={styles.viewBtnLogin}>
              <Button
                style={styles.btnLogin}
                title="Đăng nhập"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>

    </KeyboardAwareScrollView>
    </View>

  );
}
