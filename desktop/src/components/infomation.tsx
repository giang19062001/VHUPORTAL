import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Avatar, Stack, Typography } from "@mui/material";

export const Info = () => {
  const student = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className="border-4 border-blue-900 rounded-lg">

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{marginTop:5}}
      >
        <Avatar
          sx={{
            display: "block",
            margin: "auto",
            width: 100,
            height: 100,
          }}
          src={require("../images/logo.jpg")}
        />
        <Typography
          align="center"
          sx={{
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          TRƯỜNG ĐẠI HỌC VĂN HIẾN
        </Typography>
      </Stack>

      <Typography
        align="center"
        sx={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 3,
          color: "red",
        }}
      >
        THẺ SINH VIÊN
      </Typography>
      <div className="flex items-center justify-center gap-12 ">
        <div>
          <Avatar
            sx={{
              display: "block",
              margin: "auto",
              width: 250,
              height: 250,
            }}
            src={student?.avatar as unknown as string}
          />
        </div>
        <div className="text-xl flex gap-5 flex-col">
          <p>
            Họ tên: <b>{student?.name}</b>
          </p>
          <p>
            Mã số sinh viên: <b>{student?.email}</b>
          </p>
          <p>
            Giới tính: <b>{student?.gender}</b>
          </p>
          <p>
            Sinh nhật:{" "}
            <b>{new Date(student?.birthday!).toLocaleDateString()}</b>
          </p>
          <p>
            Khoa: <b>{student?.major}</b>
          </p>
        </div>
      </div>
      <img
          alt=""
          src={require("../images/wave.png")}
        />
    </div>
  );
};
