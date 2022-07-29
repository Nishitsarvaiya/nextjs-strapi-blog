import Header from "./header";

const Layout = ({ children, categories, seo }) => {
	return (
		<div className='site-wrapper'>
			<Header categories={categories} />
			{children}
			{/* Footer */}
		</div>
	);
};

export default Layout;
