import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import ProductList from "../../../components/ProductList";
import SearchBar from "../../../components/SearchBar";
import { Product } from "../../../types/product";
import CreateProductModal from "./CreateProductModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { fetchProducts } from "../../../store/productSlice";

const ProductContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(10);

  const product = useSelector((state: RootState) => state.product.products);
  const loadMoreProducts = () => {
    setProductsToShow(filteredProducts.slice(0, visibleProducts + 10));
    setVisibleProducts((prev) => prev + 10);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (product.length) {
      const filtered = product.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setProductsToShow(filtered.slice(0, visibleProducts));
    }
  }, [JSON.stringify(product), searchTerm]);

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Browse our extensive product range and find what you need at great prices."
        />
        <meta
          name="keywords"
          content="e-commerce, products, online store, shopping"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto pt-20 p-4">
        <div className="flex justify-between items-center space-x-4 mb-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create
          </button>
          <CreateProductModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <ProductList products={productsToShow} />
        {visibleProducts < filteredProducts.length && (
          <button
            onClick={loadMoreProducts}
            className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Load More
          </button>
        )}
      </main>
    </div>
  );
};

export default ProductContent;
