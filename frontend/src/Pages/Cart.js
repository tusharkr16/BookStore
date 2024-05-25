import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import { FaPlus, FaMinus } from "react-icons/fa";
import { SnackbarProvider, useSnackbar } from 'notistack';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchCartItems = async () => {
            const userInfoString = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString);
            if (!userInfo || !userInfo.token) {
                navigate('/login');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            try {
                const response = await axios.get('http://localhost:5004/cart/cart-items', config);
                setCartItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [navigate]);

    const handleRemove = async (itemId) => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString);
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
            await axios.delete(`http://localhost:5004/cart/${itemId}`, config);
            setCartItems(cartItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString);

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };

            const totalPrice = getTotalPrice() * 100;
            console.log(totalPrice);

            const res = await axios.post('http://localhost:5004/cart/payment', {
                items: cartItems.map(item => ({
                    id: item.productId._id,
                    name: item.productId.bookTitle,
                    quantity: item.quantity
                })),
                subTotal: totalPrice

            }, config);

            const data = res.data;
            console.log(data);
            await axios.delete('https://bookstore-9kvi.onrender.com/cart/cart-items', config);
            window.location = data.url;
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
    }

    const handleQuantityChange = async (itemId, newQty) => {
        const userInfoString = localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoString);

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        if (newQty < 1) {
            handleRemove(itemId);
            return;
        } else {
            setCartItems(cartItems.map(item =>
                item._id === itemId ? { ...item, quantity: newQty } : item
            ));
        }

        try {
            await axios.put(`http://localhost:5004/cart/${itemId}`, { quantity: newQty }, config);
        } catch (error) {
            console.error('Error updating item quantity:', error);
            setCartItems(cartItems);
        }
    }




    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-28 px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
                <div className="bg-white shadow-md rounded-lg p-4">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty. <br /> Try Adding Some Product</p>

                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between p-4 border-b">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.productId.image} alt={item.name} className="w-24 h-44 object-cover" />
                                        <div>
                                            <h4 className="text-2xl font-bold">{item.productId.bookTitle}</h4>
                                            <p className="text-gray-600 mb-2 mt-2" style={{ fontSize: '22px', lineHeight: '20px' }}>Price: ${item.productId.price}</p>
                                            <p className="text-gray-600 flex flex-row gap-2 " style={{ fontSize: '22px', lineHeight: '20px' }}>
                                                Quantity:<FaPlus className='text-xl cursor-pointer' onClick={() => handleQuantityChange(item._id, item.quantity + 1)} />
                                                <p className=''>{item.quantity} </p>
                                                <FaMinus className='text-xl cursor-pointer' onClick={() => handleQuantityChange(item._id, item.quantity - 1)} />
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            ))}
                            <div className="text-right">
                                <p className='text-3xl mb-2 mt-2'>Total : ${getTotalPrice()}</p>

                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleCheckout}>Pay Now</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
