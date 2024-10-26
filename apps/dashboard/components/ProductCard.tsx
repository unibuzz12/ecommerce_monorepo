import React, { useEffect, useState } from 'react';
import { Product } from "../types/product";
import { useAppDispatch, useAppSelector } from '../store/hooks'; // Adjust imports based on your setup
import { fetchProducts, deleteProduct, updateProduct } from '../store/productSlice';
import UpdateProductModal from './pages/products/UpdateProductModal';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="border p-4 rounded flex flex-col">
      <img
        src={"https://via.placeholder.com/200"}
        alt={product.name}
        className="h-40 w-full object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.inventory_count}</p>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>

      {/* <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
      <p className="text-gray-700">Inventory: {product.inventory_count}</p> */}
      <div className="flex space-x-4 mt-2">
        <button
          className="text-blue-600 hover:text-blue-800"
            onClick={openModal}
    
        >
          <i className="bx bxs-pencil h-5 w-5"></i>
        </button>
        {product.id && (<UpdateProductModal isOpen={isModalOpen} onClose={closeModal} id={product.id}/>)}
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => product?.id && dispatch(deleteProduct(product.id))}
        >
           <i className="bx bxs-trash h-5 w-5"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
