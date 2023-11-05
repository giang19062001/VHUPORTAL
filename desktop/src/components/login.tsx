import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm, Resolver } from "react-hook-form";
import { login } from "../redux/auth/auth.thunk";
import { useNavigate } from "react-router-dom";
import { IAuthLogin } from "../interface/auth";
import { RootState, useAppDispatch } from "../redux/store";
import { toast } from "react-toastify";


const resolver: Resolver<IAuthLogin> = async (values) => {
  return {
    values: values ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email- mã số sinh viên không thể trống",
          },
        }
      : !values.password
      ? {
        password: {
            type: "required",
            message: "Mật khẩu đăng nhập không thể trống",
          },
        }
      : {},
  };
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit,formState: { errors },} = useForm<IAuthLogin>({ resolver });
  const onSubmit = handleSubmit((data) =>
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        if (typeof res.data === "string") {
          toast.error(res.data);
        } else {
          if (res.data.isAdmin === 1) {
            navigate("/admin");
          } else {
            toast.error('Ứng dụng chỉ dành cho quản trị viên');
          }
        }
      })
      .catch((err: any) => {})
  );

  return (
    <div className="relative">
      <img
        alt=""
        src={require("../images/VAN-HIEN-UNIERSITY-VIEW-HIGH-BESIDE-scaled.png")}
      />
      <form
        onSubmit={onSubmit}
        style={{ position: "absolute",top:"35%",left:"30%" }}
        className="border-4 bg-white d-block m-auto rounded-lg p-8"
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#154594", fontWeight: "bold" }}
          >
            Đăng nhập
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              {...register("email")}
              color="info"
              margin="normal"
              fullWidth
              id="email"
              label="Mã số sinh viên"
              name="email"
              autoComplete="email"
              autoFocus
           
            />
            {errors?.email && <p className="text-red-500">{errors.email.message}</p>}

            <TextField
              {...register("password")}
              margin="normal"
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
             
            />
            {errors?.password && <p className="text-red-500">{errors.password.message}</p>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};
