import * as Icons from "lucide-react";
import React from "react";

export interface ButtonProps {
  title?: string;
  onClick?: () => void;
  link?: string;
  variant?: "primary" | "secondary" | "outline" | "danger" | string;
  size?: "sm" | "md" | "lg" | "icon" | string;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
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

export interface Ielements {
  id: number;
  type: string;
  size: string;
  color: string;
  position: string;
  animation: {
    y?: number[];
    x?: number[];
    rotate?: number[];
    opacity?: number[];
    scale?: number[];
  };
  duration: number;
}

export interface IcardProps {
  project?: IfeaturedProjects;
  index?: number;
  type?: string;
  service?: Iservice;
}

export interface Istats {
  number: string;
  label: string;
  icon: React.ReactNode;
}

export interface IfeaturedProjects {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  area: string;
  location: string;
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

export interface Iservice {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  link: string;
}

export interface ErrorFallbackProps {
  error: Error;
}
