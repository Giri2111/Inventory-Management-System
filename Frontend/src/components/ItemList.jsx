import { useEffect, useState } from "react";
import { getItems, deleteItem } from "../API/inventoryApi";

export default function ItemList({ onEdit, onView, refreshTrigger }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Apparel",
    "Furniture",
    "Stationery",
    "Grocery",
    "Other",
  ];

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
    if (selectedCategory === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category === selectedCategory);
      setFilteredItems(filtered);
    }
  }, [items, selectedCategory]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id);
      fetchItems(); // Refresh list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div className="flex justify-start">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Items Grid or Empty Message */}
      {filteredItems.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No items found</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.015] transition duration-300 ease-in-out flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/items/${item.id}/image`}
                  alt={item.item_name}
                  className="w-20 h-20 object-cover rounded-lg border dark:border-gray-700"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.item_name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.category} | Qty: {item.quantity} | ₹{item.price}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">{item.description}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => onView(item)}
                  className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition duration-200"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 px-3 py-1 rounded text-sm hover:bg-red-200 dark:hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
