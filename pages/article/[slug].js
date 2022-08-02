import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { Seo, NextImage } from "../../components";
import { fetchApi } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import Link from "next/link";

export const getStaticPaths = async () => {
	const articlesRes = await fetchApi("/articles", { fields: ["slug"] });

	const paths = articlesRes.data.map((article) => ({
		params: {
			slug: article.attributes.slug,
		},
	}));

	return {
		paths: paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params }) => {
	const articleRes = await fetchApi("/articles", {
		filters: {
			slug: params.slug,
		},
		populate: ["image", "category", "author.picture"],
	});

	return {
		props: {
			article: articleRes.data[0],
		},
		revalidate: 30,
	};
};

const Article = ({ article }) => {
	const imageUrl = getStrapiMedia(article.attributes.image);
	const seo = {
		metaTitle: article.attributes.title,
		metaDescription: article.attributes.description,
		shareImage: article.attributes.image,
		article: true,
	};

	return (
		<>
			<Seo seo={seo} />
			<div className='post-page'>
				<div className='min-h-screen max-w-[1500px] mx-auto'>
					<div className='w-full h-full flex justify-between'>
						<div className='border-r border-black/20 min-h-screen w-20 relative hidden lg:block'>
							<nav className='h-full'>
								<div className='h-screen sticky top-0'>
									<div className='py-10 flex justify-center'>
										<Link href='/'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
												className='cursor-pointer'
												fill='none'
												stroke='#2d2d2d'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'>
												<line x1='19' y1='12' x2='5' y2='12'></line>
												<polyline points='12 19 5 12 12 5'></polyline>
											</svg>
										</Link>
									</div>
								</div>
							</nav>
						</div>
						<main className='flex-1'>
							<div className='pb-20 border-b border-black/20'>
								<div className='flex justify-center'>
									<div className='max-w-[692px] w-full min-w-0 mx-6 lg:mx-8'>
										<article>
											<header className='mt-14 mb-20'>
												<div className='flex items-center'>
													<Link href='/'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'
															className='cursor-pointer mr-4 lg:hidden'
															fill='none'
															stroke='#2d2d2d'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'>
															<line x1='19' y1='12' x2='5' y2='12'></line>
															<polyline points='12 19 5 12 12 5'></polyline>
														</svg>
													</Link>
													<div className='h-12 w-12 mr-4 rounded-full overflow-hidden relative'>
														<NextImage image={article.attributes.author.data.attributes.picture} />
													</div>
													<div>
														<div className='text-base font-semibold text-black mb-2'>
															{article.attributes.author.data.attributes.name}
														</div>
														<div className='flex gap-2 items-center'>
															<div className='text-xs text-black/75 font-medium'>
																<Moment format='MMM Do YYYY'>{article.attributes.published_at}</Moment>
															</div>
															<span className='text-xs text-black/75'>·</span>
															<div className='text-xs text-black/75 font-medium'>4 min read</div>
														</div>
													</div>
												</div>
											</header>
											<section className='mt-6'>
												<h1 className='text-4xl lg:text-6xl font-bold text-black mb-10'>{article.attributes.title}</h1>
												<h3 className='text-lg lg:text-xl font-medium text-black/75 mb-8'>
													{article.attributes.description}
												</h3>
												<div className='w-full h-[400px] overflow-hidden mb-10'>
													<img className='w-full h-full object-cover object-center' src={imageUrl} alt='' />
												</div>
												<div className='article-content'>
													<ReactMarkdown
														children={article.attributes.content}
														components={{
															h1: (props) => (
																<h1 className='text-3xl lg:text-4xl font-bold tracking-wide mt-10 mb-5' {...props} />
															),
															h2: (props) => (
																<h2 className='text-2xl lg:text-3xl font-bold tracking-wide mt-10 mb-5' {...props} />
															),
															h3: (props) => <h3 className='text-xl lg:text-2xl font-bold mt-10 mb-5' {...props} />,
															h4: (props) => <h4 className='text-lg lg:text-xl font-bold mt-10 mb-5' {...props} />,
															ul: ({ children }) => <ul className='list-disc my-5 ml-4'>{children}</ul>,
															ol: ({ children }) => <ol className='list-decimal my-5 ml-4'>{children}</ol>,
															li: ({ children }) => (
																<li className='text-base font-medium text-gray-600 mb-2'>{children}</li>
															),
															link: ({ children }) => (
																<a className='text-base font-medium text-blue-600 underline underline-offset-1 cursor-pointer mb-2'>
																	{children}
																</a>
															),
															blockquote: ({ children }) => (
																<blockquote className='text-xl lg:text-2xl text-center font-semibold text-gray-700 my-20 py-10 border-y border-gray-900/10'>
																	{children}
																</blockquote>
															),
														}}
													/>
												</div>
											</section>
										</article>
									</div>
								</div>
							</div>
						</main>
						<div className='w-96 min-h-screen px-8 border-l border-black/20 hidden lg:block'>
							<div className='h-full w-full relative inline-block'>
								<div className='sticky top-0'>
									<div className='min-h-screen'>
										<div className='pt-40'>
											<div className='h-20 w-20 rounded-full overflow-hidden mb-4  relative'>
												<NextImage image={article.attributes.author.data.attributes.picture} />
											</div>
											<div className='text-md font-semibold text-black mb-2'>
												{article.attributes.author.data.attributes.name}
											</div>
											<div className='text-sm text-black/75'>{article.attributes.author.data.attributes.email}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Article;
