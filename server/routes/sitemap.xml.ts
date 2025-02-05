import { SitemapStream, streamToPromise } from 'sitemap';

// noinspection TypeScriptUnresolvedFunction
export default defineEventHandler(async (event) => {
    const sitemap = new SitemapStream({ hostname: 'https://luxmax.co' });

    // Our root page.
    sitemap.write({ url: '/' });

    // Other page URLs.
    sitemap.write({ url: '/dry-cleaning' });
    sitemap.write({ url: '/sellpage' });
    sitemap.write({ url: '/repair' });
    sitemap.write({ url: '/market' });

    sitemap.end();

    return await streamToPromise(sitemap);
});
