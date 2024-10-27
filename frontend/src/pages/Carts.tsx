import React from 'react';
import NavBar from '../components/NavBar';

interface Food {
  image: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  hotelId: string;
  hotelName: string;
}

export default function Carts() {
  const [cart, setCart] = React.useState<Food[]>(() => {
    
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const removeFromCart = (itemName: string) => {
    const updatedCart = cart.filter(item => item.name !== itemName);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <NavBar />
      <div className='w-dvh h-fit flex justify-center items-start p-4 flex-col'>
        <h1 className='text-4xl font-bold'>Cart</h1>
        {cart.length === 0 ? (
          <p className='mt-4 text-gray-600'>Your cart is empty.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {cart.map((item, index) => (
              <div key={index} className='p-4 border rounded-lg shadow-md'>
                <img src={item.image} alt={item.name} className='w-full h-40 object-cover rounded-md' />
                <h2 className='mt-2 text-xl font-semibold'>{item.name}</h2>
                <p className='text-gray-600'>{item.description}</p>
                <p className='text-gray-700 font-semibold'>Price: {item.price}</p>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className='mt-2 bg-red-500 text-white p-2 rounded-md'
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
