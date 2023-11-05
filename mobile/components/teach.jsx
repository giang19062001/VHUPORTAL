import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  getSignTeachOfTeacherAndSubject,
  getTeachOfTeacher,
} from "../redux/teach/teach.thunk";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../redux/auth/auth.reducer";
import { Divider, Icon, ListItem } from "@rneui/themed";
import {
  selectStudent,
  selectTeach,
  selectTeachLoading,
} from "../redux/teach/teach.reducer";
import { styles } from "../styles/teach";
import { Avatar } from "react-native-elements";
import * as Progress from "react-native-progress";

export default function Teach() {
  const isFocused = useIsFocused();
  const user = useSelector(selectUserInfo);
  const students = useSelector(selectStudent);
  const loading = useSelector(selectTeachLoading);

  const teachs = useSelector(selectTeach);
  const [expanded, setExpanded] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [studentDetail, setStudentDetail] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) {
      dispatch(getTeachOfTeacher(user.id))
        .unwrap()
        .then((res) => {})
        .catch((err) => {});
    }
  }, [isFocused]);

  const handleChange = (i, subject) => {
    setExpanded(i == expanded ? -1 : i);
    dispatch(
      getSignTeachOfTeacherAndSubject({ teacher: user.email, subject: subject })
    )
      .unwrap()
      .then((res) => {
      })
      .catch((err) => {});
  };

  const getStudentDetail = (email) => {
    setModalVisible(true);
    setStudentDetail(students.find((element) => element.EMAIL === email));
  };

  return (
    <>
      {loading ? (
        <Progress.Circle
          size={100}
          indeterminate={true}
          borderWidth={7}
          style={styles.loading}
        />
      ) : null}
      <ScrollView>
        {teachs?.map((value, i) => (
          <ListItem.Accordion
            key={i}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={styles.textTitle}>
                    {value.SUBJECT}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.textSub}>
                    {value.SEMETER}/{value.YEAR}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </>
            }
            isExpanded={i == expanded ? true : false}
            onPress={() => {
              handleChange(i, value.SUBJECT);
            }}
          >
            {students?.map((value, i) => (
              <>
                <TouchableOpacity
                  style={styles.viewStudent}
                  onPress={() => getStudentDetail(value.EMAIL)}
                >
                  <Avatar
                    size={80}
                    rounded
                    source={{ uri: value ? value.AVATAR : "" }}
                  />
                  <Text style={styles.text}>{value.NAME}</Text>
                </TouchableOpacity>
                <View style={styles.viewDivider}>
                  <Divider
                    style={{ width: "100%" }}
                    color="grey"
                    width={1}
                    orientation="horizontal"
                  />
                </View>
              </>
            ))}
          </ListItem.Accordion>
        ))}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Avatar
                  size={100}
                  rounded
                  source={{ uri: studentDetail ? studentDetail?.AVATAR : "" }}
                />
                <Text style={styles.modalTextName}>{studentDetail?.NAME}</Text>
                <Text style={styles.modalText}>
                  {new Date(studentDetail?.BIRTHDAY).toLocaleDateString()}
                </Text>
                <Text style={styles.modalText}>{studentDetail?.EMAIL}</Text>
               

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Đóng</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
}
