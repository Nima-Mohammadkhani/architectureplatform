import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { logout } from "../../redux/slice/user";
import { toast } from "react-toastify";
type NavItem = { name: string; path: string };

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems: NavItem[] = [
    { name: "خانه", path: "/" },
    { name: "گالری", path: "/gallery" },
    { name: "وبلاگ", path: "/blog" },
    { name: "فروشگاه", path: "/shop" },
    { name: "محاسبه هزینه", path: "/calculator" },
    { name: "مشاوره", path: "/consultation" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-[#eab308] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Icon name="Building2" className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-gray-900 group-hover:text-[#eab308] transition-colors duration-300">
                معمار طراح
              </span>
              <span className="text-xs hidden sm:flex text-gray-500 font-medium">
                معماری و طراحی داخلی
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex justify-around gap-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive(item.path)
                    ? "text-[#eab308]"
                    : "text-black hover:text-[#eab308]"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#eab308] rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="absolute inset-0 bg-yellow-100 rounded-lg opacity-0 transition-opacity duration-300 -z-10"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-3 text-black hover:text-white transition-all duration-300 hover:bg-[#eab308] rounded-lg group"
            >
              <Icon
                name="ShoppingCart"
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
              />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#eab308] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
              >
                2
              </motion.span>
            </Link>

            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile"
                    className="p-3 text-black hover:text-white hover:bg-[#eab308] rounded-lg transition-all duration-300 group"
                  >
                    <Icon
                      name="User"
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <Button
                    title="خروج"
                    className="text-sm text-black hover:text-white hover:bg-[#eab308] px-3 py-2 rounded-lg transition-all duration-300 font-medium"
                    onClick={async () => {
                      await dispatch(logout());
                      toast.success("خروج با موفقیت انجام شد.");
                      navigate("/");
                    }}
                  />
                </div>
              ) : (
                <Link to="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-500 to-[#eab308] text-white p-2 text-xs rounded-xl hover:from-[#eab308] hover:to-yellow-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    ورود / ثبت‌نام
                  </motion.button>
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-black hover:text-white hover:bg-[#eab308] rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? (
                <Icon name="X" className="w-6 h-6" />
              ) : (
                <Icon name="Menu" className="w-6 h-6" />
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
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                        active
                          ? "bg-[#eab308] text-white font-medium"
                          : "text-black hover:text-[#eab308]"
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
