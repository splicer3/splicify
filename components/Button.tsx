import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button
         type={type}
         className={twMerge(`
            w-full
            rounded-full
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
            from-teal-400
            to-indigo-700
            border
            border-transparent
            px-3
            py-3
            disabled:cursor-not-allowed
            disabled-opacity-50
            text-neutral-800
            font-bold
            hover:opacity-75
            transition
         `,
            className)}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button";
 
export default Button;