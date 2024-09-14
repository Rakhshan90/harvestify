import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { fetchAuctionAction, fetchBidsAction, placeBidAction } from '../../redux/slices/auctions/auctionSlices';
import DateFormatter from '../../util/DateFormatter';
import { Scrollbars } from 'react-custom-scrollbars';

// form schema
const formSchema = Yup.object({
    auctionId: Yup.string().required('Auction Id is required'),
    bidAmount: Yup.string().required('Bid Amount is required'),
})

const Auction = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    useEffect(() => {
        dispatch(fetchAuctionAction(id));
    }, [dispatch]);

    const auction = useSelector(store => store?.auctions);
    const { loading, appErr, serverErr, singleAuction, bids, bid } = auction;

    const user = useSelector(store => store?.users);
    const { userAuth } = user;

    useEffect(() => {
        dispatch(fetchBidsAction(id));
    }, [dispatch, bid]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            auctionId: id,
            bidAmount: '',
        },
        onSubmit: (values) => {
            dispatch(placeBidAction(values));
        },
        validationSchema: formSchema
    })


    return (
        <div className='min-h-screen p-6 md:p-12 mx-auto dark:bg-slate-800'>
            <div className="flex flex-col space-y-6 items-center md:flex-row md:space-y-0 md:space-x-6">
                {/* item 1 - auction details */}
                <div className="flex flex-col space-y-3 md:w-1/2 p-4 md:p-8 border border-gray-700 rounded-lg">
                    <h1 className="text-3xl font-bold font-heading mb-4 dark:text-white">Auction details</h1>
                    {/* display error if any */}
                    {appErr || serverErr ? (
                        <div className='text-red-500'>{appErr} {serverErr}</div>
                    ) : null}
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            Product
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">{singleAuction?.product?.product_name}</p>
                    </div>
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            Starting price
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">{singleAuction?.startingPrice}</p>
                    </div>
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            starting time
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">
                            <DateFormatter date={singleAuction?.startTime} />
                        </p>
                    </div>
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            end time
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">
                            <DateFormatter date={singleAuction?.endTime} />
                        </p>
                    </div>
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            Winner
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">{singleAuction?.winner?.firstName}</p>
                    </div>
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            current bid
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">{singleAuction?.currentBid}</p>
                    </div>
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            location
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">{singleAuction?.location}</p>
                    </div>
                    <div className="flex justify-between px-5 py-2 bg-gray-50 
                text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {/* property */}
                        <h5 className="text-md uppercase font-bold text-center md:text-left">
                            category
                        </h5>
                        {/* value */}
                        <p className="sm text-center md:text-left">{singleAuction?.category}</p>
                    </div>
                </div>

                {/* item 2 - all bid details and place bid container */}
                <div className="flex flex-col space-y-12 md:w-1/2">
                    {/* all bid details */}
                    <div className="flex flex-col space-y-3">
                        <h1 className="text-3xl font-bold font-heading mb-4 dark:text-white">Bids</h1>
                        <Scrollbars style={{ height: 150 }}>
                            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    <tr>
                                        <th className='px-6 py-3'>amount</th>
                                        <th className='px-6 py-3'>Placed by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bids?.length <= 0 ? (
                                        <div className='text-red-500 text-left pt-4 pl-1'>No bids found</div>
                                    ) : bids?.map(bid => (
                                        <tr key={bid?._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <td className='px-6 py-4'>{bid?.amount}</td>
                                            <td className='px-6 py-4'>{bid?.placedBy?.firstName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Scrollbars>
                    </div>

                    {/* place bid */}
                    <form onSubmit={formik.handleSubmit} className='md:w-1/2 dark:text-white'>
                        <h1 className="text-3xl font-bold font-heading mb-4">Place Your Bid</h1>
                        <label htmlFor='auctionId' className="block text-sm font-medium mb-2">Auction Id</label>
                        <input
                            value={formik.values.auctionId}
                            onChange={formik.handleChange('auctionId')}
                            onBlur={formik.handleBlur('auctionId')}
                            type="auctionId"
                            id="auctionId"
                            // {...formik.getFieldProps("email")}
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                            dark:border-none dark:placeholder:text-slate-100"
                            placeholder="Enter Auction Id"
                        />
                        {/* {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 mb-4 mt-1">
                            {formik.errors.email}
                        </div>)} */}
                        <label htmlFor='amount' className="block text-sm font-medium mb-2">Bid amount</label>
                        <input
                            value={formik.values.bidAmount}
                            onChange={formik.handleChange('bidAmount')}
                            onBlur={formik.handleBlur('bidAmount')}
                            type="number"
                            id="amount"
                            // {...formik.getFieldProps("email")}
                            className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-teal-200 transition duration-200 mb-1 dark:bg-slate-600
                            dark:border-none dark:placeholder:text-slate-100"
                            placeholder="Enter Bid amount"
                        />
                        {/* {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 mb-4 mt-1">
                            {formik.errors.email}
                        </div>)} */}

                        {userAuth?.user_type === 'Buyer' &&
                            <button
                                className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-teal-500 w-full text-center border border-teal-600 shadow hover:bg-teal-600 focus:ring focus:ring-teal-200 transition duration-200 my-6"
                                type="submit"
                            >
                                Place Bid
                            </button>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auction