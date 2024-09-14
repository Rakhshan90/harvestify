import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseUrl } from "../../../util/baseUrl";

// reset update action to redirect
const resetUpdatePasswordAction = createAction('users/reset-update-password');
const resetUpdateProfileAction = createAction('users/reset-update-profile');
const resetUpdateProfilePhotoAction = createAction('users/reset-update-profile-photo');

// Register action
export const userRegisterAction = createAsyncThunk('users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/register`, user, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// Login action
export const userLoginAction = createAsyncThunk('users/login',
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/login`, user, config);
            //save user into local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });
// Logout action
export const userLogoutAction = createAsyncThunk('users/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo');
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// update password action
export const userUpdatePasswordAction = createAsyncThunk('users/update-password',
    async (password, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/update/password`, password, config);
            dispatch(resetUpdatePasswordAction());
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// forgot password action
export const userForgotPasswordAction = createAsyncThunk('users/forgot-password',
    async (email, { rejectWithValue, getState, dispatch }) => {
        // config
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/forgot-password`, email, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// reset password action
export const userResetPasswordAction = createAsyncThunk('users/reset-password',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        // config
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/reset-password`, payload, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// update user profile action
export const userUpdateProfileAction = createAsyncThunk('users/update-profile',
    async (profile, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/update`, profile, config);
            dispatch(resetUpdateProfileAction());
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// fetch list of users action
export const fetchUsersAction = createAsyncThunk('users/fetch-users',
    async (users, { rejectWithValue, getState, dispatch }) => {
        // config
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        try {
            const { data } = await axios.get(`${baseUrl}/api/users`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// delete user action
export const deleteUserAction = createAsyncThunk('users/delete-user',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            const { data } = await axios.delete(`${baseUrl}/api/users/delete/${id}`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// profile photo upload action
export const profilePhotoUploadAction = createAsyncThunk('users/photo-upload',
    async (userImg, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            // form data
            const formData = new FormData();
            formData.append('image', userImg?.image)
            const { data } = await axios.put(`${baseUrl}/api/users/photo-upload`, formData, config);
            dispatch(resetUpdateProfilePhotoAction());
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });


// get user from local storage and place it into redux store
const userLoginFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// User slices
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: userLoginFormStorage,
    },
    // redux's object method
    extraReducers: (builder) => {
        // Register
        builder.addCase(userRegisterAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userRegisterAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userRegisterAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // Login
        builder.addCase(userLoginAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLoginAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLoginAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // Logout
        builder.addCase(userLogoutAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLogoutAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = undefined;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userLogoutAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // update password
        builder.addCase(userUpdatePasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetUpdatePasswordAction, (state, action) => {
            state.isPasswordUpdated = true;
        })
        builder.addCase(userUpdatePasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.updatedPassword = action?.payload;
            state.isPasswordUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userUpdatePasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // forgot password
        builder.addCase(userForgotPasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userForgotPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.forgotPassword = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userForgotPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // reset password
        builder.addCase(userResetPasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userResetPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.resetPassword = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userResetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // update user profile 
        builder.addCase(userUpdateProfileAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetUpdateProfileAction, (state, action)=>{
            state.isProfileUpdated = true;
        });
        builder.addCase(userUpdateProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action?.payload;
            state.isProfileUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(userUpdateProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // fetch users 
        builder.addCase(fetchUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUsersAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // delete user 
        builder.addCase(deleteUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.deletedUser = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // profile photo upload 
        builder.addCase(profilePhotoUploadAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetUpdateProfilePhotoAction, (state, action)=>{
            state.isUploaded = true;
        });
        builder.addCase(profilePhotoUploadAction.fulfilled, (state, action) => {
            state.loading = false;
            state.updatedUser = action?.payload;
            state.isUploaded = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(profilePhotoUploadAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default usersSlices.reducer;