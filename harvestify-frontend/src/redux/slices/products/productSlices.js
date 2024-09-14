import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../../util/baseUrl";
import axios from 'axios';


// reset actions to redirect
const resetCreateProductAction = createAction('products/create-reset');
const resetUpdateProductAction = createAction('products/update-reset');
const resetDeleteProductAction = createAction('products/delete-reset');

// create product action
export const createProductAction = createAsyncThunk('products/create',
    async (product, {rejectWithValue, getState, dispatch}) => {
        const user = getState()?.users;
        const {userAuth} = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            // form data
            const formData = new FormData();
            formData.append('product_name', product?.product_name);
            formData.append('price', product?.price);
            formData.append('description', product?.description);
            formData.append('quantity', product?.quantity);
            formData.append('isActive', product?.isActive);
            formData.append('image', product?.image);
            const {data} = await axios.post(`${baseUrl}/api/products/create`, formData, config);
            // dipatch reset create product action to redirect and navigate again to create product page
            dispatch(resetCreateProductAction());
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// fetch products action
export const fetchProductsAction = createAsyncThunk('products/fetchProducts',
    async (products, {rejectWithValue, getState, dispatch}) => {
        // config
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const {data} = await axios.get(`${baseUrl}/api/products`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// fetch single product action
export const fetchProductAction = createAsyncThunk('products/fetchProduct',
    async (id, {rejectWithValue, getState, dispatch}) => {
        // config
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const {data} = await axios.get(`${baseUrl}/api/products/${id}`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// update product action
export const updateProductAction = createAsyncThunk('products/update',
    async (product, {rejectWithValue, getState, dispatch}) => {
        const user = getState()?.users;
        const {userAuth} = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const {data} = await axios.put(`${baseUrl}/api/products/${product?.id}`, product, config);
            // dispatch update reset action to redirect
            dispatch(resetUpdateProductAction());
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// delete product action
export const deleteProductAction = createAsyncThunk('products/delete',
    async (id, {rejectWithValue, getState, dispatch}) => {
        const user = getState()?.users;
        const {userAuth} = user;
        // config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const {data} = await axios.delete(`${baseUrl}/api/products/${id}`, config);
            // dispatch delete reset action to redirect
            dispatch(resetDeleteProductAction());
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// product slices
const productSlices = createSlice({
    name: 'products',
    initialState: {},
    extraReducers: (builder)=>{
        // create product
        builder.addCase(createProductAction.pending, (state, action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetCreateProductAction, (state, action)=>{
            state.isCreated = true;
        });
        builder.addCase(createProductAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.product = action?.payload;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createProductAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // fetch all the product
        builder.addCase(fetchProductsAction.pending, (state, action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchProductsAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.products = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchProductsAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // fetch single product detail
        builder.addCase(fetchProductAction.pending, (state, action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchProductAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.product = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchProductAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // update product
        builder.addCase(updateProductAction.pending, (state, action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetUpdateProductAction, (state, action)=>{
            state.isUpdated = true;
        });
        builder.addCase(updateProductAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.updatedProduct = action?.payload;
            state.isUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateProductAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // delete product
        builder.addCase(deleteProductAction.pending, (state, action)=>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetDeleteProductAction, (state, action)=>{
            state.isDeleted = true;
        })
        builder.addCase(deleteProductAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.deletedProduct = action?.payload;
            state.isDeleted = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteProductAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default productSlices.reducer;