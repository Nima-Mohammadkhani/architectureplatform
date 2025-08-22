import { IfeaturedProjects } from "../types/ui";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "./ui/card";
import Icon from "./ui/Icon";
const FeaturedProjects = () => {
  const featuredProjects: IfeaturedProjects[] = [
    {
      id: 1,
      title: "ویلای مدرن شمال",
      category: "مسکونی",
      image: "/image/slider/1.webp",
      description: "طراحی ویلای مدرن با معماری معاصر و استفاده از مصالح طبیعی",
      area: "450 متر مربع",
      location: "شمال ایران",
    },
    {
      id: 2,
      title: "مجتمع تجاری مرکزی",
      category: "تجاری",
      image: "/image/slider/2.jpeg",
      description: "طراحی مجتمع تجاری با رویکرد پایدار و بهینه‌سازی انرژی",
      area: "2500 متر مربع",
      location: "تهران",
    },
    {
      id: 3,
      title: "طراحی داخلی آپارتمان",
      category: "دکوراسیون داخلی",
      image: "/image/slider/3.webp",
      description: "دکوراسیون مینیمال و مدرن با استفاده از رنگ‌های گرم و طبیعی",
      area: "120 متر مربع",
      location: "اصفهان",
    },
  ];
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            نمونه‌کارهای <span className="text-yellow-600">برتر</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نگاهی به برخی از پروژه‌های موفق ما در حوزه معماری و طراحی داخلی
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card project={project} index={index} type={"topPortfolios"} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg group hover:scale-105 hover:shadow-lg"
          >
            مشاهده همه پروژه‌ها
            <Icon
              name="ArrowLeft"
              className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedProjects;
