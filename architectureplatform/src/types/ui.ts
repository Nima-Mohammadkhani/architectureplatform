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

export interface IfeaturedProjects extends BaseProject {
  year?: string;
}

export interface Iprojects extends BaseProject {
  year: string;
  gallery: string[];
}


export interface IcardProps {
  project?: IfeaturedProjects | Iprojects;
  index?: number;
  type?: "topPortfolios" | "service" | "gallery";
  service?: Iservice;
  setSelectedProject?: (project?: IfeaturedProjects | Iprojects) => void;
  categories?: Icategories[];
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
export type ButtonVariant = ButtonProps['variant'];
export type ButtonSize = ButtonProps['size'];
export type ElementType = Ielements['type'];

export type CardType = IcardProps['type'];
export type ProjectType = IfeaturedProjects | Iprojects;

export const isFeaturedProject = (project: ProjectType): project is IfeaturedProjects => {
  return 'year' in project && project.year !== undefined;
};

export const isFullProject = (project: ProjectType): project is Iprojects => {
  return 'gallery' in project && Array.isArray(project.gallery);
};

export const createAnimation = (config: Partial<AnimationConfig>): AnimationConfig => ({
  y: [0, 0, 0],
  x: [0, 0, 0],
  rotate: [0, 0, 0],
  opacity: [1, 1, 1],
  scale: [1, 1, 1],
  ...config
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
