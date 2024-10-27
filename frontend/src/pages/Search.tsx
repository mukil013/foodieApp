import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { OPEN_API } from '../api';

interface Food {
  image: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  hotelId: string;
  hotelName: string;
}

export default function Search() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState<boolean>(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get<Food[]>('http://localhost:5555/food/');
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
        setError("Failed to load foods.");
      }
    };

    fetchFoods();
  }, []);

  const addToCart = (item: Food) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...currentCart, item];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${item.name} has been added to your cart.`);
  };

  const handleSearch = async () => {
    if (!search) return;
    setLoadingInsight(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Tell me about ${search}` }],
      }, {
        headers: {
          'Authorization': `Bearer ${OPEN_API}`,
          'Content-Type': 'application/json',
        },
      });
      const insightMessage = response.data.choices[0].message.content;
      setInsight(insightMessage);
    } catch (error) {
      console.error("Error fetching insight:", error);
      setInsight("Failed to load insight.");
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className='w-dvh h-fit flex justify-center items-start p-4 flex-col'>
        <h1 className='text-4xl font-bold'>Search</h1>
        <input
          type="text"
          placeholder='Search for food'
          className='mt-4 p-2 border-[1px] border-[#9e9e9e55] rounded-md'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className='mt-2 bg-green-500 text-white p-2 rounded-md'
        >
          Get Today’s Insight
        </button>

        {loadingInsight && <p className="text-blue-500">Loading insights...</p>}
        {insight && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md">
            <h2 className='font-semibold'>Today’s Insight:</h2>
            <p>{insight}</p>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {foods.map((food, index) => (
            <div key={index} className='p-4 border rounded-lg shadow-md'>
              <img src={food.image} alt={food.name} className='w-full h-40 object-contain rounded-md ' />
              <h2 className='mt-2 text-xl font-semibold'>{food.name}</h2>
              <p className='text-gray-600'>{food.description}</p>
              <p className='text-gray-700 font-semibold'>Price: {food.price}</p>
              <p className='text-gray-500'>Available at: {food.hotelName}</p> {/* Added hotel name here */}
              <button
                onClick={() => addToCart(food)}
                className='mt-2 bg-blue-500 text-white p-2 rounded-md'
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
