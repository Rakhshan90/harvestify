import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, fetchUsersAction } from '../../redux/slices/users/usersSlices';


const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usersData = useSelector(store => store?.users);
    const { loading, appErr, serverErr, userList, deletedUser } = usersData;

    useEffect(() => {
        dispatch(fetchUsersAction());
    }, [dispatch, deletedUser])

    const users = useSelector(store => store?.users);
    const { userAuth } = users;

    return (
        <div className='min-h-screen mx-auto p-6 md:p-12 dark:bg-slate-800'>
            <div className="flex flex-col space-y-12">
                {/* display error if any */}
                {appErr || serverErr ? (
                    <div className='text-red-500'> {appErr} {serverErr} </div>
                ) : null}
                {/* table for displaying list of users */}
                <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th className='px-6 py-3'>User</th>
                                <th className='px-6 py-3'>Email</th>
                                <th className='px-6 py-3'>Phone</th>
                                <th className='px-6 py-3'>location</th>
                                <th className='px-6 py-3'>Gender</th>
                                <th className='px-6 py-3'>User type</th>
                                {userAuth?.isAdmin && <th className='px-6 py-3'>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {userList?.length <= 0 ? (
                                <div className='text-2xl text-red-500'>No users found</div>
                            ) : userList?.map(user => (
                                <tr key={user?._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <td className='px-6 py-4'>{`${user?.firstName} ${user?.lastName}`}</td>
                                    <td className='px-6 py-4'>{user?.email}</td>
                                    <td className='px-6 py-4'>{user?.phone}</td>
                                    <td className='px-6 py-4'>{user?.location}</td>
                                    <td className='px-6 py-4'>{user?.gender}</td>
                                    <td className='px-6 py-4'>{user?.user_type}</td>
                                    {userAuth?.isAdmin && <td className='px-6 py-4 space-x-4'>
                                        <button
                                            onClick={() => dispatch(deleteUserAction(user?._id))}
                                            className='bg-red-500 text-white font-medium text-sm px-6 py-3 rounded-lg'>
                                            Delete
                                        </button>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList