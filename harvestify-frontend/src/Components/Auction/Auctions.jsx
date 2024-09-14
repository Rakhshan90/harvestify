import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteAuctionAction, fetchAuctionsAction } from '../../redux/slices/auctions/auctionSlices';
import { fetchProductsAction } from '../../redux/slices/products/productSlices';
import DateFormatter from '../../util/DateFormatter';


const Auctions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auctionsData = useSelector(store => store?.auctions);
    const { loading, appErr, serverErr, auctions, deletedAuction } = auctionsData;
    useEffect(() => {
        dispatch(fetchAuctionsAction());
    }, [dispatch, deletedAuction]);

    return (
        <div className='min-h-screen mx-auto p-6 md:p-12 dark:bg-slate-800'>
            <div className="flex flex-col space-y-12">
                {/* item 1 - location and category container */}
                {/* <div className="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0"> */}
                {/* location */}
                {/* <select
                        name="location" id="location"
                        className='px-6 py-3 rounded-lg text-bold bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                        <option
                            value="location">Location</option>
                        <option
                            value="lucknow">Lucknow</option>
                        <option
                            value="kanpur">Kanpur</option>
                    </select> */}

                {/* category */}
                {/* <select
                        name="category" id="category"
                        className='px-6 py-3 rounded-lg text-bold bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                        <option value="category">Category</option>
                        <option value="grains">Grains</option>
                        <option value="vegetables">Vegetables</option>
                    </select> */}
                {/* </div> */}
                {/* display error if any */}
                {appErr || serverErr ? (
                    <div className='text-red-500'> {appErr} {serverErr} </div>
                ) : null}
                {/* item 2 - table for displaying all the auctions */}
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th className='px-6 py-3'>Product</th>
                            <th className='px-6 py-3'>Starting Price</th>
                            <th className='px-6 py-3'>Star Time</th>
                            <th className='px-6 py-3'>End Time</th>
                            <th className='px-6 py-3'>Current Bid</th>
                            <th className='px-6 py-3'>Winnder</th>
                            <th className='px-6 py-3'>isActive</th>
                            <th className='px-6 py-3'>Action</th>
                            <th className='px-6 py-3'>Location</th>
                            <th className='px-6 py-3'>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auctions?.length <= 0 ? (
                            <div className='text-2xl text-red-500'>No auctions found</div>
                        ) : auctions?.map(auction => (
                            <tr key={auction?._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td className='px-6 py-4'>{auction?.product?.product_name}</td>
                                <td className='px-6 py-4'>{auction?.startingPrice}</td>
                                <td className='px-6 py-4'>
                                    <DateFormatter date={auction?.startTime} />
                                </td>
                                <td className='px-6 py-4'>
                                    <DateFormatter date={auction?.endTime} />
                                </td>
                                <td className='px-6 py-4'>{auction?.currentBid}</td>
                                <td className='px-6 py-4'>{auction?.winner?.firstName}</td>
                                <td className='px-6 py-4'>
                                    {auction?.isActive ? (
                                        <button
                                            onClick={() => navigate(`/auction/${auction?._id}`)}
                                            className='bg-teal-500 text-white font-medium text-sm px-8 py-3 rounded-lg'>
                                            Open
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate(`/auction/${auction?._id}`)}
                                            className='bg-red-500 text-white font-medium text-sm px-6 py-3 rounded-lg'>
                                            Closed
                                        </button>
                                    )}
                                </td>
                                <td className='px-6 py-4'>
                                    <button
                                        onClick={() => dispatch(deleteAuctionAction(auction?._id))}
                                        className='bg-red-500 text-white font-medium text-sm px-6 py-3 rounded-lg'>
                                        Delete
                                    </button>
                                </td>
                                <td className='px-6 py-4'>{auction?.location}</td>
                                <td className='px-6 py-4'>{auction?.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Auctions