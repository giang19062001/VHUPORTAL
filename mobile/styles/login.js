import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  Scroll: {
    flex: 1,
    alignItems: "center",
    marginTop:'40%',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 30,
    marginBottom:40
  },

  TextInput: {
    height: 50,
    padding: 15,
    width: 100,
    borderRadius: 5,
    borderWidth: 1,
    width: 300,
  },
  viewBtnLogin: {
    marginTop:15,
    paddingLeft: 20,
    width: 250,
    height: 200,
  },
  btnLogin: {
    borderRadius: 30,
  },
  error:{
    color:'red',
    fontSize:16,
    marginTop:5,
    textAlign:'center'
  }
});
