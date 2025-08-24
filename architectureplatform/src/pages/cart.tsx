import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slice/cart";
import { toast } from "react-toastify";
import PageHeader from "../components/ui/pageHeader";
import Icon from "../components/ui/Icon";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
    if (quantity <= 0) {
      toast.info("محصول از سبد خرید حذف شد");
    }
  };

  const handleRemoveFromCart = (id: number) => {
    const item = items.find((item) => item.id === id);
    dispatch(removeFromCart(id));
    toast.info(`${item?.title} از سبد خرید حذف شد`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("سبد خرید پاک شد");
  };

  const shippingCost = items.length > 0 ? 50000 : 0;
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Icon
              name="ShoppingBag"
              className="w-24 h-24 text-gray-300 mx-auto mb-8"
            />
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              سبد خرید شما خالی است
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              محصولات مورد علاقه خود را به سبد اضافه کنید
            </p>
            <Link
              to="/shop"
              className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium inline-flex items-center"
            >
              مشاهده محصولات
              <Icon name="ArrowLeft" className="mr-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          pageName="سبد"
          title="خرید"
          description={`${items.length} محصول در سبد خرید شما`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">محصولات</h3>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  پاک کردن سبد
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-yellow-600 font-medium mt-1">
                            {formatPrice(item.price)} تومان
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Icon
                              name="Minus"
                              className="w-4 h-4 text-gray-600"
                            />
                          </button>

                          <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Icon
                              name="Plus"
                              className="w-4 h-4 text-gray-600"
                            />
                          </button>
                        </div>

                        <div className="text-left">
                          <p className="text-lg font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)} تومان
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Icon name="X" className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 rounded-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                خلاصه سفارش
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">جمع محصولات:</span>
                  <span className="font-semibold">
                    {formatPrice(total)} تومان
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه ارسال:</span>
                  <span className="font-semibold">
                    {shippingCost > 0
                      ? `${formatPrice(shippingCost)} تومان`
                      : "رایگان"}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-900">
                      مجموع کل:
                    </span>
                    <span className="font-bold text-yellow-600">
                      {formatPrice(finalTotal)} تومان
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  title="پرداخت و تکمیل سفارش"
                  className="w-full bg-yellow-600 text-white py-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium text-lg"
                />

                <Link
                  to="/shop"
                  className="w-full bg-white text-yellow-600 py-3 rounded-lg border-2 border-yellow-600 hover:bg-yellow-50 transition-colors font-medium text-center block"
                >
                  ادامه خرید
                </Link>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  مزایای خرید از ما:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• ارسال رایگان برای سفارش‌های بالای 500 هزار تومان</li>
                  <li>• ضمانت بازگشت 7 روزه</li>
                  <li>• پشتیبانی 24 ساعته</li>
                  <li>• تضمین کیفیت محصولات</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">کد تخفیف</h4>
                <div className="flex space-x-2 space-x-reverse">
                  <Input
                    type="text"
                    placeholder="کد تخفیف خود را وارد کنید"
                    className="flex-1 px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  <Button
                    title="اعمال"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm font-medium"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            محصولات پیشنهادی
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    محصول پیشنهادی {item}
                  </h4>
                  <p className="text-yellow-600 font-medium">۲۵۰,۰۰۰ تومان</p>
                  <Button
                    title="افزودن به سبد"
                    className="w-full mt-3 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition-colors text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
