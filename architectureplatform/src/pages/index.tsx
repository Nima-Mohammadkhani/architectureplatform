import ContactSection from "../components/ContactSection";
import FeaturedProjects from "../components/featuredProject";
import Service from "../components/service";
import Slider from "../components/slider";
import Stats from "../components/stats";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <section>
      <Slider />
      <Stats />
      <FeaturedProjects />
      <Service />
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              آماده شروع پروژه‌تان هستید؟
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              با ما تماس بگیرید و مشاوره رایگان دریافت کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="bg-white text-yellow-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-lg group hover:scale-105 hover:shadow-lg"
              >
                درخواست مشاوره
              </Link>
              <Link
                to="/calculator"
                className="bg-yellow-700 text-white px-8 py-4 rounded-lg hover:bg-yellow-800 transition-all duration-300 font-medium text-lg group hover:scale-105 hover:shadow-lg"
              >
                محاسبه هزینه
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Testimonials />
      <ContactSection />
    </section>
  );
};
export default index;
