import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { userResetPasswordAction } from "../../redux/slices/users/usersSlices";


// form schema
const formSchema = Yup.object({
    password: Yup.string().required('password is required'),
});

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.pathname.split('/')[2];

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: (values) => {
            const data = {
                password: values?.password,
                token,
            }
            dispatch(userResetPasswordAction(data));
        },
        validationSchema: formSchema,
    });

    const resetPasswordData = useSelector(store => store?.users);
    const { loading, appErr, serverErr, resetPassword } = resetPasswordData;
    if (resetPassword) navigate('/login');

    return (
        <div className="flex flex-wrap min-h-screen dark:bg-slate-800 dark:text-white">
            <div className="w-full  p-4">
                <div className="flex flex-col justify-center max-w-md mx-auto h-full py-12">
                    <form onSubmit={formik.handleSubmit}>
                        <h1 className="text-3xl font-bold font-heading mb-4">Reset Your Password</h1>
                        {/* display error */}
                        {appErr || serverErr ? (
                            <div className="text-red-500">{appErr} {serverErr} </div>
                        ) : null}

                        {/* Pssword */}
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <div className="flex items-center gap-1 w-full rounded-full p-4 border border-gray-100 shadow mb-3">
                            <input
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                className="outline-none flex-1 placeholder-gray-500 dark:bg-slate-800
                dark:border-none dark:placeholder:text-slate-100"
                                placeholder="Enter new password"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
                                    fill="#A3A3A3"
                                />
                                <path
                                    d="M12.0004 9.14C10.4304 9.14 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14 12.0004 9.14Z"
                                    fill="#A3A3A3"
                                />
                            </svg>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 mt-1">{formik.errors.password}</div>
                        )}
                        {loading ? (
                            <button
                                disabled
                                className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-teal-500 w-full text-center border border-teal-600 shadow hover:bg-teal-600 focus:ring focus:ring-teal-200 transition duration-200 my-4"
                                type="submit"
                            >
                                Loading, please wait a minute...
                            </button>
                        ) : (
                            <button
                                className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-teal-500 w-full text-center border border-teal-600 shadow hover:bg-teal-600 focus:ring focus:ring-teal-200 transition duration-200 my-4"
                                type="submit"
                            >
                                Reset password
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;