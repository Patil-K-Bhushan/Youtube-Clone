const Button = ({ name, selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 select-none rounded-lg px-4 py-2 text-sm font-medium transition ${
        selected
          ? "bg-black text-white"
          : "bg-gray-100 text-black hover:bg-gray-200"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
