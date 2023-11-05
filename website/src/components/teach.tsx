import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  closeSemeter,
  getAllSemeter,
  getTeachSemeter,
  openSemeter,
} from "../redux/teach/tech.thunk";
import { StyledTableCell, StyledTableRow } from "../utils/custom";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const Teach = () => {
  const dispatch = useAppDispatch();
  const [changeSemeter, setChangeSemeter] = useState(false);
  const semeters = useSelector((state: RootState) => state.teach.semeters);
  const teachs = useSelector((state: RootState) => state.teach.teachs);

  useEffect(() => {
    const promise1 = dispatch(getAllSemeter());
    setChangeSemeter(false);
    return () => {
      promise1.abort();
    };
  }, [dispatch, changeSemeter]);

  useEffect(() => {
    if (semeters) {
      const sem = semeters.find((element) => element.ON === "Y");
      const promise2 = dispatch(getTeachSemeter(sem?.ID as unknown as number));
      return () => {
        promise2.abort();
      };
    }
  }, [dispatch, semeters]);

  const openSemeterClick = async (id: number) => {
    dispatch(openSemeter(id))
      .unwrap()
      .then(() => {
        setChangeSemeter(true);
      })
      .catch((err: any) => {});
  };

  const closeSemeterClick = async (id: number) => {
    dispatch(closeSemeter(id))
      .unwrap()
      .then(() => {
        setChangeSemeter(true);
      })
      .catch((err: any) => {});
  };

  return (
    <div>
      <Typography
        align="center"
        sx={{ fontSize: 25, fontWeight: "bold", margin: 3 }}
      >
        Danh sách đợt đăng kí học phần
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 1 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">HỌC KÌ</StyledTableCell>
              <StyledTableCell align="center">NĂM HỌC</StyledTableCell>
              <StyledTableCell align="center">TÌNH TRẠNG</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semeters.map((row) => (
              <StyledTableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{row.NAME}</StyledTableCell>
                <StyledTableCell align="center">{row.YEAR}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.ON === "Y" ? (
                    <b className="text-green-500">Đang mở</b>
                  ) : (
                    "Chưa mở"
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.ON === "Y" ? (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => closeSemeterClick(row.ID)}
                    >
                      Đóng
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openSemeterClick(row.ID)}
                    >
                      Mở
                    </button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        align="center"
        sx={{ fontSize: 25, fontWeight: "bold", marginTop: 8, marginBottom: 3 }}
      >
        Danh sách học phần được đăng ký trong kì này
      </Typography>

      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">MÃ HỌC PHẦN ĐĂNG KÝ</StyledTableCell>
              <StyledTableCell align="center">MÔN HỌC</StyledTableCell>
              <StyledTableCell align="center">GIẢNG VIÊN</StyledTableCell>
              <StyledTableCell align="center">LỚP</StyledTableCell>
              <StyledTableCell align="center">HỌC KÌ</StyledTableCell>
              <StyledTableCell align="center">NGÀY HỌC</StyledTableCell>
              <StyledTableCell align="center">TIẾT</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachs.map((row) => (
              <StyledTableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{row.ID}</StyledTableCell>
                <StyledTableCell align="center">{row.SUBJECT}</StyledTableCell>
                <StyledTableCell align="center">{row.TEACHER}</StyledTableCell>
                <StyledTableCell align="center">{row.CLASS}</StyledTableCell>
                <StyledTableCell align="center">{row.SEMETER}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.DAY).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.SESSION === "MORNING" ? "SÁNG" : "CHIỀU"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
