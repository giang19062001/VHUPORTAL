import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#F1EFEF",
  },
  text: {
    fontSize: 20,
  },
  textTitle: {
    color: "#234384",
    fontWeight: "700",
    fontSize: 23,
  },
  textSub: {
    fontSize: 20,
    color: "grey",
  },
  viewDivider: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    flexDirection: "row",
  },
  viewStudent: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    margin: 20,
  },
  //MODAL
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
},
  modalView: {
    width:320,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
 
  buttonClose: {
    backgroundColor: "#D80032",
    marginTop:15

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:23,
  },
  modalTextName:{
    marginBottom: 10,
    marginTop: 10,
    fontSize:25,
    textAlign: "center",
    color:'#234384',
    fontWeight:'500'
  },
  modalText: {
    marginBottom: 10,
    marginTop: 10,
    fontSize:25,
    textAlign: "center",
  },
});
