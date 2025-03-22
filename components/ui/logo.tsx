'use client'

import clsx from 'clsx'

export const Logo = ({ className }: {
		className: string
}) => {
	return (
			<div>
				<h1 className={clsx("font-serif", className)}>Cour.</h1>
			</div>
	)
}
