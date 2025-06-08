export default function ItemDetailsModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300">
      <div className="relative bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-3 text-indigo-800 dark:text-indigo-400">
          {item.item_name}
        </h2>

        <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          <p className="text-gray-800 dark:text-gray-200">{item.description}</p>
          <p>
            <span className="font-semibold">Category:</span> {item.category}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {item.quantity}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ₹{item.price}
          </p>
        </div>

        {item.image && (
          <img
            src={`data:${item.image_type};base64,${item.image}`}
            alt="item"
            className="w-full h-48 object-cover rounded-lg mt-4 shadow"
          />
        )}

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded shadow transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
