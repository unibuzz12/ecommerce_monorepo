import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header = () => {
  const product = useSelector((state: RootState) => state.product);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My E-Commerce Site</h1>
        <div>
          {/* <p>Total Price: ${product.totalPrice.toFixed(2)}</p> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
