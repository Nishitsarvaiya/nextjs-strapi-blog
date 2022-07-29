import qs from "qs";

/**
 * Helper to get full Strapi URL from path
 * @param {string} path : Path of the URL
 * @returns {string} : Full Strapi API URL
 */
export const getStrapiURL = (path = "") => {
	return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
};

/**
 * Helper to make API calls to Strapi API endpoints
 * @param {string} path : path of the API route
 * @param {Object} queryParams : query parameters, will be stringified
 * @param {Object} options : options passed to fetch
 * @returns Parsed API call Response
 */
export const fetchApi = async (path, queryParams = {}, options = {}) => {
	// Merge default and user options
	const mergedOptions = {
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	};

	// Build query string
	const queryString = qs.stringify(queryParams);
	const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

	// Trigger Api Call
	const res = await fetch(requestUrl, mergedOptions);

	// Handle response
	if (!res.ok) {
		console.error(res.status, "::", res.statusText);
		throw new Error(`Something went wrong! Please try again later.`);
	}

	const data = await res.json();
	return data;
};
