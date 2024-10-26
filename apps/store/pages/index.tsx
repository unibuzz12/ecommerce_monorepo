import { useEffect, useState } from "react";
import Head from "next/head";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { Product } from "../types/product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/productSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(10);

  const product = useSelector((state: RootState) => state.product.products);

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 10);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    // Filter and sort products based on searchTerm and sortOption
    if (product.length) {
      const filtered = product
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.price - b.price);

      setFilteredProducts(filtered);
      setProductsToShow(filtered.slice(0, visibleProducts));
    }
  }, [JSON.stringify(product), searchTerm]);

  return (
    <div>
      <Head>
        <title>Product Listing - E-commerce</title>
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
      <Header />
      <main className="container mx-auto pt-20 p-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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

export default Home;
