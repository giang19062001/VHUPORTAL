import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    gap: -100,
    marginTop:80,
  },
  imageBg:{
    width:450,
    height:300,
    objectFit: "fill",
  },
  avatar:{
    position:"absolute",
    top:250,
    left:10
  },
  textName:{
    fontSize:30,
    color:'#234384',
    fontWeight:'bold',
    position:"absolute",
    top:310,
    left:180
  },
  textMajor:{
    fontSize:20,
    color:'grey',
    position:"absolute",
    top:350,
    left:180
  },
  viewDivider:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    flexDirection:'row'
  },
  viewText:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    flexDirection:'row',
    marginLeft:20
  },
  text:{
    color:'#234384',
    fontSize:21,
    fontWeight:'400'
  },
  viewLogout:{
    flex: 1,
    gap: 20,
    flexDirection:'row'
  },
  textLogout: {
    color:'#D80032',
    fontWeight:'bold',
    fontSize:23,

  },

});
