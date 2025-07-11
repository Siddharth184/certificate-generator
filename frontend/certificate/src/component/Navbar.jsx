import React from 'react';

const Navbar = ({ currentSection, setSection }) => {
  const tabs = ['Template', 'Recipients', 'Generate'];

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide drop-shadow">🎓 CertiGen</h1>
        <ul className="flex space-x-6">
          {tabs.map(tab => (
            <li
              key={tab}
              className={`cursor-pointer text-lg font-medium hover:scale-105 transition transform ${
                currentSection === tab ? 'underline underline-offset-4' : ''
              }`}
              onClick={() => setSection(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
