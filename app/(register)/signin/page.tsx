import { SignInForm } from './form'
import Link from 'next/link'

export default function Page() {
	return (
		<div className="flex flex-col gap-2 md:max-w-sm md:mx-auto mt-36">
			<h1 className="text-4xl font-bold text-center">Sign In</h1>
			<p className="text-center">Enter your details below</p>

			<div className="mt-6">
				<SignInForm />
			</div>

			<div className="mt-4">
				<p className="text-center">
					Already have an account?{' '}
					<Link href="/signup" className="text-orange-500 hover:underline underline-offset-4">
						Signup
					</Link>
				</p>
			</div>
		</div>
	)
}
