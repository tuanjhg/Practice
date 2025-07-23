
function Container({ image,title,bodytext }) {
  return (
    <div className="border-2 border-blue-500 hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 text-center bg-white shadow-sm">
      {image}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{bodytext}</p>
    </div>
  );
}

function Container2({ idx,title,bodytext }) {
  return (
      <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">{idx}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="max-w-xs text-gray-600">{bodytext}</p>
    </div>
  );
}

export { Container, Container2 };
