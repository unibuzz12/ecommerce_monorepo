import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createProduct } from "../../../store/productSlice";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [count, setCount] = useState<number | "">("");
  if (!isOpen) return null;

  const handleCreateProduct = () => {
    if (name && price && count) {
      dispatch(
        createProduct({ name, price: Number(price), inventory_count: Number(count) })
      );
      onClose();
      setName("");
      setPrice("");
      setCount("");
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Create New Product
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Inventory count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-700"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleCreateProduct}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
