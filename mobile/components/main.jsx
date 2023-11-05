import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Info from "./infomation";
import Teach from "./teach";

const Tab = createBottomTabNavigator();

 const Main = () => {

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Info") {
              iconName = focused
                ? "person-circle"
                : "person-circle";
            } else{
              iconName = focused ? "book" : "book";
            }
            return <Ionicons name={iconName} size={35}  color={color} />;
          },
          tabBarActiveTintColor: "#234384",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle:{
            fontSize:14,
            fontWeight:'bold'
          },
          tabBarStyle: {
            paddingBottom: 10,
            paddingTop: 10,
            height: 100,
          },
        })}
      >
        <Tab.Screen
          name="Info"
          component={Info}
          options={{
            headerShown: false,
            title: "Thông tin cá nhân",
          }}
        /><Tab.Screen
        name="Teach"
        component={Teach}
        options={{
          headerShown: false,
          title: "Danh sách học phần phụ trách",
        }}
      />

      </Tab.Navigator>
  );
}
export default Main