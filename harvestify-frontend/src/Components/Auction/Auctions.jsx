import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteAuctionAction, fetchAuctionsAction } from '../../redux/slices/auctions/auctionSlices';
import { fetchProductsAction } from '../../redux/slices/products/productSlices';
import DateFormatter from '../../util/DateFormatter';
import AuctionsSkeleton from '../Skeletons/AuctionsSkeleton';
import { RiShareBoxLine } from "react-icons/ri";


const Auctions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auctionsData = useSelector(store => store?.auctions);
    const { loading, appErr, serverErr, auctions, deletedAuction } = auctionsData;

    const user = useSelector(store => store?.users);
    const { userAuth } = user;

    useEffect(() => {
        dispatch(fetchAuctionsAction());
    }, [dispatch, deletedAuction]);

    return (
        <div className='min-h-screen max-w-screen mx-auto p-6 md:p-12 dark:bg-slate-800'>
            <div className="flex flex-col space-y-12">
                {/* display error if any */}
                {loading ? (
                    <>
                        <AuctionsSkeleton />
                        <AuctionsSkeleton />
                        <AuctionsSkeleton />
                        <AuctionsSkeleton />
                        <AuctionsSkeleton />
                        <AuctionsSkeleton />
                        <AuctionsSkeleton />
                        <AuctionsSkeleton />
                    </>
                ) : appErr || serverErr ? (
                    <div className='text-red-500'> {appErr} {serverErr} </div>
                ) : null}
                {/* item 2 - table for displaying all the auctions */}
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th className='px-6 py-3'></th>
                                <th className='pr-6 py-3'>Product</th>
                                <th className='px-6 py-3'>Starting Price</th>
                                <th className='px-6 py-3'>Star Time</th>
                                <th className='px-6 py-3'>End Time</th>
                                <th className='px-6 py-3'>Current Bid</th>
                                <th className='px-6 py-3'>Winnder</th>
                                <th className='px-6 py-3'>isActive</th>
                                <th className='px-6 py-3'>Location</th>
                                <th className='px-6 py-3'>Category</th>
                                {userAuth?.isAdmin && <th className='px-6 py-3'>Action</th>}
                            </tr>
                        </thead>
                        <tbody className='w-full text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            {auctions?.length <= 0 ? (
                                <div className='text-2xl text-red-500'>No auctions found</div>
                            ) : auctions?.map(auction => (
                                <tr onClick={() => navigate(`/auction/${auction?._id}`)} key={auction?._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer'>
                                    <td className='px-4 py-4'>
                                        <RiShareBoxLine />
                                    </td>
                                    <td className='pr-6 py-4'>{auction?.product?.product_name}</td>
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
                                            <div
                                                className='bg-teal-500 text-white font-medium text-center text-sm px-2 py-1 rounded-lg'>
                                                Live
                                            </div>
                                        ) : (
                                            <div
                                                className='bg-red-500 text-white font-medium text-center text-sm px-2 py-1 rounded-lg'>
                                                Closed
                                            </div>
                                        )}
                                    </td>
                                    <td className='px-6 py-4'>{auction?.location}</td>
                                    <td className='px-6 py-4'>{auction?.category}</td>
                                    {userAuth?.isAdmin && <td className='px-6 py-4'>
                                        <button
                                            onClick={() => dispatch(deleteAuctionAction(auction?._id))}
                                            className='bg-red-500 text-white font-medium text-sm px-6 py-3 rounded-lg'>
                                            Delete
                                        </button>
                                    </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Auctions