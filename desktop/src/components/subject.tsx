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
import { getAllSubject } from "../redux/subject/subject.thunk";
import { useSelector } from "react-redux";
import { StyledTableCell, StyledTableRow } from "../utils/custom";
import { Typography } from "@mui/material";

export const Subject = () => {
  const dispatch = useAppDispatch();
  const subjects = useSelector((state: RootState) => state.subject.subjects);

  useEffect(() => {
    const promise = dispatch(getAllSubject());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div>
      <Typography
        align="center"
        sx={{ fontSize: 25, fontWeight: "bold", margin: 3 }}
      >
        Danh sách môn học
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">MÃ MÔN HỌC</StyledTableCell>
              <StyledTableCell align="center">TÊN MÔN HỌC</StyledTableCell>
              <StyledTableCell align="center">CHUYÊN NGÀNH</StyledTableCell>
              <StyledTableCell align="center">SỐ TÍN CHỈ</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((row) => (
              <StyledTableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{row.ID}</StyledTableCell>
                <StyledTableCell align="center">{row.NAME}</StyledTableCell>
                <StyledTableCell align="center">{row.MAJOR}</StyledTableCell>
                <StyledTableCell align="center">{row.CREDIT}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
