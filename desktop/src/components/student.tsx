import { useEffect, useState } from "react";
import { IStudentPost } from "../interface/student";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getAllMajor } from "../redux/subject/subject.thunk";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { createStudent } from "../redux/student/student.thunk";
import { useForm, Resolver } from "react-hook-form";
import { toast } from "react-toastify";
import { CheckErrorField } from "../interface/error";

const initalState: IStudentPost = {
  name: "",
  gender: "0",
  major: "1",
  birthday: "",
  avatar: "",
};

const resolver: Resolver<IStudentPost> = async (values) => {
  console.log(values)

  return {
    values: values ? values : {},
    errors: !values.name
      ? {
        name: {
            type: "required",
            message: "Tên sinh viên không thể trống",
          },
        }
      : !values.birthday
      ? {
        birthday: {
            type: "required",
            message: "Ngày sinh không thể trống",
          },
        }
      :{},
  };
};

export const Student = (props: {reFresh: () => Promise<() => void>}) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IStudentPost>(initalState);
  const [selectedImage, setSelectedImage] = useState(null);
  const majors = useSelector((state: RootState) => state.subject.majors);

  useEffect(() => {
    const promise = dispatch(getAllMajor());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const { register, handleSubmit,formState: { errors },} = useForm<IStudentPost>({ resolver });
  const onSubmit = handleSubmit((data) =>
      dispatch(createStudent(formData))
          .unwrap()
          .then((res) => {
            if(CheckErrorField(res.data)){
              toast.error(res.data[0].msg);
            }else{
              setFormData(initalState);
              setSelectedImage(null);
              props.reFresh()
            }
          })
          .catch((err: any) => {})
  );

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gender = (event.target as HTMLInputElement).value;
    setFormData((pre) => ({ ...pre, gender: gender }));
  };
  const handleChangeMajor = (event: SelectChangeEvent) => {
    setFormData((pre) => ({ ...pre, major: event.target.value }));
  };
  const imageChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
      setFormData((pre) => ({ ...pre, avatar: event.target.files[0] }));
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage(null);
    setFormData((pre) => ({ ...pre, avatar:'' }));
  };

  return (
    
    <div className="border-4 border-blue-900 p-10 rounded-xl">
      <p className="text-center font-bold">Biễu mẫu nhập dữ liệu sinh viên</p>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Họ tên
          </label>
          <input
             {...register("name")}
            type="text"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Name"
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
        {errors?.name && <p className="text-red-500">{errors.name.message}</p>}

        <div className="flex flex-row items-center gap-10">
          <div className="flex items-center gap-12">
            <div className="mb-6">
              <label
                htmlFor="birthday"
                className={`mb-2 block text-sm font-medium  dark:text-gray-300`}
              >
                Ngày sinh
              </label>
              <input
                {...register("birthday")}
                type="datetime-local"
                id="birthday"
                className={`block w-56 rounded-lg border  p-2.5 text-sm focus:outline-none `}
                placeholder="Title"
                value={formData.birthday}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    birthday: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>Chuyên ngành</InputLabel>
            <Select
              id="major"
              value={formData.major as unknown as string}
              label="Chuyên ngành"
              onChange={handleChangeMajor}
            >
              {majors.map((row) => (
                <MenuItem value={row.ID}>{row.NAME}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {errors?.birthday && <p className="text-red-500">{errors.birthday.message}</p>}

        <div className="flex flex-row items-center gap-10 ">
          <FormControl>
            <FormLabel>Giới tính</FormLabel>
            <RadioGroup
              value={formData.gender}
              onChange={handleChangeGender}
              name="gender"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel value="0" control={<Radio />} label="Nam" />
              <FormControlLabel value="1" control={<Radio />} label="Nữ" />
            </RadioGroup>
          </FormControl>

          <div className="mt-6">
            <div className="flex items-center gap-12">
              {selectedImage !== null ? (
                <div className="relative my-6">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                    className="w-64 h-40"
                  />
                  <button
                    className="absolute top-0 right-10 rounded-full bg-red-500 p-2 text-slate-50"
                    onClick={removeSelectedImage}
                  >
                    Xóa
                  </button>
                </div>
              ) : null}
              <label
                htmlFor="avatar"
                className=" h-10 w-40 rounded-full bg-blue-900 p-2 text-slate-50"
              >
                Chọn ảnh đại diện
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(event) => imageChange(event)}
              />
           
            </div>
          </div>
        </div>
        {errors?.avatar && <p className="text-red-500">{errors.avatar.message}</p>}

        <div className="mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            style={{ display: "block", margin: "0 auto" }}
          >
            <span className="p-2">Thêm sinh viên</span>
          </button>
        </div>
      </form>
    </div>
  );
};
