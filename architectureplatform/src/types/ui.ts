import * as Icons from "lucide-react";

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
