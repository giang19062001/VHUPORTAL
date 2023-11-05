import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { StyledTableCell, StyledTableRow } from "../utils/custom";
import { getAllStudent, getAllTeacher } from "../redux/student/student.thunk";
import { Avatar, Stack, Typography } from "@mui/material";
import { Student } from "./student";

export const StudentList = () => {
  const dispatch = useAppDispatch();
  const students = useSelector((state: RootState) => state.student.students);
  const teachers = useSelector((state: RootState) => state.student.teachers);

  useEffect(() => {
    const promise1 = dispatch(getAllStudent());
    const promise2 = dispatch(getAllTeacher());
    return () => {
      promise1.abort();
      promise2.abort();
    };
  }, [dispatch]);
  
  const reFreshCallList = async() =>{
    const promise1 = dispatch(getAllStudent());
    return () => {
      promise1.abort();
    };
  }

  return (
    <>
      <Stack
        spacing={10}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Student reFresh={()=> reFreshCallList() }></Student>
        <div>
          <Typography
            align="center"
            sx={{
              fontSize: 25,
              fontWeight: "bold",
              marginBottom: 3,
              marginTop: 8,
            }}
          >
            Danh sách giảng viên
          </Typography>
          <TableContainer component={Paper} sx={{ width: 700 }}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ẢNH ĐẠI DIỆN</StyledTableCell>
                  <StyledTableCell align="center">HỌ TÊN</StyledTableCell>
                  <StyledTableCell align="center">EMAIL</StyledTableCell>

                  <StyledTableCell align="center">CHUYÊN NGÀNH</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((row) => (
                  <StyledTableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center">
                      <Avatar src={row.AVATAR}    sx={{
                      display: "block",
                      margin: "auto",
                      width: 60,
                      height: 60,
                    }}></Avatar>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.NAME}</StyledTableCell>
                    <StyledTableCell align="center" sx={{color:'#00A9FF'}}>{row.EMAIL}@gmail</StyledTableCell>

                    <StyledTableCell align="center">
                      {row.MAJOR}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Stack>
      <Typography
        align="center"
        sx={{ fontSize: 25, fontWeight: "bold", marginBottom: 3, marginTop: 8 }}
      >
        Danh sách sinh viên
      </Typography>

      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ẢNH ĐẠI DIỆN</StyledTableCell>
              <StyledTableCell align="center">MÃ SINH VIÊN</StyledTableCell>
              <StyledTableCell align="center">HỌ TÊN</StyledTableCell>
              <StyledTableCell align="center">GIỚI TÍNH</StyledTableCell>
              <StyledTableCell align="center">NGÀY SINH</StyledTableCell>
              <StyledTableCell align="center">CHUYÊN NGÀNH</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (
              <StyledTableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">
                  <Avatar
                    sx={{
                      display: "block",
                      margin: "auto",
                      width: 100,
                      height: 100,
                    }}
                    src={row.AVATAR as unknown as string}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.EMAIL}</StyledTableCell>
                <StyledTableCell align="center">{row.NAME}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.GENDER === 1 ? "Nữ" : "Nam"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.BIRTHDAY).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">{row.MAJOR}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
