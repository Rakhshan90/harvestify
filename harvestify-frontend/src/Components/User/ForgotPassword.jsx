import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { userForgotPasswordAction } from "../../redux/slices/users/usersSlices";
import MyModal from "../../util/MyModal";

// form schema
const formSchema = Yup.object({
    email: Yup.string().required('email is required'),
});

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: (values) => {
            dispatch(userForgotPasswordAction(values));
        },
        validationSchema: formSchema,
    });

    const forgotPasswordData = useSelector(store => store?.users);
    const { loading, appErr, serverErr, forgotPassword } = forgotPasswordData;

    return (
        <div className="flex flex-wrap min-h-screen dark:bg-slate-800 dark:text-white">
            <div className="w-full  p-4">
                <div className="flex flex-col justify-center max-w-md mx-auto h-full py-12">
                    <form onSubmit={formik.handleSubmit}>
                        <h1 className="text-3xl font-bold font-heading mb-4">Forgot Your Password</h1>
                        {/* display error */}
                        {appErr || serverErr ? (
                            <div className="text-red-500">{appErr} {serverErr} </div>
                        ) : null}

                        {/* display confirmation modal */}
                        {forgotPassword && <MyModal />}

                        {/* Email */}
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
              dark:border-none dark:placeholder:text-slate-100"
                            placeholder="harvestify@email.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 mb-4 mt-1">
                                {formik.errors.email}
                            </div>
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
                                Forgot Password
                            </button>
                        )}

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;