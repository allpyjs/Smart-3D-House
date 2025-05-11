import React from "react";

const Header = ({ setShowOutputModal }) => {
  return (
    <div className="px-5 py-3 bg-sky-700 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <button className="rounded cursor-pointer px-3 py-1 text-sm font-semibold uppercase hover:border bg-white hover:border-sky-300 transition-all duration-300">
          Home
        </button>
        <div className="text-white">
          <div className="text-sm">Create Job</div>
          <div>"untitled"</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        
        <button className="rounded cursor-pointer px-2 py-1 text-sm font-semibold uppercase hover:border bg-white hover:border-sky-300 transition-all duration-300">
          TestCAD
        </button>
        <button
          className="rounded cursor-pointer px-2 py-1 text-sm font-semibold uppercase hover:border bg-white hover:border-sky-300 transition-all duration-300"
          onClick={() => setShowOutputModal(true)}
        >
          Outputs
        </button>
        <button className="rounded cursor-pointer px-2 py-1 text-sm font-semibold uppercase hover:border bg-white hover:border-sky-300 transition-all duration-300">
          Make Quote
        </button>
        <button className="rounded cursor-pointer px-2 py-1 text-sm font-semibold uppercase hover:border bg-white hover:border-sky-300 transition-all duration-300">
          Save
        </button>
        <button className="rounded cursor-pointer px-2 py-1 text-sm font-semibold uppercase hover:border bg-white hover:border-sky-300 transition-all duration-300">
          Save As
        </button>
        <button className="rounded cursor-pointer px-2 py-1 text-sm font-semibold uppercase hover:border bg-white hover:border-sky-300 transition-all duration-300">
          Support
        </button>
        <button className="rounded cursor-pointer px-2 py-1 text-sm font-semibold uppercase hover:border bg-amber-500 hover:border-sky-300 transition-all duration-300">
          Help
        </button>
      </div>
    </div>
  );
};

export default Header;
