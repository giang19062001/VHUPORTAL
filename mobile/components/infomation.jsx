import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { logout, selectUserInfo } from "../redux/auth/auth.reducer";
import { styles } from "../styles/info";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";

export default function Info() {
  const user = useSelector(selectUserInfo);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout())
    navigation.navigate("Login");
  };
  return (
    <>
      <Image
        source={require("../images/truong-dai-hoc-van-hien.jpg")}
        style={styles.imageBg}
      />

      <Avatar
        containerStyle={styles.avatar}
        size={150}
        rounded
        source={{ uri: user ? user.avatar : "" }}
      />
      <Text style={styles.textName}>{user.name}</Text>
      <Text style={styles.textMajor}>{user.major}</Text>

      <View style={styles.container}>

        <View style={styles.viewText}>
          <Icon
            name="birthday-cake"
            size={25}
            type="font-awesome"
            color={"#337CCF"}
          />
          <Text style={styles.text}>
            {new Date(user.birthday).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.viewText}>
          <Ionicons name={"mail"} size={25} color={"#337CCF"} />
          <Text style={styles.text}>{user.email}@gmail</Text>
        </View>
        <View style={styles.viewDivider}>
          <Divider
            style={{ width: "100%" }}
            color="#B2C8BA"
            width={1}
            orientation="horizontal"
          />
        </View>
        <TouchableOpacity style={styles.viewText} onPress={() => handleLogout()}>
          <View style={styles.viewLogout}>
            <Icon name="logout" type="ant-design" size={30} color={"#D80032"} />
            <Text style={styles.textLogout}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
