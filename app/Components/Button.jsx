function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono rounded-md transition duration-300">
      {children}
    </button>
  );
}

  
export default Button;

