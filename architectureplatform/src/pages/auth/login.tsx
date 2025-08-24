import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/ui/Icon";
import Input from "../../components/ui/Input";
import { FormData, FormErrors } from "../../types/ui";
import { useDispatch } from "react-redux";
import { login, register } from "../../redux/slice/user";
import { toast } from "react-toastify";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    joinDate: new Date().toISOString(),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // همیشه joinDate را تنظیم کن
    setFormData(prev => ({
      ...prev,
      joinDate: new Date().toISOString()
    }));
  }, [isLogin]);

  // Initialize users list from localStorage
  useEffect(() => {
    // Check if there's an existing user in localStorage
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      try {
        const user = JSON.parse(existingUser);
        // Add to users list if not already there
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = users.some((u: any) => u.email === user.email);
        if (!userExists) {
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));
        }
      } catch (error) {
        console.error("Error parsing existing user:", error);
      }
    }
  }, []);

  // Function to check if user exists by email
  const checkUserExists = (email: string): boolean => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      return users.some((user: any) => user.email === email);
    } catch {
      return false;
    }
  };

  // Handle email change and check if user exists
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    
    // Clear previous errors
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
    
    // Check if user exists when email is valid
    if (email && /\S+@\S+\.\S+/.test(email)) {
      const exists = checkUserExists(email);
      setUserExists(exists);
      
      // If user doesn't exist and we're in login mode, force registration
      if (!exists && isLogin) {
        setIsLogin(false);
        toast.info("کاربری با این ایمیل یافت نشد. لطفاً ثبت‌نام کنید.");
      }
    } else {
      setUserExists(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      handleEmailChange(e);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (errors[e.target.name as keyof FormErrors]) {
        setErrors({ ...errors, [e.target.name]: "" });
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "نام الزامی است";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        // For login, user must exist
        if (!userExists) {
          toast.error("کاربری با این ایمیل یافت نشد. لطفاً ثبت‌نام کنید.");
          setIsLogin(false);
          setLoading(false);
          return;
        }
        
        dispatch(login(formData));
        toast.success("ورود با موفقیت انجام شد.");
      } else {
        // For register, user must not exist
        if (userExists) {
          toast.error("کاربری با این ایمیل قبلاً وجود دارد. لطفاً وارد شوید.");
          setIsLogin(true);
          setLoading(false);
          return;
        }
        
        dispatch(register(formData));
        toast.success("ثبت نام با موفقیت انجام شد.");
      }

      // Navigate to profile after successful action
      navigate("/profile");
    } catch (error: unknown) {
      setErrors({ general: "خطایی رخ داده است. لطفاً دوباره تلاش کنید" });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle automatic mode switching
  const handleAutoModeSwitch = () => {
    if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) {
      const exists = checkUserExists(formData.email);
      if (exists && !isLogin) {
        // User exists but we're in register mode, switch to login
        setIsLogin(true);
        toast.info("کاربری با این ایمیل وجود دارد. لطفاً وارد شوید.");
      } else if (!exists && isLogin) {
        // User doesn't exist but we're in login mode, switch to register
        setIsLogin(false);
        toast.info("کاربری با این ایمیل یافت نشد. لطفاً ثبت‌نام کنید.");
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      joinDate: new Date().toISOString(), // همیشه joinDate را حفظ کن
    });
    setErrors({});
    setUserExists(null);
  };

  // Function to clear email and reset state
  const clearEmailAndReset = () => {
    setFormData(prev => ({
      ...prev,
      email: ""
    }));
    setUserExists(null);
    setErrors(prev => ({ ...prev, email: "" }));
  };

  return (
    <div className="py-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "ورود" : "ثبت‌نام"}
            </h1>
            <p className="text-gray-600">
              {formData.email && /\S+@\S+\.\S+/.test(formData.email) && userExists !== null
                ? userExists 
                  ? "کاربری با این ایمیل وجود دارد. لطفاً وارد شوید."
                  : "کاربری با این ایمیل وجود ندارد. لطفاً ثبت‌نام کنید."
                : isLogin
                  ? "به حساب کاربری خود وارد شوید"
                  : "حساب کاربری جدید ایجاد کنید"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm text-center"
              >
                {errors.general}
              </motion.div>
            )}

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <div className="relative">
                  <Icon
                    name="User"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل
              </label>
              <div className="relative">
                <Icon
                  name="Mail"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="ایمیل خود را وارد کنید"
                />
                {formData.email && (
                  <button
                    type="button"
                    onClick={clearEmailAndReset}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </button>
                )}
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
              
              {/* User existence indicator */}
              {formData.email && /\S+@\S+\.\S+/.test(formData.email) && userExists !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 p-2 rounded-lg text-sm ${
                    userExists 
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon 
                        name={userExists ? "CheckCircle" : "UserPlus"} 
                        className={`w-4 h-4 ml-2 ${
                          userExists ? "text-green-600" : "text-blue-600"
                        }`}
                      />
                      <span>
                        {userExists 
                          ? "کاربری با این ایمیل وجود دارد. می‌توانید وارد شوید."
                          : "کاربری با این ایمیل وجود ندارد. لطفاً ثبت‌نام کنید."
                        }
                      </span>
                    </div>
                    <Button
                      title={userExists ? "ورود" : "ثبت‌نام"}
                      onClick={handleAutoModeSwitch}
                      className={`text-sm px-3 py-1 ${
                        userExists 
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <Icon
                  name="Lock"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <Icon name="EyeOff" className="w-5 h-5" />
                  ) : (
                    <Icon name="Eye" className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <Icon
                    name="Lock"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="رمز عبور را دوباره وارد کنید"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                  در حال پردازش...
                </div>
              ) : isLogin ? (
                "ورود"
              ) : (
                "ثبت‌نام"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "حساب کاربری ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}
            </p>
            <Button
              title={isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
              onClick={toggleMode}
              className="text-yellow-600 hover:text-yellow-700 font-medium mt-1"
            />
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                رمز عبور خود را فراموش کرده‌اید؟
              </Link>
            </div>
          )}

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">یا</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                title="گوگل"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              />
              <Button
                title="لینکدین"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              />
            </div>
          </div>

          {!isLogin && (
            <p className="mt-6 text-xs text-gray-600 text-center">
              با ثبت‌نام، شما با
              <Link
                to="/terms"
                className="text-yellow-600 hover:text-yellow-700 mx-1"
              >
                قوانین و مقررات
              </Link>
              و
              <Link
                to="/privacy"
                className="text-yellow-600 hover:text-yellow-700 mx-1"
              >
                حریم خصوصی
              </Link>
              موافقت می‌کنید.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
