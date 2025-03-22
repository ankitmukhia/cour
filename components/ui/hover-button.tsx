'use client';

import React from 'react'

export const Slider = () => {
		return (
			<div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
				<div className="relative h-full w-8 bg-white/20" />
			</div>
		)
}

export const HoverButton = ({ children }: { children: React.ReactNode }) => {
	return (
		<button
			className="group relative inline-flex h-10 bg-orange-500 cursor-pointer items-center justify-center overflow-hidden rounded-full px-4 text-sm font-medium text-[#FDFFF4] transition duration-300 hover:rotate-1 hover:scale-110">
			<span className="relative z-10 transition-transform group-hover:scale-110">
				{children}
			</span>

			<Slider />
		</button>
	);
}
