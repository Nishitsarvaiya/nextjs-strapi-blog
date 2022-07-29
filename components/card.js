import Link from "next/link";
import { NextImage } from "../components";

const Card = ({ article, size }) => {
	return (
		<div className='card border shadow-lg'>
			<Link href={`/article/${article.attributes.slug}`}>
				<a className='card-link inline-block w-full h-full'>
					<div className='h-full flex flex-col justify-between'>
						<div className='card-content w-full h-full flex flex-col'>
							<div className={`card-image relative w-full ${size == "large" ? "h-[400px]" : "h-[240px]"}`}>
								<NextImage image={article.attributes.image} />
							</div>
							<div className='card-body flex flex-col gap-2 px-6 py-4'>
								<div className='card-category'>
									<span className='text-xs font-bold uppercase'>
										{article.attributes.category.data.attributes.name}
									</span>
								</div>
								<div className='card-title mb-5'>
									<h3 className='text-xl font-bold'>{article.attributes.title}</h3>
								</div>
							</div>
						</div>
						<div className='card-author border-t border-t-black/10 px-6 py-4 flex items-center gap-4'>
							<div className='author-image relative w-10 h-10 rounded-full overflow-hidden'>
								<NextImage image={article.attributes.author.data.attributes.picture} />
							</div>
							<div className='author-name'>
								<p className='text-sm font-medium text-black/75'>{article.attributes.author.data.attributes.name}</p>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
};

export default Card;
