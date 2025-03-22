import React from "react";
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = (({ children, className, ...props }) => {
	return (
		<button
			className={clsx("bg-orange-500 text-white px-4 py-2 rounded-md", className)}
			{...props}
		>
			{children}
		</button>
	);
});
