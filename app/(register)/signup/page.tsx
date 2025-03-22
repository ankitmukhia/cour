import { SignupForm } from './form'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="flex flex-col gap-2 md:max-w-sm md:mx-auto mt-36">
			<h1 className="text-4xl font-bold text-center">Sign Up</h1>
			<p className="text-center">Enter your details below and start your free trial</p>

			<div className="mt-6">
				<SignupForm />
			</div>

			<div className="mt-4">
				<p className="text-center">
					Already have an account?{' '}
					<Link href="/signin" className="text-orange-500 hover:underline underline-offset-4">
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}
