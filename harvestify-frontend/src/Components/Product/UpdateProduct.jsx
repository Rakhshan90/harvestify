import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { fetchProductAction, updateProductAction } from '../../redux/slices/products/productSlices';


const formSchema = Yup.object({
    product_name: Yup.string().required('Product title is required'),
    price: Yup.string().required('Product price is required'),
    description: Yup.string().required('Product description is required'),
    quantity: Yup.string().required('Product quantity is required'),
    isActive: Yup.boolean().required('Product status is required')
});

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    useEffect(() => {
        dispatch(fetchProductAction(id));
    }, [dispatch, id]);

    const productDetails = useSelector(store => store?.products);
    const { product } = productDetails;
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            product_name: product?.product_name,
            price: product?.price,
            description: product?.description,
            quantity: product?.quantity,
            isActive: product?.isActive,
        },
        onSubmit: (values) => {
            const data = {
                product_name: values?.product_name,
                price: values?.price,
                description: values?.description,
                quantity: values?.quantity,
                isActive: values?.isActive,
                id,
            }
            dispatch(updateProductAction(data));
        },
        validationSchema: formSchema,
    });

    const updatedProductDetails = useSelector(store => store?.products);
    const { loading, appErr, serverErr, updatedProduct, isUpdated } = updatedProductDetails;
    if (isUpdated) navigate('/products');
    return (
        <div className="min-h-screen dark:bg-slate-800 dark:text-white">
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-8">
                <h1 className="text-4xl font-bold text-left md:text-center">Update Product</h1>
                {/* display error if any */}
                {appErr || serverErr ? (
                    <div className='text-red-500'>{appErr}{serverErr}</div>
                ) : null}
                <form onSubmit={formik.handleSubmit}
                    className='flex flex-col flex-wrap space-y-3 w-full px-6 pb-6 md:px-4'>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="title" className="block text-sm font-medium">Product Title</label>
                        <input
                            value={formik.values.product_name}
                            onChange={formik.handleChange('product_name')}
                            onBlur={formik.handleBlur('product_name')}
                            type="text" id='title' name='title'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"/>
                        {formik.touched.product_name && formik.errors.product_name && (
                            <div className="text-red-500 mb-4 mt-1">
                                {formik.errors.product_name}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="price" className="block text-sm font-medium">Price</label>
                        <input
                            value={formik.values.price}
                            onChange={formik.handleChange('price')}
                            onBlur={formik.handleBlur('price')}
                            type="number" id='price' name='price'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.price && formik.errors.price && (
                            <div className="text-red-500 mb-4 mt-1">
                                {formik.errors.price}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <input
                            value={formik.values.description}
                            onChange={formik.handleChange('description')}
                            onBlur={formik.handleBlur('description')}
                            type="text" id='description' name='description'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 mb-4 mt-1">
                                {formik.errors.description}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
                        <input
                            value={formik.values.quantity}
                            onChange={formik.handleChange('quantity')}
                            onBlur={formik.handleBlur('quantity')}
                            type="text" id='quantity' name='quantity'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.quantity && formik.errors.quantity && (
                            <div className="text-red-500 mb-4 mt-1">
                                {formik.errors.quantity}
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <label htmlFor="isAgreed" className="block text-sm font-medium">Check if your product is active?</label>
                        <input
                            checked={formik.values.isActive}
                            onChange={formik.handleChange('isActive')}
                            id='status'
                            name='status'
                            type="checkbox"
                            className="w-4 outline-none border border-gray-100 mb-1" />
                        {formik.touched.isActive && formik.errors.isActive && (
                            <div className="text-red-500 mb-4 mt-1">
                                {formik.errors.isActive}
                            </div>
                        )}
                    </div>


                    {loading ? (
                        <button
                            disabled
                            className='bg-teal-500 text-white px-8 py-3 font-medium text-xl rounded-full'>
                            Loading, please wait a minute...
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='bg-teal-500 text-white px-8 py-3 font-medium text-xl rounded-full'>
                            Update
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct