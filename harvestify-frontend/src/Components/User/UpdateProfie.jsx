import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { userUpdateProfileAction } from "../../redux/slices/users/usersSlices";

// form schema 
const formSchema = Yup.object({
  firstName: Yup.string().required('first name is required'),
  lastName: Yup.string().required('last name is required'),
  email: Yup.string().required('email is required'),
  phone: Yup.string().required('phone is required'),
  gender: Yup.string().required('gender is required'),
  location: Yup.string().required('location is required'),
})


const UpdateProfile = () => {

  const dispatch = useDispatch();
  const userData = useSelector(store => store?.users);
  const {userAuth} = userData;
  const formik = useFormik({
    initialValues: {
      firstName: userAuth?.firstName,
      lastName: userAuth?.lastName,
      email: userAuth?.email,
      phone: userAuth?.phone,
      gender: userAuth?.gender,
      location: userAuth?.location,
    },
    onSubmit: (values) => {
      dispatch(userUpdateProfileAction(values));
    },
    validationSchema: formSchema,
    enableReinitialize: true,
  });

  // select user registered data from redux store
  const user = useSelector(store => store?.users)
  const {loading, appErr, serverErr, isProfileUpdated} = user;

  // navigate 
  const navigate = useNavigate();
  if(isProfileUpdated) navigate('/');

  return (
    <div className="flex flex-wrap min-h-screen dark:bg-slate-800 dark:text-white">
      <div className="w-full p-4">
        <div className="flex flex-col justify-center max-w-md mx-auto h-full py-12">
          <form onSubmit={formik.handleSubmit}>
            <h1 className="text-3xl font-bold font-heading mb-4">Update Your Profile</h1>
            {/* display error */}
            {appErr || serverErr ? (<div className="text-red-500">
              {appErr} {serverErr} 
            </div>) : null}
    
            {/* First name */}
            <label className="block text-sm font-medium mb-2">Firstname</label>
            <input
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
              dark:border-none dark:placeholder:text-slate-100"
              placeholder="Enter your firstname"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.firstName}
              </div>
            )}

            {/* Last Name */}
            <label className="block text-sm font-medium mb-2">Lastname</label>
            <input
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
              dark:border-none dark:placeholder:text-slate-100"
              placeholder="Enter your lastname"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.lastName}
              </div>
            )}


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

            {/* Phone */}
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="phone"
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
              dark:border-none dark:placeholder:text-slate-100"
              placeholder="Phone number"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.phone}
              </div>
            )}


            {/* location */}
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={formik.values.location}
              onChange={formik.handleChange('location')}
              onBlur={formik.handleBlur('location')}
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
              dark:border-none dark:placeholder:text-slate-100"
              placeholder="Your location"
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.location}
              </div>
            )}

            {/* Gender */}
            <label className="block text-sm font-medium mb-2">Gender</label>
            <input
              type="text"
              value={formik.values.gender}
              onChange={formik.handleChange('gender')}
              onBlur={formik.handleBlur('gender')}
              className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
              dark:border-none dark:placeholder:text-slate-100"
              placeholder="Your gender"
            />
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500 mb-4 mt-1">
                {formik.errors.gender}
              </div>
            )}

            {loading? (
              <button
              disabled
              className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-teal-500 w-full text-center border border-teal-600 shadow hover:bg-teal-600 focus:ring focus:ring-teal-200 transition duration-200 my-4"
              type="submit"
            >
              Loading
            </button>
            ) : (
              <button
              className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-teal-500 w-full text-center border border-teal-600 shadow hover:bg-teal-600 focus:ring focus:ring-teal-200 transition duration-200 my-4"
              type="submit"
            >
              Update
            </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;