import { Seo, Layout, Articles } from "../../components";
import { fetchApi } from "../../lib/api";

export async function getStaticPaths() {
	const categoriesRes = await fetchApi("/categories", { fields: ["slug"] });

	return {
		paths: categoriesRes.data.map((category) => ({
			params: {
				slug: category.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const matchingCategories = await fetchApi("/categories", {
		filters: { slug: params.slug },
		populate: {
			articles: {
				populate: ["image", "category", "author.picture"],
			},
		},
	});
	const allCategories = await fetchApi("/categories");

	return {
		props: {
			category: matchingCategories.data[0],
			categories: allCategories,
		},
		revalidate: 1,
	};
}

const Category = ({ category, categories }) => {
	const seo = {
		metaTitle: category.attributes.name,
		metaDescription: `All ${category.attributes.name} articles`,
	};

	return (
		<Layout categories={categories.data}>
			<Seo seo={seo} />
			<main className='page'>
				<div className='container mx-auto py-16'>
					<h1 className='text-9xl font-bold mb-20'>{category.attributes.name}</h1>
					<Articles articles={category.attributes.articles.data} />
				</div>
			</main>
		</Layout>
	);
};

export default Category;
