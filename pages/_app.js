import App from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { createContext } from "react";
import { fetchApi } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

// Storing Strapi Global Object in Context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
	const { global } = pageProps;

	return (
		<>
			<Head>
				<link rel='shortcut icon' href={getStrapiMedia(global.attributes.favicon)} />
			</Head>
			<GlobalContext.Provider value={global.attributes}>
				<Component {...pageProps} />
			</GlobalContext.Provider>
		</>
	);
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
MyApp.getInitialProps = async (ctx) => {
	// Call App's getInitialProps and fill appProps.pageProps
	const appProps = await App.getInitialProps(ctx);

	// fetch global site settings from Strapi
	const globalRes = await fetchApi("/global", {
		populate: {
			favicon: "*",
			defaultSeo: {
				populate: "*",
			},
		},
	});

	return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
