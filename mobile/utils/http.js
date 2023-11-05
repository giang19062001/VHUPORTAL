import axios from "axios";
import {REACT_APP_SERVER} from "@env"

 

const http = axios.create({
    baseURL: `http://10.0.2.2${REACT_APP_SERVER}`,
    timeout: 10000,
    withCredentials: true,
  });

  export default http