import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import ItemDetailsModal from "./ItemDetailsModal";
import { useState } from "react";

function Item() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const triggerRefresh = () => setRefreshFlag((prev) => prev + 1);

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Inventory Management</h1>

        {/* Add Button */}
        {!showForm && (
          <div className="text-right">
<button
  onClick={() => {
    setShowForm(true);
    setSelectedItem(null);
  }}
  className="
    px-6 py-2 font-medium bg-indigo-500 text-white w-fit  transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg
    hover:bg-indigo-600
    dark:bg-indigo-400 dark:text-gray-900
    dark:hover:bg-indigo-500
  "
>
  + Add Item
</button>


          </div>
        )}

        {/* Modal Popup */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="relative bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-xl p-4 w-full max-w-xl mx-4 transition-all">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl"
              >
                &times;
              </button>
              <ItemForm
                selectedItem={selectedItem}
                onSaved={() => {
                  triggerRefresh();
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        <ItemList
          onEdit={(item) => {
            setSelectedItem(item);
            setShowForm(true);
          }}
          onView={setViewItem}
          refresh={refreshFlag}
        />

        <ItemDetailsModal item={viewItem} onClose={() => setViewItem(null)} />
      </div>
    </div>
  );
}

export default Item;
