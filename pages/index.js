import { Layout, Seo, Articles } from "../components";
import { fetchApi } from "../lib/api";

export const getStaticProps = async () => {
	// Run Api calls in Parallel
	const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
		fetchApi("/articles", { populate: ["image", "category", "author.picture"] }),
		fetchApi("/categories", { populate: "*" }),
		fetchApi("/homepage", { populate: { hero: "*", seo: { populate: "*" } } }),
	]);

	return {
		props: {
			articles: articlesRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
		},
		revalidate: 10,
	};
};

const Home = ({ articles, categories, homepage }) => {
	return (
		<Layout categories={categories}>
			<Seo seo={homepage.attributes.seo} />
			<main className='page'>
				<div className='container mx-auto py-16'>
					<h1 className='text-9xl font-bold mb-20'>{homepage.attributes.hero.title}</h1>
					<Articles articles={articles} />
				</div>
			</main>
		</Layout>
	);
};

export default Home;
