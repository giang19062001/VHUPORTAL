import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./page/login";
import { StudentPage } from "./page/student";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  const loading1 = useSelector((state: RootState) => state.auth.loading);
  const loading2 = useSelector((state: RootState) => state.fee.loading);
  const loading3 = useSelector((state: RootState) => state.student.loading);
  const loading4 = useSelector((state: RootState) => state.subject.loading);
  const loading5 = useSelector((state: RootState) => state.teach.loading);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/student" element={<StudentPage></StudentPage>}></Route>
        </Routes>
      </BrowserRouter>
      {loading1 || loading2 || loading3 || loading4 || loading5 ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </div>
  );
}

export default App;
