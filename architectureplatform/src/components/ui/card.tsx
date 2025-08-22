import { motion } from "framer-motion";
import { IcardProps } from "../../types/ui";
const Card: React.FC<IcardProps> = ({ project, index, type }) => {
  if (type == "topPortfolios") {
    return (
      <motion.div
        key={project?.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index ?? 0 * 0.1 }}
        whileHover={{ y: -10 }}
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        <div className="relative overflow-hidden">
          <img
            src={project?.image}
            alt={project?.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {project?.category}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-white">
              <div className="flex items-center space-x-4 space-x-reverse text-sm">
                <span>{project?.area}</span>
                <span>•</span>
                <span>{project?.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
            {project?.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {project?.description}
          </p>
        </div>
      </motion.div>
    );
  }
};
export default Card;
