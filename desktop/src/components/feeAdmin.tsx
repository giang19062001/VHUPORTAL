import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
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
import { getAllFee } from "../redux/fee/fee.thunk";
import { IFee } from "../interface/fee";

export const FeeAdmin = () => {
  const dispatch = useAppDispatch();

  const fees = useSelector((state: RootState) => state.fee.fees);

  useEffect(() => {
    const promise1 = dispatch(getAllFee());
    return () => {
      promise1.abort();
    };
  }, [dispatch]);

  return (
    <div>
      <Typography
        align="center"
        sx={{ fontSize: 25, fontWeight: "bold", margin: 3 }}
      >
        Danh sách thanh toán học phí
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 1 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">MÃ THANH TOÁN</StyledTableCell>
              <StyledTableCell align="center">
                MÃ SỐ SINH VIÊN THANH TOÁN
              </StyledTableCell>
              <StyledTableCell align="center">TỔNG TIỀN</StyledTableCell>
              <StyledTableCell align="center">
                THỜI GIAN THANH TOÁN
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees.length > 0 &&
              fees.map((row) => (
                <StyledTableRow
                  key={row.ID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell align="center">{row.ID}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.STUDENT}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ color: "red" }}>
                    <b>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(row.TOTAL)}
                    </b>
                  </StyledTableCell>{" "}
                  <StyledTableCell align="center">
                    {new Date(row.C_TIME).toLocaleDateString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        align="right"
        sx={{ fontSize: 25, fontWeight: "bold", marginTop: 10, marginRight: 3 ,color:'red'}}
      >
       Tổng tiền đã thu được: { new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(fees.reduce(
                        (accumulator: number, currentValue: IFee) =>
                          accumulator + currentValue.TOTAL,
                        0
                      ))}
      </Typography>
    </div>
  );
};
