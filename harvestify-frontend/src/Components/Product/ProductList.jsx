import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAction } from '../../redux/slices/products/productSlices'


const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productsData = useSelector(store => store?.products);
    const { loading, appErr, serverErr, products, isCreated } = productsData;

    useEffect(() => {
        dispatch(fetchProductsAction());
    }, [dispatch])

    if(isCreated) navigate('/auctions');


    return (
        <div className='min-h-screen mx-auto p-6 md:p-12 dark:bg-slate-800 dark:text-white'>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appErr || serverErr ? (
                    <div className='text-red-500'>{appErr} {serverErr}</div>
                ) : products?.length <= 0 ? (
                    <div className='text-red-500'>No products</div>
                ) : (products?.map(product => (
                    <div key={product?._id} className="flex flex-col rounded-xl">
                        {/* img */}
                        <div onClick={() => navigate(`/product/${product?._id}`)}
                            className='h-58 w-58'>
                            <img src={product?.image} alt="" className='h-full w-full rounded-t-xl 
                        bg-no-repeat bg-cover bg-center hover:scale-105 duration-300 cursor-pointer' />
                        </div>
                        {/* product title */}
                        <h2 className="text-lg font-medium text-left">{product?.product_name}</h2>
                        {/* product description */}
                        <p className="max-w-md text-sm text-gray-400 text-left">
                            {product?.description}
                        </p>
                        {/* product price */}
                        <h3 className="text-lg font-mediumtext-left">{product?.quantity}</h3>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default ProductList