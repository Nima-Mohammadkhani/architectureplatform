import { motion } from "framer-motion";
import { IcardProps } from "../../types/ui";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import Button from "./Button";

const Card: React.FC<IcardProps> = ({
  project,
  index,
  type,
  service,
  categories,
  setSelectedProject,
  post,
  sortedProducts,
}) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fa-IR").format(price);

  const renderCard = () => {
    switch (type) {
      case "topPortfolios":
        return (
          <motion.div
            key={project?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (project?.id || 0) * 0.1 }}
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

      case "service":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (index || 0) * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-yellow-200"
          >
            <div className="text-yellow-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              {service?.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {service?.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {service?.description}
            </p>

            <ul className="space-y-2 mb-6">
              {service?.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-gray-600 text-sm"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to={service?.link ?? ""}
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
            >
              شروع کنید
              <Icon name="ArrowLeft" className="mr-2 w-4 h-4" />
            </Link>
          </motion.div>
        );

      case "gallery":
        return (
          <motion.div
            key={project?.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: (index || 0) * 0.1 }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={() => setSelectedProject?.(project)}
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={project?.image}
                alt={project?.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                {categories?.find((cat) => cat.id === project?.category)?.name}
              </div>
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  مشاهده جزئیات
                </span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {project?.title}
            </h3>
            <p className="text-gray-600 mb-2">{project?.description}</p>
            <div className="text-sm text-gray-500">
              {project?.area} • {project?.year} • {project?.location}
            </div>
          </motion.div>
        );

      case "blog":
        return (
          <motion.article
            key={post?.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index || 0) * 0.1 }}
            className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={post?.image}
                alt={post?.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-yellow-600 text-white px-2 py-1 rounded text-sm">
                {categories?.find((cat) => cat.id === post?.category)?.name}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                {post?.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post?.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="flex items-center">
                    <Icon name="User" className="w-4 h-4 ml-1" />
                    {post?.author}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Calendar" className="w-4 h-4 ml-1" />
                    {post?.date}
                  </span>
                </div>
                <span>{post?.readTime}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {post?.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    <Icon name="Tag" className="w-3 h-3 ml-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                title="ادامه مطلب"
                iconRight="ArrowLeft"
                className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
              />
            </div>
          </motion.article>
        );

      case "shop":
        return (
          <>
            {sortedProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                      ویژه
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium">ناموجود</span>
                    </div>
                  )}
                  <Button
                    title=""
                    iconLeft="Heart"
                    className="absolute top-3 left-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          name="Star"
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 mr-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price)} تومان
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)} تومان
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % تخفیف
                      </span>
                    )}
                  </div>

                  <Button
                    title={product.inStock ? "افزودن به سبد" : "ناموجود"}
                    iconLeft="ShoppingCart"
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      product.inStock
                        ? "bg-yellow-600 text-white hover:bg-yellow-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </>
        );

      default:
        return null;
    }
  };

  return <>{renderCard()}</>;
};

export default Card;
