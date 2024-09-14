import { configureStore } from "@reduxjs/toolkit";
import users from '../slices/users/usersSlices';
import products from '../slices/products/productSlices';
import auctions from '../slices/auctions/auctionSlices';

const store = configureStore({
    reducer: {
        users,
        products,
        auctions,
    }
});

export default store;