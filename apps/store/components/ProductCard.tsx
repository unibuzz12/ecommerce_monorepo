import { createOrder } from "@/store/productSlice";
import { Product } from "../types/product";
import { useAppDispatch } from "../store/hooks";
import { fetchProducts } from "@/store/productSlice";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();

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
      <button
        onClick={() => {
          dispatch(createOrder(product.id as string));
        }}
        className="mt-auto p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
