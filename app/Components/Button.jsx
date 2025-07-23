function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono rounded-md transition duration-300">
      {children}
    </button>
  );
}
function Button2({ children }) {
  return (
    <button className="px-6 py-3 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 transition">
            {children}
    </button>
  );
}
  
export{Button , Button2};

