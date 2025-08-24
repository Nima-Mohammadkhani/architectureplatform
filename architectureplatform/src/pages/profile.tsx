import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { updateProfile } from "../redux/slice/user";
import { updateNotifications } from "../redux/slice/profile";
import Icon from "../components/ui/Icon";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { orders, services, notifications } = useAppSelector(
    (state) => state.profile
  );
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });
console.log(user);

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const tabs = [
    {
      id: "profile",
      name: "پروفایل من",
      icon: <Icon name="User" className="w-5 h-5" />,
    },
    {
      id: "orders",
      name: "سفارش‌ها",
      icon: <Icon name="Package" className="w-5 h-5" />,
    },
    {
      id: "services",
      name: "خدمات خریداری شده",
      icon: <Icon name="CreditCard" className="w-5 h-5" />,
    },
    {
      id: "settings",
      name: "تنظیمات",
      icon: <Icon name="Settings" className="w-5 h-5" />,
    },
  ];

  const handleSaveProfile = () => {
    if (user) {
      dispatch(updateProfile(editData));
      setIsEditing(false);
      toast.success("اطلاعات پروفایل با موفقیت بروزرسانی شد");
    }
  };

  const handleNotificationChange = (
    key: keyof typeof notifications,
    value: boolean
  ) => {
    dispatch(updateNotifications({ [key]: value }));
    toast.success("تنظیمات اعلان‌ها بروزرسانی شد");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const formatJoinDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تحویل شده":
      case "تکمیل شده":
        return "bg-green-100 text-green-800";
      case "در حال پردازش":
      case "در حال بررسی":
        return "bg-yellow-100 text-yellow-800";
      case "لغو شده":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">
            لطفاً وارد حساب کاربری خود شوید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src={
                    user.avatar ||
                    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150"
                  }
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  خوش آمدید، {user.name}
                </h1>
                <p className="text-yellow-100 mb-1">{user.email}</p>
                <div className="flex items-center text-yellow-100">
                  <Icon name="Calendar" className="w-4 h-4 ml-2" />
                  <span>عضو از {formatJoinDate(user.joinDate || '')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-6 py-4 text-right transition-colors ${
                      activeTab === tab.id
                        ? "bg-yellow-50 text-yellow-700 border-l-4 border-yellow-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span className="mr-3 font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      اطلاعات شخصی
                    </h2>
                    {!isEditing ? (
                      <Button
                        title="ویرایش"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
                        iconRight="Edit2"
                      />
                    ) : (
                      <div className="flex space-x-2 space-x-reverse">
                        <Button
                          title="ذخیره"
                          onClick={handleSaveProfile}
                          className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                          iconRight="Save"
                        />
                        <Button
                          title="انصراف"
                          onClick={() => {
                            setIsEditing(false);
                            setEditData({
                              name: user.name || "",
                              email: user.email || "",
                              phone: user.phone || "",
                              address: user.address || "",
                              bio: user.bio || "",
                            });
                          }}
                          className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          iconRight="X"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نام و نام خانوادگی
                      </label>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Icon
                            name="User"
                            className="w-5 h-5 text-gray-400 ml-3"
                          />
                          <span>{user.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ایمیل
                      </label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Icon
                            name="Mail"
                            className="w-5 h-5 text-gray-400 ml-3"
                          />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        شماره تلفن
                      </label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                          placeholder="شماره تلفن خود را وارد کنید"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Icon
                            name="Phone"
                            className="w-5 h-5 text-gray-400 ml-3"
                          />
                          <span>{user.phone || "وارد نشده"}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        آدرس
                      </label>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={editData.address}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              address: e.target.value,
                            })
                          }
                          placeholder="آدرس خود را وارد کنید"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Icon
                            name="MapPin"
                            className="w-5 h-5 text-gray-400 ml-3"
                          />
                          <span>{user.address || "وارد نشده"}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      درباره من
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.bio}
                        onChange={(e) =>
                          setEditData({ ...editData, bio: e.target.value })
                        }
                        placeholder="کمی درباره خود بنویسید..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
                        <span>
                          {user.bio || "هنوز چیزی درباره خود ننوشته‌اید."}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    سفارش‌های من
                  </h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon
                        name="Package"
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
                      />
                      <p className="text-gray-500">
                        هنوز سفارشی ثبت نکرده‌اید.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                سفارش #{order.id}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {order.date}
                              </p>
                            </div>
                            <div className="text-left">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                              <p className="text-lg font-bold text-gray-900 mt-1">
                                {formatPrice(order.total)} تومان
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-gray-700">
                                  {item.name} × {item.quantity}
                                </span>
                                <span className="font-medium">
                                  {formatPrice(item.price)} تومان
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex space-x-3 space-x-reverse">
                            <Button
                              title="مشاهده جزئیات"
                              className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 transition-colors"
                            />
                            <Button
                              title="دانلود فاکتور"
                              className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "services" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    خدمات خریداری شده
                  </h2>
                  {services.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon
                        name="CreditCard"
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
                      />
                      <p className="text-gray-500">
                        هنوز خدماتی خریداری نکرده‌اید.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {service.name}
                              </h3>
                              <p className="text-gray-600 mb-2">
                                {service.description}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 space-x-4 space-x-reverse">
                                <span>مشاور: {service.consultant}</span>
                                <span>{service.date}</span>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                service.status
                              )}`}
                            >
                              {service.status}
                            </span>
                          </div>
                          <div className="flex space-x-3 space-x-reverse">
                            <Button
                              title="مشاهده گزارش"
                              className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 transition-colors"
                            />
                            <Button
                              title="تماس با مشاور"
                              className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    تنظیمات حساب
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        تغییر رمز عبور
                      </h3>
                      <p className="text-gray-600 mb-4">
                        برای امنیت بیشتر، رمز عبور خود را تغییر دهید
                      </p>
                      <Button
                        title="تغییر رمز عبور"
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        اعلان‌ها
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2">
                          <Input
                            type="checkbox"
                            checked={notifications.emailOrders}
                            onChange={(e) =>
                              handleNotificationChange(
                                "emailOrders",
                                e.target.checked
                              )
                            }
                            className="text-yellow-600 focus:ring-yellow-600 checkbox"
                          />
                          <span>اعلان ایمیل برای سفارش‌ها</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Input
                            type="checkbox"
                            checked={notifications.newProducts}
                            onChange={(e) =>
                              handleNotificationChange(
                                "newProducts",
                                e.target.checked
                              )
                            }
                            className="text-yellow-600 focus:ring-yellow-600 checkbox"
                          />
                          <span>اعلان محصولات جدید</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Input
                            type="checkbox"
                            checked={notifications.weeklyNewsletter}
                            onChange={(e) =>
                              handleNotificationChange(
                                "weeklyNewsletter",
                                e.target.checked
                              )
                            }
                            className="text-yellow-600 focus:ring-yellow-600 checkbox"
                          />
                          <span>خبرنامه هفتگی</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-900 mb-2">
                        حذف حساب کاربری
                      </h3>
                      <p className="text-red-700 mb-4">
                        این عمل غیرقابل بازگشت است و تمام داده‌های شما حذف خواهد
                        شد
                      </p>
                      <Button
                        title="حذف حساب کاربری"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
