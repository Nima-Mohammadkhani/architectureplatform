import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../components/ui/Icon";
import PageHeader from "../components/ui/pageHeader";
import ContactForm from "../components/contactForm";
import Card from "../components/ui/card";
import {
  IConsultationService,
  IConsultant,
  IConsultationFormData,
} from "../types/ui";
import { toast } from "react-toastify";

const Consultation = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedConsultant, setSelectedConsultant] = useState<string>("");
  const [formData, setFormData] = useState<IConsultationFormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
  });

  const services: IConsultationService[] = [
    {
      id: "architecture",
      name: "مشاوره معماری",
      price: 500000,
      duration: "60 دقیقه",
      description: "مشاوره در طراحی و اجرای پروژه‌های معماری",
      features: [
        "بررسی نقشه‌ها",
        "ارائه راهکار",
        "پاسخ به سوالات",
        "گزارش کتبی",
      ],
    },
    {
      id: "interior",
      name: "مشاوره طراحی داخلی",
      price: 400000,
      duration: "45 دقیقه",
      description: "راهنمایی برای بهینه‌سازی فضای داخلی",
      features: [
        "تحلیل فضا",
        "پیشنهاد چیدمان",
        "انتخاب رنگ و متریال",
        "راهنمای خرید",
      ],
    },
    {
      id: "structural",
      name: "مشاوره سازه",
      price: 600000,
      duration: "75 دقیقه",
      description: "بررسی مسائل سازه‌ای و ایمنی ساختمان",
      features: [
        "بررسی سازه موجود",
        "ارزیابی ایمنی",
        "پیشنهاد تقویت",
        "محاسبات اولیه",
      ],
    },
    {
      id: "renovation",
      name: "مشاوره بازسازی",
      price: 350000,
      duration: "60 دقیقه",
      description: "راهنمایی برای بازسازی و نوسازی",
      features: [
        "برنامه‌ریزی مراحل",
        "برآورد هزینه",
        "انتخاب پیمانکار",
        "نظارت فنی",
      ],
    },
  ];

  const consultants: IConsultant[] = [
    {
      id: "ahmadi",
      name: "مهندس احمدی",
      speciality: "معماری و طراحی شهری",
      experience: "15 سال",
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "متخصص در طراحی ساختمان‌های مدرن و پایدار",
    },
    {
      id: "salehi",
      name: "مریم صالحی",
      speciality: "طراحی داخلی",
      experience: "12 سال",
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "خلاق در زمینه طراحی داخلی مدرن و کلاسیک",
    },
    {
      id: "rezaei",
      name: "دکتر رضایی",
      speciality: "مهندسی سازه",
      experience: "20 سال",
      rating: 5.0,
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "استاد دانشگاه و مشاور سازه‌های پیچیده",
    },
    {
      id: "mousavi",
      name: "علی موسوی",
      speciality: "مدیریت پروژه",
      experience: "18 سال",
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "متخصص مدیریت و اجرای پروژه‌های ساختمانی",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("درخواست شما با موفقیت ارسال شد.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      preferredDate: "",
      preferredTime: "",
    });
  };

  const handleServiceSelection = (id?: string | number) => {
    if (typeof id === "string") {
      setSelectedService(id);
    }
  };

  const handleConsultantSelection = (id?: string) => {
    if (id) {
      setSelectedConsultant(id);
    }
  };

  const selectedServiceData = services.find(
    (service) => service.id === selectedService
  );
  const selectedConsultantData = consultants.find(
    (consultant) => consultant.id === selectedConsultant
  );

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          pageName="درخواست"
          title="مشاوره"
          description=" با متخصصان معماری و طراحی داخلی ما مشورت کنید و بهترین راهکارها را دریافت کنید"
        />

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            مراحل درخواست مشاوره
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "انتخاب خدمت",
                desc: "نوع مشاوره مورد نیاز خود را انتخاب کنید",
              },
              {
                title: "انتخاب مشاور",
                desc: "از میان مشاوران ما، مناسب‌ترین را انتخاب کنید",
              },
              {
                title: "تکمیل فرم",
                desc: "اطلاعات پروژه و زمان مورد نظر را وارد کنید",
              },
              {
                title: "تایید و پرداخت",
                desc: "درخواست خود را تایید و پرداخت کنید",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                انتخاب نوع مشاوره
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  type="consultantType"
                  services={services}
                  setSelectedService={handleServiceSelection}
                  selectedService={selectedService}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                انتخاب مشاور
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  type="selectConsultant"
                  consultants={consultants}
                  selectedConsultant={selectedConsultant}
                  setSelectedConsultant={handleConsultantSelection}
                />
              </div>
            </motion.div>

            <ContactForm
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
              selectedService={selectedService}
              selectedConsultant={selectedConsultant}
            />
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 sticky top-24 border border-yellow-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                خلاصه درخواست
              </h3>

              {selectedServiceData ? (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    خدمت انتخاب شده:
                  </h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-gray-900">
                      {selectedServiceData.name}
                    </h5>
                    <p className="text-sm text-gray-600 mb-3">
                      {selectedServiceData.description}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>مدت زمان:</span>
                      <span className="font-medium">
                        {selectedServiceData.duration}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>هزینه:</span>
                      <span className="font-medium text-yellow-600">
                        {Number(selectedServiceData.price).toLocaleString()}{" "}
                        تومان
                      </span>
                    </div>
                  </div>

                  <h5 className="font-medium text-gray-900 mb-2">شامل:</h5>
                  <ul className="space-y-1">
                    {selectedServiceData.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Icon
                          name="CheckCircle"
                          className="w-4 h-4 text-green-500 ml-2 flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon
                    name="MessageSquare"
                    className="w-12 h-12 text-gray-300 mx-auto mb-3"
                  />
                  <p className="text-gray-500">
                    لطفاً نوع مشاوره را انتخاب کنید
                  </p>
                </div>
              )}

              {selectedConsultantData && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    مشاور انتخاب شده:
                  </h4>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedConsultantData.image}
                        alt={selectedConsultantData.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-medium text-gray-900">
                          {selectedConsultantData.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {selectedConsultantData.speciality}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{selectedConsultantData.experience} تجربه</span>
                          <span className="mx-2">•</span>
                          <span>⭐ {selectedConsultantData.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  مزایای مشاوره آنلاین:
                </h4>
                <ul className="space-y-2">
                  {[
                    "صرفه‌جویی در زمان",
                    "کیفیت مشاوره تضمینی",
                    "گزارش کتبی ارائه",
                    "پیگیری رایگان یک هفته‌ای",
                  ].map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <Icon
                        name="CheckCircle"
                        className="w-4 h-4 text-green-500 ml-2 flex-shrink-0"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
