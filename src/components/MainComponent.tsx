import { useEffect, useState } from "react";
import { useFilter } from "../FillterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";

const MainComponent = () => {
  const {
    keyWord,
    maxPrice,
    minPrice,
    searchQuery,
    selectedCategory,
    // setKeyWord,
    // setMaxPrice,
    // setMinPrice,
    // setSearchQuery,
    // setSelectedCategory,
  } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const itemPerPage = 12;

  useEffect(() => {
    console.log(keyWord);
    let url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${
      (currentPage - 1) * itemPerPage
    }`;
    if (keyWord) {
      url = `https://dummyjson.com/products/search?q=${keyWord}`;
    }
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage, keyWord]);

  const getfilteredProduct = () => {
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (products) => products.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (products) => products.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (products) => products.price >= maxPrice
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((products) =>
        products.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getfilteredProduct();

  const totalProducts = 100;
  const totalPage = Math.ceil(totalProducts / itemPerPage);
  const handlePageCahnge = (page: number) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const getPaginationBtn = () => {
    const button: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPage, currentPage + 2);
    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPage, endPage + (2 - currentPage - 1));
    }
    if (currentPage + 2 > totalPage) {
      endPage = Math.min(1, startPage - (2 - totalPage - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
      button.push(page);
    }
    console.log(button);
    return button;
  };

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              className="border px-4 py-5 rounded-full flex items-center"
              onClick={() => setDropdownOpen(!dropDownOpen)}>
              <Tally3 className="mr-2" />

              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLocaleLowerCase() + filter.slice(1)}
            </button>

            {dropDownOpen && (
              <div className="absolute bg-white border  rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* BOOK CARD */}

          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {getPaginationBtn().map((page) => (
          <button
            className={`  border px-4 py-2 mx-1 rounded-full ${
              page == currentPage ? "bg-black text-white" : ""
            }`}
            key={page}
            onClick={() => handlePageCahnge(page)}>
            {page}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        <button
          className="border px-4 py-2 mx-2 rounded-full"
          onClick={() => handlePageCahnge(currentPage - 1)}
          disabled={currentPage == 1}>
          prev
        </button>
        <button
          onClick={() => handlePageCahnge(currentPage + 1)}
          disabled={currentPage == totalPage}
          className="border px-4 py-2 mx-2 rounded-full">
          next
        </button>
      </div>
    </section>
  );
};

export default MainComponent;
