
function Container({ image,title,bodytext }) {
  return (
    <div className="border-2 border-blue-500 hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center bg-white shadow-sm">
      {image}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{bodytext}</p>
    </div>
  );
}

export default Container;
