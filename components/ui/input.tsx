import clsx from 'clsx'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	ref?: React.Ref<HTMLInputElement>
}

export const Input: React.FC<InputProps> = ({ className, ref, ...props }) => {
	return (
		<input
			ref={ref}
			className={clsx("flex h-10 w-full border border-zinc-300/30 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-orange-500", className)}
			{...props}
		/>
	)
};
