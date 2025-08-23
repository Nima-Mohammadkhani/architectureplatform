import { motion } from "framer-motion";
import { IpageHeaderProps } from "../../types/ui";
const PageHeader: React.FC<IpageHeaderProps> = ({
  pageName,
  title,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center my-4"
    >
      <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
        {pageName} <span className="text-yellow-600">{title}</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
    </motion.div>
  );
};
export default PageHeader;
