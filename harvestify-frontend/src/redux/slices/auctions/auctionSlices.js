import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";


// reset auction actions to redirect
const resetCreateAuctionAction = createAction('auctions/reset-create');


// fetch all auctions action
export const fetchAuctionsAction = createAsyncThunk('auctions/fetchAuctions',
    async (query, { rejectWithValue, getState, dispatch }) => {
        // const {location, category} = query;
        // config 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.get(`${baseUrl}/api/auctions`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// create auctions action
export const createAuctionAction = createAsyncThunk('auctions/create',
    async (auction, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // config 
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/auctions/create`, auction, config);
            // dispatch reset create auction action to redirect
            dispatch(resetCreateAuctionAction());
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// fetch single auction details action
export const fetchAuctionAction = createAsyncThunk('auctions/fetchAuction',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const { data } = await axios.get(`${baseUrl}/api/auctions/${id}`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// fetch bids on auction action
export const fetchBidsAction = createAsyncThunk('auctions/fetchBids',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState().users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.get(`${baseUrl}/api/auctions/bids/${id}`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if(!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// place bid on auction action
export const placeBidAction = createAsyncThunk('auctions/placeBid',
    async (bid, { rejectWithValue, getState, dispatch }) => {
        const user = getState().users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.post(`${baseUrl}/api/auctions/place/bid`, bid, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// delete auction action
export const deleteAuctionAction = createAsyncThunk('auctions/delete',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const user = getState().users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.delete(`${baseUrl}/api/auctions/delete/${id}`, config);
            return data;
        } catch (error) {
            // frontend error if any
            if (!error?.response) throw error;
            // server error
            else return rejectWithValue(error?.response?.data);
        }
    });

// auction slices
const auctionSlices = createSlice({
    name: 'auctions',
    initialState: {},
    extraReducers: (builder) => {
        // fetch auctions
        builder.addCase(fetchAuctionsAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchAuctionsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.auctions = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchAuctionsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // create auction
        builder.addCase(createAuctionAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetCreateAuctionAction(), (state, action) => {
            state.isCreated = true;
        })
        builder.addCase(createAuctionAction.fulfilled, (state, action) => {
            state.loading = false;
            state.auction = action?.payload;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createAuctionAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // fetch single auction
        builder.addCase(fetchAuctionAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchAuctionAction.fulfilled, (state, action) => {
            state.loading = false;
            state.singleAuction = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchAuctionAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // fetch bids on auction
        builder.addCase(fetchBidsAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchBidsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.bids = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchBidsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // place bid on auction
        builder.addCase(placeBidAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(placeBidAction.fulfilled, (state, action) => {
            state.loading = false;
            state.bid = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(placeBidAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        // delete auction
        builder.addCase(deleteAuctionAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteAuctionAction.fulfilled, (state, action) => {
            state.loading = false;
            state.deletedAuction = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteAuctionAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

    }
})

export default auctionSlices.reducer;