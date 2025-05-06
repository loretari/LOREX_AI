'use client';

import { cva } from "class-variance-authority";
import React, {forwardRef, HTMLAttributes, useEffect, useState} from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import  { type MotionProps } from "framer-motion";


export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
    block?: boolean;
} & HTMLAttributes<HTMLButtonElement> &
    MotionProps;

const classes = cva("text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg", {
    variants: {
        block: {
            true: "w-full",
        },
        variant: {
            primary:
                "border-gradient",
            secondary: "bg-gray-100 text-gray-950",
            tertiary: "bg-gray-800 text-gray-200",
            quaternary: "bg-gray-900 text-gray-200"
        },
    },
    defaultVariants: {
        variant: "primary",
        block: false,
    },
});

//
// export const Button =  (props: ButtonProps) => {
//     const {
//         className = "",
//         children,
//         variant = "primary",
//         ...otherProps
//     } = props;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", children, variant = "primary", block = false, ...otherProps }, ref) => {

    const [isHovered, setIsHovered] = useState(false);
    const angle = useMotionValue(45);
    const background = useMotionTemplate`linear-gradient(var(--color-gray-950),var(--color-gray-950)) padding-box, conic-gradient(from ${angle}deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400)) border-box`;

    useEffect(() => {
       if (isHovered) {
           animate(angle, angle.get() + 360, {
               duration: 1,
               ease: "linear",
               repeat: Infinity
           })
       } else {
           animate(angle, 45, {duration: 0.5});
       }
    }, [isHovered, angle])

    return (
        <motion.button
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={classes({ variant, block, className})}
            style={
                variant === "primary"
                    ? {
                background
            }
            : undefined
            }
            type= "button"
            {...otherProps}
        >
            { children }
        </motion.button>
    );
}
)
Button.displayName = "Button";

