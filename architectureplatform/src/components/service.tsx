import { motion } from "framer-motion";
import Icon from "../components/ui/Icon";
import { Iservice } from "../types/ui";
import Card from "./ui/card";
const Service = () => {
  const services: Iservice[] = [
    {
      icon: <Icon name="Building2" className="w-8 h-8" />,
      title: "طراحی معماری",
      description:
        "طراحی ساختمان‌های مسکونی، تجاری و اداری با رویکرد مدرن و پایدار",
      features: ["طراحی مفهومی", "نقشه‌های اجرایی", "نظارت بر ساخت"],
      link: "/gallery",
    },
    {
      icon: <Icon name="Palette" className="w-8 h-8" />,
      title: "دکوراسیون داخلی",
      description:
        "طراحی فضاهای داخلی که زیبایی و کارایی را با هم ترکیب می‌کند",
      features: ["طراحی مبلمان", "انتخاب رنگ و متریال", "نورپردازی"],
      link: "/gallery",
    },
    {
      icon: <Icon name="Leaf" className="w-8 h-8" />,
      title: "معماری پایدار",
      description:
        "طراحی سازگار با محیط زیست با استفاده از انرژی‌های تجدیدپذیر",
      features: ["بهینه‌سازی انرژی", "مصالح سبز", "سیستم‌های هوشمند"],
      link: "/consultation",
    },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            خدمات <span className="text-yellow-600">ما</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            از طراحی مفهومی تا اجرای نهایی، تمام خدمات معماری را ارائه می‌دهیم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service , index) => (
            <Card key={index} type="service" service={service} index={index}/>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Service;
