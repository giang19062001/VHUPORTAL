import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  getAllSemeter,
  getSignTeach,
  getTeachSemeter,
} from "../redux/teach/tech.thunk";
import { StyledTableCell, StyledTableRow, styleModal } from "../utils/custom";
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ISign, ITeach } from "../interface/teach";
import { getFee, pay } from "../redux/fee/fee.thunk";
import { IPayPost } from "../interface/fee";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Fee = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ISign[]>();
  const [total, setTotal] = useState<number>(0);

  const [openModal, setOpenModal] = useState(false);

  const student = useSelector((state: RootState) => state.auth.userInfo);

  const semeters = useSelector((state: RootState) => state.teach.semeters);
  const teachs = useSelector((state: RootState) => state.teach.teachs);
  const signs = useSelector((state: RootState) => state.teach.signs);
  const fees = useSelector((state: RootState) => state.fee.fees);

  useEffect(() => {
    const promise1 = dispatch(getAllSemeter());
    return () => {
      promise1.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (semeters) {
      const sem = semeters.find((element) => element.ON === "Y");
      const promise2 = dispatch(getTeachSemeter(sem?.ID as unknown as number));
      const promise3 = dispatch(getSignTeach(student?.email!));
      const promise4 = dispatch(getFee(student?.email!));

      return () => {
        promise2.abort();
        promise3.abort();
        promise4.abort();
      };
    }
  }, [dispatch, semeters, student?.email]);

  useEffect(() => {
    let arrTotal: ISign[] = [];
    teachs.map((row) => {
      if (
        row.MAJOR === student?.major &&
        signs.find((element) => element.TEACH === row.ID) &&
        signs.find((element) => element.TEACH === row.ID)?.PAY !== "Y"
      ) {
        arrTotal.push(signs?.find((element) => element.TEACH === row.ID)!);
      }
    });

    setData(arrTotal);
  }, [signs, teachs]);

  useEffect(() => {
    setTotal(
      data?.reduce(
        (accumulator: number, currentValue: ISign) => accumulator + currentValue.CREDIT * 1000000,
        0
      ) as number
    );
  }, [data]);

  const payClick = async (body: IPayPost) => {
    dispatch(pay(body))
      .unwrap()
      .then(() => {
        setOpenModal(true)
        const promise1 = dispatch(getFee(student?.email!));
        return () => {
          promise1.abort();
        };
      })
      .catch((err: any) => {});
  };

  return (
    <div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={styleModal}>
          <img alt="" src={require("../images/success.gif")} />
          <Typography
            sx={{ mt: 2, fontSize: 20, fontWeight: "bold" }}
            align="center"
          >
            Thanh toán học phí thành công
          </Typography>
        </Box>
      </Modal>
      <Typography
        align="center"
        sx={{
          fontSize: 25,
          fontWeight: "bold",
          marginBottom: 3,
          marginTop: 8,
        }}
      >
        Danh sách số tiền học phần cần thanh toán
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">MÃ ĐĂNG KÝ</StyledTableCell>
              <StyledTableCell align="center">MÔN HỌC</StyledTableCell>
              <StyledTableCell align="center">SỐ TÍN CHỈ</StyledTableCell>
              <StyledTableCell align="center">
                THỜI GIAN ĐĂNG KÝ
              </StyledTableCell>
              <StyledTableCell align="center">THÀNH TIỀN</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <StyledTableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{row.ID}</StyledTableCell>
                <StyledTableCell align="center">{row.SUBJECT}</StyledTableCell>
                <StyledTableCell align="center">{row.CREDIT}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.C_TIME).toLocaleString()}
                </StyledTableCell>

                <StyledTableCell align="center" sx={{ color: "red" }}>
                  <b>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(row.CREDIT * 1000000)}
                  </b>
                </StyledTableCell>
              </StyledTableRow>
            ))}

            <TableRow>
              <StyledTableCell colSpan={2} align="center">
                Tổng tiền
              </StyledTableCell>
              <StyledTableCell colSpan={2} align="center">
                {" "}
                <b className="text-xl text-red-500">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    data
                      ? data.reduce(
                          (accumulator: number, currentValue: ISign) =>
                            accumulator + currentValue.CREDIT * 1000000,
                          0
                        )
                      : 0
                  )}
                </b>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
        {data?.length !== 0 && data?.some((ele) => ele.PAY === "N") ? (
           <div style={{ marginLeft: 500, marginRight: 500, marginTop: 30 }}>
          <PayPalScriptProvider
          
            options={{
              clientId: process.env.REACT_APP_PAYPAL as string,
              currency: "USD",
            }}
          >
            <PayPalButtons
            
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total as unknown as string,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data: any, actions: any) => {
                return actions?.order?.capture().then(function (res: any) {
                    if(res.status === "COMPLETED"){
                      payClick({
                              total: total,
                              student: student?.email!,
                            })
                    }
                });
              }}
            />
          </PayPalScriptProvider>
          </div>
        ) : null}
      </TableContainer>

      <Typography
        align="center"
        sx={{
          fontSize: 25,
          fontWeight: "bold",
          marginBottom: 3,
          marginTop: 8,
        }}
      >
        Lịch sử thanh toán học phí học phần
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 1 }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">MÃ THANH TOÁN</StyledTableCell>
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
                  <StyledTableCell align="center" sx={{ color: "red" }}>
                    <b>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(row.TOTAL)}
                    </b>
                  </StyledTableCell>{" "}
                  <StyledTableCell align="center">
                    {new Date(row.C_TIME).toLocaleString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <br />
      <b className="text-xl">
        1 tín chỉ = <b className="text-red-500">1.000.000VND</b>
      </b>
    </div>
  );
};
