import { useEffect, useState } from "react";
import { useFilter } from "../FillterContext";

interface Product {
  category: string;
}
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const {
    keyWord,
    maxPrice,
    minPrice,
    searchQuery,
    selectedCategory,
    setKeyWord,
    setMaxPrice,
    setMinPrice,
    setSearchQuery,
    setSelectedCategory,
  } = useFilter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategory = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategory);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategory();
  }, []);

  const handleMinpriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };
  const handleMaxpriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };
  const handelRadioChange = (categories: string) => {
    setSelectedCategory(categories);
  };
  const handleKeyWord = (keyWord: string) => {
    setKeyWord(keyWord);
  };
  const handleReset = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSearchQuery("");
    setKeyWord("");
    setSelectedCategory("");
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinpriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxpriceChange}
          />
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-bold mb-3">Categories</h2>
        </div>

        <section>
          {categories.map((cate, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={cate}
                className="mr-2 w-[16px] h-[16px]"
                onChange={() => handelRadioChange(cate)}
                checked={selectedCategory === cate}
              />
              {cate.toUpperCase()}
            </label>
          ))}
        </section>
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Key word</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                onClick={() => handleKeyWord(keyWord)}
                key={index}
                className="block nb2
               px-4 pt-2 w-full border">
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleReset}
          className="w-full mb=[4rem] py-2 bg-black text-white rounded-none mt-5">
          Reset
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
