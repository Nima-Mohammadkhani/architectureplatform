import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator as CalcIcon } from "lucide-react";
import PageHeader from "../components/ui/pageHeader";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import ProjectDetails from "../components/projectDetails";
import {
  IProjectType,
  IFinishLevel,
  ILocation,
  IService,
  IServices,
} from "../types/ui";

const Calculator = () => {
  const [projectType, setProjectType] = useState<string>("residential");
  const [area, setArea] = useState<string>("");
  const [floors, setFloors] = useState<string>("1");
  const [finishLevel, setFinishLevel] = useState<string>("standard");
  const [services, setServices] = useState<IServices>({
    architectural: true,
    interior: false,
    supervision: false,
    consulting: false,
  });
  const [location, setLocation] = useState<string>("tehran");
  const [totalCost, setTotalCost] = useState<number>(0);

  const projectTypes: IProjectType[] = [
    {
      id: "residential",
      name: "مسکونی",
      icon: <Icon name="Home" className="w-5 h-5" />,
      basePrice: 5000000,
    },
    {
      id: "commercial",
      name: "تجاری",
      icon: <Icon name="Building" className="w-5 h-5" />,
      basePrice: 7000000,
    },
    {
      id: "interior",
      name: "دکوراسیون داخلی",
      icon: <Icon name="Palette" className="w-5 h-5" />,
      basePrice: 3000000,
    },
    {
      id: "consulting",
      name: "مشاوره",
      icon: <Icon name="Lightbulb" className="w-5 h-5" />,
      basePrice: 1000000,
    },
  ];

  const finishLevels: IFinishLevel[] = [
    { id: "basic", name: "پایه", multiplier: 1 },
    { id: "standard", name: "استاندارد", multiplier: 1.5 },
    { id: "premium", name: "لوکس", multiplier: 2.5 },
    { id: "luxury", name: "فوق لوکس", multiplier: 4 },
  ];

  const locations: ILocation[] = [
    { id: "tehran", name: "تهران", multiplier: 1.2 },
    { id: "other-cities", name: "سایر شهرهای بزرگ", multiplier: 1 },
    { id: "small-cities", name: "شهرهای کوچک", multiplier: 0.8 },
  ];

  const servicesList: IService[] = [
    { id: "architectural", name: "طراحی معماری", price: 0 }, // included in base
    { id: "interior", name: "طراحی داخلی", price: 2000000 },
    { id: "supervision", name: "نظارت بر اجرا", price: 1500000 },
    { id: "consulting", name: "مشاوره تخصصی", price: 500000 },
  ];

  useEffect(() => {
    calculateCost();
  }, [projectType, area, floors, finishLevel, services, location]);

  const calculateCost = () => {
    if (!area || parseInt(area) <= 0) {
      setTotalCost(0);
      return;
    }

    const selectedType = projectTypes.find((type) => type.id === projectType);
    const selectedFinish = finishLevels.find(
      (level) => level.id === finishLevel
    );
    const selectedLocation = locations.find((loc) => loc.id === location);

    if (!selectedType || !selectedFinish || !selectedLocation) {
      setTotalCost(0);
      return;
    }

    let baseCost = selectedType.basePrice * parseInt(area);

    const floorMultiplier = 1 + (parseInt(floors) - 1) * 0.1;
    baseCost *= floorMultiplier;

    baseCost *= selectedFinish.multiplier;

    baseCost *= selectedLocation.multiplier;

    let servicesCost = 0;
    Object.keys(services).forEach((serviceId) => {
      if (
        services[serviceId as keyof IServices] &&
        serviceId !== "architectural"
      ) {
        const service = servicesList.find((s) => s.id === serviceId);
        if (service) {
          servicesCost += service.price * parseInt(area);
        }
      }
    });

    setTotalCost(baseCost + servicesCost);
  };

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          pageName="محاسبه"
          title="هزینه"
          description="هزینه پروژه معماری و طراحی خود را به صورت تقریبی محاسبه کنید"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <ProjectDetails
              type={"project"}
              projectType={projectType}
              projectTypes={projectTypes}
              setProjectType={setProjectType}
            />

            <ProjectDetails type={"area"} area={area} setArea={setArea} />

            <ProjectDetails
              type={"floor"}
              floors={floors}
              setFloors={setFloors}
            />

            <ProjectDetails
              type="location"
              location={location}
              setLocation={setLocation}
              locations={locations}
            />

            <ProjectDetails
              type={"feature"}
              servicesList={servicesList}
              services={services}
              setServices={setServices}
            />
            <ProjectDetails
              type={"level"}
              finishLevels={finishLevels}
              finishLevel={finishLevel}
              setFinishLevel={setFinishLevel}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                برآورد هزینه پروژه
              </h3>

              {area && parseInt(area) > 0 ? (
                <motion.div
                  key={totalCost}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <div className="text-5xl font-light text-yellow-600 mb-2">
                      {Number(totalCost).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-600">تومان</div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">نوع پروژه:</span>
                      <span className="font-medium">
                        {
                          projectTypes.find((type) => type.id === projectType)
                            ?.name
                        }
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">متراژ:</span>
                      <span className="font-medium">{area} متر مربع</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">تعداد طبقات:</span>
                      <span className="font-medium">{floors} طبقه</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">سطح تشطیب:</span>
                      <span className="font-medium">
                        {
                          finishLevels.find((level) => level.id === finishLevel)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      خدمات انتخاب شده:
                    </h4>
                    <div className="space-y-2">
                      {servicesList
                        .filter(
                          (service) => services[service.id as keyof IServices]
                        )
                        .map((service) => (
                          <div
                            key={service.id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">
                              {service.name}
                            </span>
                            <span className="text-green-600">✓</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      این برآورد تقریبی است و قیمت نهایی بر اساس جزئیات پروژه
                      تعیین می‌شود.
                    </p>
                    <Button
                      title="درخواست مشاوره رایگان"
                      className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                    />
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <CalcIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    لطفاً متراژ پروژه خود را وارد کنید
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gray-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            توضیحات مهم
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">شامل محاسبه:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• طراحی معماری کامل</li>
                <li>• نقشه‌های اجرایی</li>
                <li>• محاسبات سازه</li>
                <li>• نقشه‌های تاسیسات</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                عوامل مؤثر در قیمت:
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• پیچیدگی پروژه</li>
                <li>• موقعیت جغرافیایی</li>
                <li>• زمان‌بندی اجرا</li>
                <li>• خدمات اضافی</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calculator;
