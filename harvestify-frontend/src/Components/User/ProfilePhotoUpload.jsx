import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react'
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profilePhotoUploadAction } from '../../redux/slices/users/usersSlices';

//form schema 
const formSchema = Yup.object({
    image: Yup.string().required("Image is required"),
})

const ProfilePhotoUpload = () => {
    //dispatch 
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            image: "",
        },
        onSubmit: values => {
            dispatch(profilePhotoUploadAction(values));

        },
        validationSchema: formSchema,
    })
    //select profile data from store
    const users = useSelector(state => state.users);
    const { isUploaded, loading, appErr, serverErr } = users;

    //navigate 
    const navigate = useNavigate();
    if (isUploaded) {
        navigate(`/`)
    }
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                    Upload profile photo
                </h2>
                {/* Displya err here */}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Image container here thus Dropzone */}
                        {appErr || serverErr ? (<h1 className="text-center text-red-500">{appErr} {serverErr}</h1>) : null}
                        <div className="dropzone bg-gray-700">
                            <Dropzone
                                onBlur={formik.handleBlur("image")}
                                accept="image/jpeg, image/png"
                                onDrop={acceptedFiles => {
                                    formik.setFieldValue("image", acceptedFiles[0]);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div className="container">
                                        <div
                                            {...getRootProps({
                                                className: "dropzone",
                                                onDrop: event => event.stopPropagation(),
                                            })}
                                        >
                                            <input {...getInputProps()} />
                                            <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                                                Click here to select image
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        {/* <div className="text-red-500">
                            {formik.touched.image && formik.errors.image}
                        </div> */}
                        <p className="text-sm text-gray-500">
                            PNG, JPG, GIF minimum size 400kb uploaded only 1 image
                        </p>

                        <div>
                            {loading ? (<button
                                disabled
                                className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-800 bg-gray-400">
                                <span>Loading, Please wait...</span>
                            </button>) : (<button
                                type="submit"
                                className="inline-flex justify-center w-full px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                <span>Upload Photo</span>
                            </button>)}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfilePhotoUpload