import Link from "next/link";

const Header = ({ categories }) => {
	return (
		<header className='w-full h-24'>
			<div className='container mx-auto py-4 h-full'>
				<nav className='w-full h-full flex items-center justify-between' role='navigation' aria-label='Navigation'>
					<div className='logo'>
						<Link href='/'>
							<a className='inline-block text-2xl font-bold text-black py-3 px-4 hover:bg-black/5 rounded transition duration-200 ease-linear'>
								Next.js + Strapi Blog
							</a>
						</Link>
					</div>
					<div className='flex items-center justify-end gap-4'>
						{categories.map((category) => (
							<div className='nav-item' key={category.id}>
								<Link href={`/category/${category.attributes.slug}`}>
									<a className='inline-block hover:bg-black/5 py-2 px-4 font-medium transition duration-200 ease-linear'>
										{category.attributes.name}
									</a>
								</Link>
							</div>
						))}
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
