import { motion } from "framer-motion";
import Icon from "./ui/Icon";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { IContactFormProps } from "../types/ui";

const ContactForm: React.FC<IContactFormProps> = ({
  handleSubmit,
  formData,
  handleChange,
  selectedService,
  selectedConsultant,
}) => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          اطلاعات تماس و پروژه
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام و نام خانوادگی *
              </label>
              <div className="relative">
                <Icon
                  name="User"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل *
              </label>
              <div className="relative">
                <Icon
                  name="Mail"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                شماره تماس *
              </label>
              <div className="relative">
                <Icon
                  name="Phone"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="شماره تماس خود را وارد کنید"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع پروژه
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="">انتخاب کنید</option>
                <option value="residential">مسکونی</option>
                <option value="commercial">تجاری</option>
                <option value="renovation">بازسازی</option>
                <option value="interior">طراحی داخلی</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                بودجه تقریبی
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="">انتخاب کنید</option>
                <option value="under-500m">زیر ۵۰۰ میلیون</option>
                <option value="500m-1b">۵۰۰ میلیون تا ۱ میلیارد</option>
                <option value="1b-2b">۱ تا ۲ میلیارد</option>
                <option value="over-2b">بالای ۲ میلیارد</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                زمان‌بندی پروژه
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="">انتخاب کنید</option>
                <option value="asap">فوری</option>
                <option value="1-3months">۱ تا ۳ ماه</option>
                <option value="3-6months">۳ تا ۶ ماه</option>
                <option value="over-6months">بیش از ۶ ماه</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات پروژه
            </label>
            <div className="relative">
              <Icon
                name="FileText"
                className="absolute right-3 top-3 text-gray-400 w-5 h-5"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                placeholder="لطفاً درباره پروژه خود توضیح دهید..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاریخ مورد نظر
              </label>
              <div className="relative">
                <Icon
                  name="Calendar"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <Input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ساعت مورد نظر
              </label>
              <div className="relative">
                <Icon
                  name="Clock"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                />
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="09:00">۹:۰۰ صبح</option>
                  <option value="10:00">۱۰:۰۰ صبح</option>
                  <option value="11:00">۱۱:۰۰ صبح</option>
                  <option value="14:00">۲:۰۰ ظهر</option>
                  <option value="15:00">۳:۰۰ بعدازظهر</option>
                  <option value="16:00">۴:۰۰ بعدازظهر</option>
                  <option value="17:00">۵:۰۰ بعدازظهر</option>
                </select>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            title="ثبت درخواست مشاوره"
            disabled={!selectedService || !selectedConsultant}
            className={`w-full py-4 rounded-lg font-medium text-lg transition-colors ${
              selectedService && selectedConsultant
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          />
        </form>
      </motion.div>
    </section>
  );
};
export default ContactForm;
