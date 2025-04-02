'use client'

import clsx from 'clsx'

interface DropdownProps {
	children: React.ReactNode
}

const DropdownMenu = ({ children }: DropdownProps) => (
	<div className="relative inline-block text-left">{children}</div>
)

interface TriggerProps {
	onClick: () => void
	className?: string
	children: React.ReactNode
}

const DropdownTrigger = ({ onClick, className, children }: TriggerProps) => (
	<button type="button" onClick={onClick} className={clsx("cursor-pointer", className)}>
		{children}
	</button>
)

interface ContentProps {
	isOpen: boolean
	children: React.ReactNode
}

const DropdownContent = ({ isOpen, children }: ContentProps) => (
	<div
		className={`absolute right-0 mt-2 z-50 min-w-[12rem] overflow-hidden rounded-xl border border-zinc-300/10 bg-zinc-900 px-5 py-3 shadow-lg z-50 ${isOpen ? 'block' : 'hidden'}`}
	>
		{children}
	</div>
)

export {
	DropdownMenu,
	DropdownTrigger,
	DropdownContent
}
