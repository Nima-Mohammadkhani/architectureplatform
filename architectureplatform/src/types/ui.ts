import * as Icons from "lucide-react";
import React from "react";

export interface ButtonProps {
  title?: string;
  onClick?: () => void;
  link?: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode | keyof typeof Icons;
  iconRight?: React.ReactNode | keyof typeof Icons;
  fullWidth?: boolean;
}

export interface IconProps {
  name: keyof typeof Icons;
  size?: "sm" | "md" | "lg" | number;
  color?: string;
  label?: string;
  onClick?: () => void;
  className?: string;
  hoverEffect?: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  secureToggle?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

export interface AnimationConfig {
  y?: number[];
  x?: number[];
  rotate?: number[];
  opacity?: number[];
  scale?: number[];
}

export interface Ielements {
  id: number;
  type: "circle" | "square" | "triangle" | "diamond";
  size: string;
  color: string;
  position: string;
  animation: AnimationConfig;
  duration: number;
}

export interface BaseProject {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  area: string;
  location: string;
}

export interface IblogProduct {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface IfeaturedProjects extends BaseProject {
  year?: string;
}

export interface Iprojects extends BaseProject {
  year: string;
  gallery: string[];
}

export type IsortedProducts = (
  | {
      id: number;
      title: string;
      category: string;
      price: number;
      originalPrice: number;
      image: string;
      rating: number;
      reviews: number;
      description: string;
      inStock: boolean;
      featured: boolean;
    }
  | {
      id: number;
      title: string;
      category: string;
      price: number;
      image: string;
      rating: number;
      reviews: number;
      description: string;
      inStock: boolean;
      featured: boolean;
      originalPrice?: undefined;
    }
)[];

export interface IprojectTypes {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
}

export interface Iservices {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

export interface IcardProps {
  project?: IfeaturedProjects | Iprojects;
  post?: IblogProduct;
  sortedProducts?: IsortedProducts;
  index?: number;
  type?:
    | "topPortfolios"
    | "service"
    | "gallery"
    | "blog"
    | "shop"
    | "consultantType"
    | "selectConsultant";
  service?: Iservice;
  services?: Iservices | IConsultationService[];
  setSelectedProject?: (project?: IfeaturedProjects | Iprojects) => void;
  setSelectedService?: (id?: string | number) => void;
  selectedService?: string;
  categories?: Icategories[];
  consultants?: IConsultant[];
  selectedConsultant?: string;
  setSelectedConsultant?: (id?: string) => void;
  onAddToCart?: (product: any) => void;
}

export interface Iservice {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  link: string;
}

export interface Istats {
  number: string;
  label: string;
  icon: React.ReactNode;
}

export interface Itestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Icategories {
  id: string;
  name: string;
}

export interface ISlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  category: string;
}

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export type IconName = keyof typeof Icons;
export type ButtonVariant = ButtonProps["variant"];
export type ButtonSize = ButtonProps["size"];
export type ElementType = Ielements["type"];

export type CardType = IcardProps["type"];
export type ProjectType = IfeaturedProjects | Iprojects;

export const isFeaturedProject = (
  project: ProjectType
): project is IfeaturedProjects => {
  return "year" in project && project.year !== undefined;
};

export const isFullProject = (project: ProjectType): project is Iprojects => {
  return "gallery" in project && Array.isArray(project.gallery);
};

export const createAnimation = (
  config: Partial<AnimationConfig>
): AnimationConfig => ({
  y: [0, 0, 0],
  x: [0, 0, 0],
  rotate: [0, 0, 0],
  opacity: [1, 1, 1],
  scale: [1, 1, 1],
  ...config,
});

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IpageHeaderProps {
  pageName: string;
  title: string;
  description: string;
}

export interface IProjectType {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
}

export interface IFinishLevel {
  id: string;
  name: string;
  multiplier: number;
}

export interface ILocation {
  id: string;
  name: string;
  multiplier: number;
}

export interface IService {
  id: string;
  name: string;
  price: number;
}

export interface IServices {
  architectural: boolean;
  interior: boolean;
  supervision: boolean;
  consulting: boolean;
}

export interface IProjectDetailsProps {
  type: "area" | "project" | "floor" | "level" | "location" | "feature";
  area: string;
  setArea: (area: string) => void;
  floors: string;
  setFloors: (floors: string) => void;
  location: string;
  setLocation: (location: string) => void;
  locations: ILocation[];
  services: IServices;
  servicesList: IService[];
  setServices: (services: IServices) => void;
  projectTypes: IProjectType[];
  setProjectType: (type: string) => void;
  projectType: string;
  finishLevels: IFinishLevel[];
  finishLevel: string;
  setFinishLevel: (level: string) => void;
}

export interface ICalculatorState {
  projectType: string;
  area: string;
  floors: string;
  finishLevel: string;
  services: IServices;
  location: string;
  totalCost: number;
}

export interface IConsultationService {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

export interface IConsultant {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  image: string;
  bio: string;
}

export interface IConsultationFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
}

export interface IContactFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  formData: IConsultationFormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  selectedService: string;
  selectedConsultant: string;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  joinDate: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}
