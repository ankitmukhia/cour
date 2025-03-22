interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }
import { clsx } from 'clsx'

export const GuestButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
	return (
		<button
			className={clsx("text-sm h-full px-4 w-full border border-zinc-300/30 py-2 rounded-md", className)}
			{...props}
		>
			{children}
		</button>
	);
};
