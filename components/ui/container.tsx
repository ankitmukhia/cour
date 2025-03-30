'use client'

import clsx from 'clsx'

export const Container = ({ children, className }: {
	children: React.ReactNode,
	className?: string
}) => {
	return (
		<div className={clsx("container mb-12 max-w-3xl mx-auto px-2", className)}>
			{children}
		</div>
	)
}
