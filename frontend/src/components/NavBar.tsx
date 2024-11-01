import { useState } from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/boy.png'

export default function NavBar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    window.location.href = '/login'
  };

  return (
    <>
      <nav className='h-[3rem] w-full p-2 flex justify-between items-center border-b-[1px] border-[#9e9e9e55] sticky top-0 z-50 bg-white shadow-md'>
        <div className='text-2xl italic'>Foodie</div>
        <ul className='w-1/3 h-full flex justify-around items-center'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/search'>Search</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
          <li className="relative">
            <button onClick={togglePopup} className="focus:outline-none">
              Account
            </button>
            {isPopupOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-4 z-50 flex justify-center items-center">
                <ul>
                <img src={profilePic} alt="profile" 
                className='h-[5rem] aspect-square'/>
                  <li className="mb-2">
                    <Link to='' className="w-full text-left hover:text-blue-500" onClick={() => setIsPopupOpen(false)}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="w-full text-left text-red-600 hover:text-red-700"
                      onClick={() => {
                        handleLogout();
                        setIsPopupOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
