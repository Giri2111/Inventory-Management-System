import { useEffect, useState } from "react";
import { getItems, deleteItem } from "../API/inventoryApi";

const categories = [
  "All",
  "Electronics",
  "Apparel",
  "Furniture",
  "Stationery",
  "Grocery",
  "Other",
];

export default function FilteredItemList({ onEdit, onView, refreshTrigger }) {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  useEffect(() => {
    if (category === "All") {
      setFiltered(items);
    } else {
      setFiltered(items.filter((item) => item.category === category));
    }
  }, [items, category]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="p-6 space-y-6 text-black dark:text-white">
      {/* Filter dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Inventory Items</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-indigo-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Items grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/items/${item.id}/image`}
                  alt={item.item_name}
                  className="w-20 h-20 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {item.item_name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.category} | Qty: {item.quantity} | ₹{item.price}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => onView(item)}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-md text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-md text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-3 py-1 rounded-md text-sm hover:bg-red-200 dark:hover:bg-red-800 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
