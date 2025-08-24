import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import PageHeader from "../components/ui/pageHeader";
import Card from "../components/ui/card";
import { Icategories, IsortedProducts } from "../types/ui";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/slice/cart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Shop = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
      })
    );
    toast.success(`${product.title} به سبد خرید اضافه شد`);
  };

  const categories: Icategories[] = [
    { id: "all", name: "همه محصولات" },
    { id: "books", name: "کتاب‌ها" },
    { id: "models", name: "ماکت‌ها" },
    { id: "materials", name: "متریال‌های دکوری" },
    { id: "tools", name: "ابزار طراحی" },
  ];

  const products: IsortedProducts = [
    {
      id: 1,
      title: "کتاب معماری معاصر ایران",
      category: "books",
      price: 450000,
      originalPrice: 500000,
      image: "/image/product/1.jpeg",
      rating: 4.8,
      reviews: 24,
      description: "مجموعه‌ای جامع از بهترین آثار معماری معاصر ایران",
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      title: "ماکت ویلای مدرن",
      category: "models",
      price: 2800000,
      originalPrice: 3200000,
      image: "/image/product/2.jpeg",
      rating: 4.9,
      reviews: 12,
      description: "ماکت تفصیلی ویلای مدرن با جزئیات کامل",
      inStock: true,
      featured: true,
    },
    {
      id: 3,
      title: "مجموعه تکسچر چوب طبیعی",
      category: "materials",
      price: 180000,
      image: "/image/product/3.webp",
      rating: 4.6,
      reviews: 31,
      description: "مجموعه کامل تکسچر چوب با کیفیت بالا برای رندر",
      inStock: true,
      featured: false,
    },
    {
      id: 4,
      title: "ست خودکار طراحی معماری",
      category: "tools",
      price: 320000,
      image: "image/product/4.jpeg",
      rating: 4.7,
      reviews: 18,
      description: "ست کامل خودکار و مداد برای طراحی دستی معماری",
      inStock: false,
      featured: false,
    },
    {
      id: 5,
      title: "کتاب طراحی داخلی مینیمال",
      category: "books",
      price: 380000,
      image: "image/product/5.jpeg",
      rating: 4.5,
      reviews: 27,
      description: "راهنمای کامل طراحی داخلی با سبک مینیمال",
      inStock: true,
      featured: false,
    },
    {
      id: 6,
      title: "ماکت آپارتمان مدرن",
      category: "models",
      price: 1950000,
      originalPrice: 2200000,
      image: "image/product/6.jpeg",
      rating: 4.8,
      reviews: 15,
      description: "ماکت آپارتمان مدرن با طراحی داخلی کامل",
      inStock: true,
      featured: true,
    },
    {
      id: 7,
      title: "مجموعه نمونه سنگ طبیعی",
      category: "materials",
      price: 650000,
      image: "image/product/7.jpeg",
      rating: 4.4,
      reviews: 9,
      description: "کلکسیون کامل نمونه سنگ‌های طبیعی برای طراحی",
      inStock: true,
      featured: false,
    },
    {
      id: 8,
      title: "نرم‌افزار طراحی سه‌بعدی",
      category: "tools",
      price: 1200000,
      image: "image/product/8.jpeg",
      rating: 4.9,
      reviews: 42,
      description: "نرم‌افزار حرفه‌ای طراحی معماری سه‌بعدی",
      inStock: true,
      featured: true,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.title.localeCompare(b.title, "fa");
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          pageName="فروشگاه"
          title="معماری"
          description="کتاب‌ها، ماکت‌ها و محصولات تخصصی معماری و طراحی"
        />

        <div className="flex justify-end mb-8">
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Icon name="ShoppingCart" className="w-5 h-5" />
            <span>سبد خرید</span>
            {items && items.length > 0 && (
              <span className="bg-white text-yellow-600 px-2 py-1 rounded-full text-sm font-bold">
                {items.length}
              </span>
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Icon name="Filter" className="w-5 h-5 ml-2" />
                  فیلترها
                </h3>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">دسته‌بندی</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="ml-3 text-yellow-600 focus:ring-yellow-600"
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">محدوده قیمت</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="number"
                      placeholder="از"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          parseInt(e.target.value) || 0,
                          priceRange[1],
                        ])
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    />
                    <span className="text-gray-500">تا</span>
                    <input
                      type="number"
                      placeholder="تا"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseInt(e.target.value) || 10000000,
                        ])
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    />
                  </div>
                  <button
                    onClick={() => setPriceRange([0, 10000000])}
                    className="text-sm text-yellow-600 hover:text-yellow-700"
                  >
                    پاک کردن
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">مرتب‌سازی</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="price-low">ارزان‌ترین</option>
                  <option value="price-high">گران‌ترین</option>
                  <option value="rating">بهترین امتیاز</option>
                  <option value="name">نام محصول</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                {sortedProducts.length} محصول یافت شد
              </p>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                <Card
                  type="shop"
                  sortedProducts={sortedProducts}
                  onAddToCart={handleAddToCart}
                />
              </AnimatePresence>
            </motion.div>

            {sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-500">
                  هیچ محصولی با این معیارها پیدا نشد.
                </p>
              </motion.div>
            )}

            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2 space-x-reverse">
                  <Button
                    title="قبلی"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  />

                  <Button
                    title="۱"
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                  />

                  <Button
                    title="۲"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  />

                  <Button
                    title="بعدی"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  />
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
