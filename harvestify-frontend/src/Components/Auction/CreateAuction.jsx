import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { createAuctionAction } from '../../redux/slices/auctions/auctionSlices';
import { fetchProductAction } from '../../redux/slices/products/productSlices';


const formSchema = Yup.object({
    product: Yup.string().required('Product Id is required'),
    startingPrice: Yup.string().required('Starting price of the product is required'),
    startTime: Yup.string().required('Start time of the product is required'),
    endTime: Yup.string().required('End time of the product is required'),
    location: Yup.string().required('Location of the product is required'),
    category: Yup.string().required('Category of the product is required'),
});

const CreateAuction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    useEffect(()=>{
        dispatch(fetchProductAction(id));
    }, [dispatch])
    const productData = useSelector(store => store?.products);
    const {product} = productData;
    const formik = useFormik({
        initialValues: {
            product: id,
            startingPrice: product?.price,
            startTime: '',
            endTime: '',
            location: product?.owner?.location,
            category: '',
        },
        onSubmit: (values) => {
            dispatch(createAuctionAction(values));
        },
        validationSchema: formSchema,
        enableReinitialize: true,
    })

    const auctionData = useSelector(store => store?.auctions);
    const { loading, appErr, serverErr, isCreated } = auctionData;
    if(isCreated) navigate('/auctions')

    return (
        <div className="min-h-screen dark:bg-slate-800 dark:text-white">
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-8">
                <h1 className="text-4xl font-bold text-left md:text-center">Create Auction</h1>
                {/* display error */}
                {appErr || serverErr ? (<div className="text-red-500">
                    {appErr} {serverErr}
                </div>) : null}
                <form onSubmit={formik.handleSubmit}
                    className='flex flex-col flex-wrap space-y-3 w-full px-6 pb-6 md:px-4'>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="productId" className="block text-sm font-medium">Product Id</label>
                        <input
                            value={formik.values.product}
                            onChange={formik.handleChange('product')}
                            onBlur={formik.handleBlur('product')}
                            type="text" id='productId' name='productId' placeholder='Enter product id'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"/>
                        {formik.touched.product && formik.errors.product && (
                            <div className="text-red-500 mb-4 mt-1">{formik.errors.product}</div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="price" className="block text-sm font-medium">Starting Price</label>
                        <input
                            value={formik.values.startingPrice}
                            onChange={formik.handleChange('startingPrice')}
                            onBlur={formik.handleBlur('startingPrice')}
                            type="number" id='price' name='price' placeholder='Enter starting price of auction'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.startingPrice && formik.errors.startingPrice && (
                            <div className="text-red-500 mb-4 mt-1">{formik.errors.startingPrice}</div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="startTime" className="block text-sm font-medium">Start Time</label>
                        <input
                            value={formik.values.startTime}
                            onChange={formik.handleChange('startTime')}
                            onBlur={formik.handleBlur('startTime')}
                            type="datetime-local" id='startTime' name='startTime'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.startTime && formik.errors.startTime && (
                            <div className="text-red-500 mb-4 mt-1">{formik.errors.startTime}</div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="endTime" className="block text-sm font-medium">End Time</label>
                        <input
                            value={formik.values.endTime}
                            onChange={formik.handleChange('endTime')}
                            onBlur={formik.handleBlur('endTime')}
                            type="datetime-local" id='endTime' name='endTime'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.endTime && formik.errors.endTime && (
                            <div className="text-red-500 mb-4 mt-1">{formik.errors.endTime}</div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="location" className="block text-sm font-medium">Location</label>
                        <input
                            value={formik.values.location}
                            onChange={formik.handleChange('location')}
                            onBlur={formik.handleBlur('location')}
                            type="text" id='location' name='location' placeholder='Enter location of the auction'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.location && formik.errors.location && (
                            <div className="text-red-500 mb-4 mt-1">{formik.errors.location}</div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="category" className="block text-sm font-medium">Category</label>
                        <input
                            value={formik.values.category}
                            onChange={formik.handleChange('category')}
                            onBlur={formik.handleBlur('category')}
                            type="text" id='category' name='category' placeholder='Enter category of the auction'
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                        dark:border-none dark:placeholder:text-slate-100"  />
                        {formik.touched.category && formik.errors.category && (
                            <div className="text-red-500 mb-4 mt-1">{formik.errors.category}</div>
                        )}
                    </div>

                    {loading ? (
                        <button
                            disabled
                            className='bg-teal-500 text-white px-8 py-3 font-medium text-xl rounded-full'>
                            Loading, please a wait min...
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='bg-teal-500 text-white px-8 py-3 font-medium text-xl rounded-full'>
                            Create
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CreateAuction