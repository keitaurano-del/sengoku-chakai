"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: "button";
}

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  as: "a";
}

type Props = ButtonProps | AnchorProps;

const baseStyles =
  "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gold text-charcoal hover:bg-gold-light active:bg-gold/90",
  secondary:
    "border border-gold text-gold hover:bg-gold/10 active:bg-gold/20",
  ghost:
    "text-cream hover:text-gold active:text-gold-light",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button(props: Props) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (props.as === "a") {
    const { as, variant: _v, size: _s, ...anchorProps } = props as AnchorProps;
    return <a className={classes} {...anchorProps} />;
  }

  const { as, variant: _v, size: _s, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; variant?: Variant; size?: Size };
  return <button className={classes} {...buttonProps} />;
}
