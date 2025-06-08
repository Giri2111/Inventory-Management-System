import { useState, useEffect } from "react";
import { createItem, updateItem, getItem } from "../API/inventoryApi";

export default function ItemForm({ selectedItem, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    quantity: 0,
    price: 0,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(null);

  const categories = [
    "Electronics",
    "Apparel",
    "Furniture",
    "Stationery",
    "Grocery",
    "Other",
  ];

  useEffect(() => {
    if (selectedItem) {
      getItem(selectedItem.id).then((res) => {
        const data = res.data;
        setFormData({ ...data, image: null });
        setPreview(null);
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          setImageError("Only JPEG and PNG images are allowed.");
          setFormData((prev) => ({ ...prev, image: null }));
          setPreview(null);
          return;
        }
        setImageError(null);
        setFormData((prev) => ({ ...prev, image: file }));
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    try {
      let savedItem;
      if (selectedItem) {
        const res = await updateItem(selectedItem.id, data);
        savedItem = res.data;
      } else {
        const res = await createItem(data);
        savedItem = res.data;
      }

      onSaved(savedItem);
      window.location.reload();
    } catch (err) {
      alert("Failed to save item. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-5 p-6 text-black dark:text-white max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {selectedItem ? "Edit Item" : "Add New Item"}
      </h2>

      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <label className="font-medium">Item Name:</label>
        <input
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="Item Name"
          required
          className="sm:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-100 dark:bg-gray-800 dark:placeholder-gray-400"
        />

        <label className="font-medium">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="sm:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none bg-gray-100 dark:bg-gray-800 dark:placeholder-gray-400"
        />

        <label className="font-medium">Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="sm:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-white"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="font-medium">Quantity:</label>
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="sm:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-100 dark:bg-gray-800 dark:placeholder-gray-400"
        />

        <label className="font-medium">Price:</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="sm:col-span-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-100 dark:bg-gray-800 dark:placeholder-gray-400"
        />

        <label className="font-medium">Upload Image:</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="sm:col-span-2 text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-50 dark:file:bg-gray-700 file:text-blue-700 dark:file:text-white hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
        />
      </div>

      {imageError && (
        <p className="text-red-600 text-sm mt-2">{imageError}</p>
      )}

      {preview && (
        <div className="flex justify-center mt-2">
          <img
            src={preview}
            alt="preview"
            className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </div>
      )}

      <div className="flex gap-3 justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : selectedItem ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
