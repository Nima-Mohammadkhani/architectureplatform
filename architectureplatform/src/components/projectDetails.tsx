import Input from "./ui/Input";
import { IProjectDetailsProps } from "../types/ui";

const ProjectDetails: React.FC<IProjectDetailsProps> = ({
  type,
  area,
  setArea,
  floors,
  setFloors,
  location,
  setLocation,
  locations,
  services,
  servicesList,
  setServices,
  projectTypes,
  setProjectType,
  projectType,
  finishLevels,
  finishLevel,
  setFinishLevel,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const renderContent = () => {
    switch (type) {
      case "area":
        return (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              متراژ (متر مربع)
            </label>
            <Input
              inputMode="numeric"
              min="1"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="مثال: 150"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            />
          </div>
        );

      case "project":
        return (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              نوع پروژه
            </label>
            <div className="grid grid-cols-2 gap-3">
              {projectTypes?.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={`p-4 rounded-lg border-2 text-right transition-colors ${
                    projectType === type.id
                      ? "border-yellow-600 bg-yellow-50 text-yellow-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    {type.icon}
                    <span className="mr-2 font-medium">{type.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case "floor":
        return (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              تعداد طبقات
            </label>
            <select
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} طبقه
                </option>
              ))}
            </select>
          </div>
        );

      case "level":
        return (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              سطح تجهیزات و تشطیب
            </label>
            <div className="flex flex-col gap-2">
              {finishLevels?.map((level) => (
                <label
                  key={level.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Input
                    type="radio"
                    name="finishLevel"
                    value={level.id}
                    checked={finishLevel === level.id}
                    onChange={(e) => setFinishLevel(e.target.value)}
                    className="text-yellow-600 focus:ring-yellow-600"
                  />
                  <span className="text-gray-900">{level.name}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "location":
        return (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              موقعیت پروژه
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            >
              {locations?.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        );

      case "feature":
        return (
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              خدمات مورد نیاز
            </label>
            <div className="space-y-3">
              {servicesList?.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex justify-center items-center gap-2">
                    <Input
                      type="checkbox"
                      checked={services[service.id as keyof IServices]}
                      onChange={(e) =>
                        setServices({
                          ...services,
                          [service.id]: e.target.checked,
                        })
                      }
                      disabled={service.id === "architectural"}
                      className="text-yellow-600 focus:ring-yellow-600 checkbox"
                    />
                    <span className="text-gray-900">{service.name}</span>
                    {service.id === "architectural" && (
                      <span className="text-sm text-gray-500 mr-2">
                        (شامل قیمت پایه)
                      </span>
                    )}
                  </div>
                  {service.price > 0 && (
                    <span className="text-sm text-gray-600">
                      {formatPrice(service.price)} تومان/متر
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default ProjectDetails;
