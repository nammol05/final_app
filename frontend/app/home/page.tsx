import React from "react";

const HomePage = () => {
  return (
    <div className="bg-[#1c1c24] min-h-screen text-white font-sans overflow-hidden">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-6 text-sm uppercase tracking-widest bg-[#13131a]">
        <div className="flex items-center gap-4">
          <div className="w-5 h-[2px] bg-white" />
          <div className="w-5 h-[2px] bg-white" />
          <div className="w-3 h-[2px] bg-white" />
          <span className="ml-4 text-xs text-gray-400">ULAS FLYLIGHT RACER</span>
        </div>
        <div className="flex gap-8 text-gray-400">
          <a href="#" className="hover:text-white">Where to Buy</a>
          <a href="#" className="hover:text-white">Stores</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 py-16 relative">
        
        {/* Left: Vertical Title */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <h1 className="text-[6vw] lg:text-[8vw] font-extrabold uppercase tracking-wider leading-none rotate-[-90deg] lg:rotate-0 origin-bottom-left lg:origin-center">
            The Quasar.
          </h1>
        </div>

        {/* Center: Glowing Shoe/Visual */}
        <div className="relative flex-1 flex justify-center items-center my-12 lg:my-0">
          {/* Glowing Circle */}
          <div className="absolute w-80 h-80 lg:w-[400px] lg:h-[400px] bg-orange-500 rounded-full blur-3xl opacity-30 z-0" />
          
          {/* Product Image Placeholder */}
          <img
            src="https://via.placeholder.com/400x300.png?text=Your+Product"
            alt="Quasar Shoe"
            className="relative z-10 max-w-[90%] drop-shadow-[0_0_40px_rgba(255,115,0,0.2)]"
          />
        </div>

        {/* Right: Description */}
        <div className="flex-1 max-w-md">
          <p className="text-white font-medium text-sm tracking-widest uppercase mb-6">
            The energy waves from the quasar.
          </p>
          <h2 className="text-white text-xl lg:text-2xl font-semibold mb-4">
            Aerodynamic and strong lines.
          </h2>
          <div className="mt-6">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-sm font-medium">
              Discover Product
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#13131a] text-gray-400 px-10 py-6 flex flex-col lg:flex-row items-center justify-between text-xs">
        <p className="max-w-xl leading-relaxed">
          Situated 28.85 billion light years from Earth, ULAS J1120+0641 is one of the most luminous quasars — the most energetic cosmic object observed in space.
        </p>
        <div className="mt-6 lg:mt-0 text-white font-semibold tracking-widest">
          ULAS <br />
          <span className="text-purple-500">J1120+0641</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
