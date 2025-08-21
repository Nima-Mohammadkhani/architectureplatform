import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, User, Building2 } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const navigationItems = [
    { name: "خانه", path: "/" },
    { name: "گالری", path: "/gallery" },
    { name: "وبلاگ", path: "/blog" },
    { name: "فروشگاه", path: "/shop" },
    { name: "محاسبه هزینه", path: "/calculator" },
    { name: "مشاوره", path: "/consultation" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 space-x-3 group">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                معمار طراح
              </span>
              <span className="text-xs hidden sm:flex text-gray-500 font-medium">
                معماری و طراحی داخلی
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex space-x-8 space-x-reverse">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActive
                      ? "text-yellow-600"
                      : "text-gray-700 hover:text-yellow-600"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="absolute inset-0 bg-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4 space-x-reverse">
            <Link
              to="/cart"
              className="relative p-3 text-gray-700 hover:text-yellow-600 transition-all duration-300 hover:bg-yellow-50 rounded-lg group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
              >
                2
              </motion.span>
            </Link>

            <div className="flex items-center space-x-3 space-x-reverse">
              {user ? (
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Link
                    to="/profile"
                    className="p-3 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 group"
                  >
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                  <button className="text-sm text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 px-3 py-2 rounded-lg transition-all duration-300 font-medium">
                    خروج
                  </button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-2 text-xs rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  ورود / ثبت‌نام
                </motion.button>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t z-50 border-gray-100 overflow-hidden"
            >
              <nav className="px-4 py-6 space-y-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-yellow-100 text-yellow-700 font-medium"
                          : "text-gray- hover:bg-yellow-50 hover:text-yellow-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
