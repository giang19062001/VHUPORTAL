import { BaseToast, ErrorToast } from 'react-native-toast-message';
export const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text2Style={{
        fontSize: 20
      }}
      text2NumberOfLines={2}
      style={{borderLeftColor: '#FE6301',height:80}}
      
      />
  ),
  
};