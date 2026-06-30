const Button = ({ name, selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 select-none rounded-lg px-4 py-2 text-sm font-medium transition ${
        selected
          ? "bg-black dark:bg-zinc-100 text-white dark:text-zinc-900"
          : "bg-gray-100 dark:bg-zinc-800 text-black dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
