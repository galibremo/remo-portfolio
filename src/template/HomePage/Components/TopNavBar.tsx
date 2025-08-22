export default function TopNavBar() {
	return (
		<header className="fixed top-0 right-0 left-0 z-50 shadow-sm">
			<div className="mx-auto flex max-w-7xl items-center justify-between p-4">
				<div className="text-lg font-semibold">REMO.</div>
				<div className="space-x-6">
					<a href="#home" className="underline-offset-4 hover:underline">
						Home
					</a>
					<a href="#about" className="underline-offset-4 hover:underline">
						About
					</a>
					<a href="#education" className="underline-offset-4 hover:underline">
						Education
					</a>
					<a href="#projects" className="underline-offset-4 hover:underline">
						Projects
					</a>
					<a href="#contact" className="underline-offset-4 hover:underline">
						Contact
					</a>
				</div>
			</div>
		</header>
	);
}
