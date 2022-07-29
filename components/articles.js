import { Card } from "../components";

const Articles = ({ articles }) => {
	const leftArticlesCount = Math.ceil(articles.length / 5);
	const leftArticles = articles.slice(0, leftArticlesCount);
	const rightArticles = articles.slice(leftArticlesCount, articles.length);

	return (
		<div className='articles'>
			<div className='articles-grid flex items-start gap-12'>
				<div className='flex-1 flex flex-col gap-12'>
					{leftArticles.map((article) => (
						<Card article={article} size='large' key={`article_left__${article.attributes.slug}`} />
					))}
				</div>
				<div className='flex-1 grid grid-cols-2 gap-12'>
					{rightArticles.map((article) => (
						<Card article={article} key={`article_right__${article.attributes.slug}`} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Articles;
