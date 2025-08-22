import { motion } from "framer-motion";
import Icon from "./ui/Icon";
import { Istats } from "../types/ui";
const Stats = () => {
  const stats: Istats[] = [
    {
      number: "150+",
      label: "پروژه موفق",
      icon: <Icon name="Award" className="w-8 h-8" size="lg"/>
    },
    {
      number: "95+",
      label: "مشتری راضی",
      icon: <Icon name="Users" className="w-8 h-8" size="lg"/>
    },
    {
      number: "12+",
      label: "سال تجربه",
      icon: <Icon name="Clock" className="w-8 h-8" size="lg"/>
    },
    {
      number: "25+",
      label: "جایزه دریافتی",
      icon: <Icon name="Award" className="w-8 h-8" size="lg"/>
    },
  ];
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stats, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-300 text-right px-10">
                {stats.icon}
              </div>
              <div className="text-4xl md:text-5xl font-light text-yellow-400 mb-2">
                {stats.number}
              </div>
              <div className="text-gray-300 font-medium">{stats.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
