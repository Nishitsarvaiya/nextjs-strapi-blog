import NextImage from "next/image";
import { getStrapiMedia } from "../lib/media";

const Image = ({ image }) => {
	const { alt } = image.data.attributes;
	return (
		<NextImage layout='fill' objectFit='cover' src={getStrapiMedia(image)} alt={alt || ""} className='w-full h-full' />
	);
};

export default Image;
