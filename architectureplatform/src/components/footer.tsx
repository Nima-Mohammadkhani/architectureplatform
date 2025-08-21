import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "./ui/Icon";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "خدمات ما",
      links: [
        { name: "طراحی معماری", path: "/gallery" },
        { name: "دکوراسیون داخلی", path: "/gallery" },
        { name: "معماری پایدار", path: "/consultation" },
        { name: "مشاوره تخصصی", path: "/consultation" },
        { name: "محاسبه هزینه", path: "/calculator" },
      ],
    },
    {
      title: "پروژه‌ها",
      links: [
        { name: "مسکونی", path: "/gallery" },
        { name: "تجاری", path: "/gallery" },
        { name: "اداری", path: "/gallery" },
        { name: "هتلی", path: "/gallery" },
        { name: "بیمارستانی", path: "/gallery" },
      ],
    },
    {
      title: "شرکت",
      links: [
        { name: "درباره ما", path: "/about" },
        { name: "تیم ما", path: "/team" },
        { name: "اخبار و مقالات", path: "/blog" },
        { name: "فرصت‌های شغلی", path: "/careers" },
        { name: "تماس با ما", path: "/contact" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Icon name="Phone" className="w-5 h-5" />,
      text: "+۹۸ ۲۱ ۱۲۳۴ ۵۶۷۸",
      description: "شنبه تا چهارشنبه ۹ صبح تا ۶ عصر",
    },
    {
      icon: <Icon name="Mail" className="w-5 h-5" />,
      text: "info@memar-tarrah.ir",
      description: "پاسخگویی در کمتر از ۲۴ ساعت",
    },
    {
      icon: <Icon name="MapPin" className="w-5 h-5" />,
      text: "تهران، خیابان ولیعصر",
      description: "دفتر مرکزی طراحی و معماری",
    },
    {
      icon: <Icon name="MapPin" className="w-5 h-5" />,
      text: "شنبه تا چهارشنبه",
      description: "۹:۰۰ صبح تا ۱۸:۰۰ عصر",
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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Icon name="Building2" className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      معمار طراح
                    </h3>
                    <p className="text-gray-400 text-sm">
                      معماری و طراحی داخلی
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-300 mb-6 leading-relaxed max-w-md"
              >
                ما فضاهایی طراحی می‌کنیم که زندگی را بهتر می‌کند. از خانه‌های
                مسکونی تا فضاهای تجاری، با نگاهی نو و مدرن به آینده معماری.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3"
              >
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="text-yellow-500 mt-0.5 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {info.text}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + sectionIndex * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-yellow-400 duration-300 text-sm hover:translate-x-1 inline-block transition-transform"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">
                خبرنامه ما
              </h4>
              <p className="text-gray-400 text-sm">
                از آخرین اخبار و پروژه‌های ما باخبر شوید
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 md:w-80 px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              />
              <button className="bg-yellow-600 hover:bg-yellow-700 text-black font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                عضویت
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-6 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} معمار طراح. تمامی حقوق محفوظ است.
            </div>

            <div className="flex items-center gap-2">
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
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
