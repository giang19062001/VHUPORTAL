import { StatusBar } from "expo-status-bar";
import React from "react";
import Login from "./components/login";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer,DefaultTheme  } from "@react-navigation/native";
import { LogBox } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/main";

const Stack = createNativeStackNavigator();


const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:"white"
  },
};
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <>
      <Provider store={store}>
        <NavigationContainer theme={Theme} >
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen

              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ title: "Trang chủ", headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
