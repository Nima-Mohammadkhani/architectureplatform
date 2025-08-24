import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "./ui/Icon";
import { toast } from "react-toastify";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success("پیام شما با موفقیت ارسال شد.");
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Icon name="Phone" className="w-6 h-6" />,
      title: "تلفن تماس",
      value: "+98 21 1234 5678",
      description: "شنبه تا چهارشنبه 9 صبح تا 6 عصر",
    },
    {
      icon: <Icon name="Mail" className="w-6 h-6" />,
      title: "ایمیل",
      value: "info@memar-tarrah.ir",
      description: "پاسخگویی در کمتر از 24 ساعت",
    },
    {
      icon: <Icon name="MapPin" className="w-6 h-6" />,
      title: "آدرس دفتر",
      value: "تهران، خیابان ولیعصر",
      description: "دفتر مرکزی طراحی و معماری",
    },
    {
      icon: <Icon name="Clock" className="w-6 h-6" />,
      title: "ساعات کاری",
      value: "شنبه تا چهارشنبه",
      description: "9:00 صبح تا 18:00 عصر",
    },
  ];

  const socialLinks = [
    {
      icon: <Icon name="Instagram" className="w-5 h-5" />,
      name: "Instagram",
      href: "#",
    },
    {
      icon: <Icon name="Twitter" className="w-5 h-5" />,
      name: "Twitter",
      href: "#",
    },
    {
      icon: <Icon name="Linkedin" className="w-5 h-5" />,
      name: "LinkedIn",
      href: "#",
    },
    {
      icon: <Icon name="Youtube" className="w-5 h-5" />,
      name: "YouTube",
      href: "#",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br w-full from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            با ما <span className="text-yellow-500">تماس</span> بگیرید
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            آماده پاسخگویی به سوالات و درخواست‌های شما هستیم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">
              ارسال پیام
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <Icon
                  name="CheckCircle"
                  className="w-16 h-16 text-green-400 mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">
                  پیام شما با موفقیت ارسال شد!
                </h4>
                <p className="text-gray-300">
                  در اسرع وقت با شما تماس خواهیم گرفت.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 h-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                      placeholder="ایمیل خود را وارد کنید"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    placeholder="+98 21 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    پیام
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="پیام خود را بنویسید..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center group"
                >
                  ارسال پیام
                  <Icon
                    name="Send"
                    className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">
              اطلاعات تماس
            </h3>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-yellow-500 mt-1">{info.icon}</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{info.title}</h4>
                  <p
                    className={`text-white text-end font-medium mb-1 ${
                      contactInfo[0] ? "ltr" : null
                    }`}
                  >
                    {info.value}
                  </p>
                  <p className="text-gray-400 text-sm">{info.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <h4 className="font-semibold text-lg mb-4 text-yellow-400">
                شبکه‌های اجتماعی
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-yellow-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:shadow-lg"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
