import { getStrapiURL } from "./api";

export const getStrapiMedia = (media) => {
	const { url } = media.data.attributes;
	const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
	return imageUrl;
};
