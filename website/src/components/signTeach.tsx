import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  deteleSignTeach,
  getAllSemeter,
  getSignTeach,
  getTeachSemeter,
  signTeach,
} from "../redux/teach/tech.thunk";
import { StyledTableCell, StyledTableRow } from "../utils/custom";
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ISignTeachPost } from "../interface/teach";

export const SignTech = () => {
  const dispatch = useAppDispatch();
  const student = useSelector((state: RootState) => state.auth.userInfo);

  const semeters = useSelector((state: RootState) => state.teach.semeters);
  const teachs = useSelector((state: RootState) => state.teach.teachs);
  const signs = useSelector((state: RootState) => state.teach.signs);

  const [sem, setSem] = useState<undefined | number>(undefined);

  useEffect(() => {
    const promise1 = dispatch(getAllSemeter());
    return () => {
      promise1.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (semeters) {
      const sem = semeters.find((element) => element.ON === "Y");
      setSem(sem?.ID as unknown as number);
      const promise2 = dispatch(getTeachSemeter(sem?.ID as unknown as number));
      const promise3 = dispatch(getSignTeach(student?.email!));
      return () => {
        promise2.abort();
        promise3.abort();
      };
    }
  }, [dispatch, semeters, student?.email]);

  const signClick = async (body: ISignTeachPost) => {
    dispatch(signTeach(body))
      .unwrap()
      .then(() => {
        const promise3 = dispatch(getSignTeach(student?.email!));
        return () => {
          promise3.abort();
        };
      })
      .catch((err: any) => {});
  };

  const deleteClick = async (id: number) => {
    dispatch(deteleSignTeach(id))
      .unwrap()
      .then(() => {
        const promise3 = dispatch(getSignTeach(student?.email!));
        return () => {
          promise3.abort();
        };
      })
      .catch((err: any) => {});
  };

  

  return (
    <div>
      {!sem ? (
        <Paper>
              <Typography
            align="center" sx={{color:'red', fontSize:30,fontWeight:'bold', padding:5}}>
          Chưa tới kì đăng ký
        </Typography>

          </Paper>
            
      
      
      ) : (
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
            Danh sách học phần có thể đăng ký
          </Typography>
          <TableContainer component={Paper}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"> MÃ MÔN HỌC</StyledTableCell>
                  <StyledTableCell align="center">MÔN HỌC</StyledTableCell>
                  <StyledTableCell align="center">GIẢNG VIÊN</StyledTableCell>
                  <StyledTableCell align="center">LỚP</StyledTableCell>
                  <StyledTableCell align="center">HỌC KÌ</StyledTableCell>
                  <StyledTableCell align="center">NGÀY HỌC</StyledTableCell>
                  <StyledTableCell align="center">TIẾT</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachs.map((row) =>
                  row.MAJOR !== student?.major ? null : (
                    <StyledTableRow
                      key={row.ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="center">{row.ID}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.SUBJECT}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.TEACHER}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.CLASS}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.SEMETER}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(row.DAY).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.SESSION === "MORNING" ? "SÁNG" : "CHIỀU"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {signs.find((element) => element.TEACH === row.ID) ? (
                          signs.find((element) => element.TEACH === row.ID)
                            ?.PAY === "Y" ? (
                            <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded">
                              Đã đăng ký
                            </button>
                          ) : (
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() =>
                                deleteClick(
                                  signs.find(
                                    (element) => element.TEACH === row.ID
                                  )?.ID!
                                )
                              }
                            >
                              Hủy
                            </button>
                          )
                        ) : (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              signClick({
                                teach: row.ID,
                                student: student.email,
                              })
                            }
                          >
                            Đăng ký
                          </button>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
        </div>
      )}
         <Typography
            align="center"
            sx={{
              fontSize: 25,
              fontWeight: "bold",
              marginBottom: 3,
              marginTop: 8,
            }}
          >
            Danh sách học phần đã đăng ký
          </Typography>
          <TableContainer component={Paper}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"> MÃ MÔN HỌC</StyledTableCell>
                  <StyledTableCell align="center">MÔN HỌC</StyledTableCell>
                  <StyledTableCell align="center">GIẢNG VIÊN</StyledTableCell>
                  <StyledTableCell align="center">LỚP</StyledTableCell>
                  <StyledTableCell align="center">HỌC KÌ</StyledTableCell>
                  <StyledTableCell align="center">NGÀY HỌC</StyledTableCell>
                  <StyledTableCell align="center">TIẾT</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {signs.map((row) =>
                  row.MAJOR !== student?.major ? null : (
                    <StyledTableRow
                      key={row.ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="center">{row.ID}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.SUBJECT}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.TEACHER}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.CLASS}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.SEMETER}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(row.DAY).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.SESSION === "MORNING" ? "SÁNG" : "CHIỀU"}
                      </StyledTableCell>
                   
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  );
};
