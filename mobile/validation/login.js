import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
 email: yup.string().required('Email không thể để trống'),
 password: yup.string().required('Mật khẩu không thể để trống'),

})