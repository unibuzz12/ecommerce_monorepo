import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProductHeader = () => {
  const product = useSelector((state: RootState) => state.product);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow p-4 z-50">
      <div className="container mx-auto flex justify-end items-center">
        <div>
          <p>Total Items: {product.products.length}</p>
          {/* <p>Total Price: ${product.totalPrice.toFixed(2)}</p> */}
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
