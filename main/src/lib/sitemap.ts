import { ApiService } from '@/lib/api'

interface Sitemap {
    url: string,
    lastModified: Date
}

export async function generateSitemap(): Promise<Sitemap[]> {
    const { data, error } = await ApiService.allPages()
    if (data) {
        const items = data.flatMap(({ updated_at, slug: url }) => {

            const lastModified = updated_at ? new Date(
                Number(updated_at) * 1000
            ) : new Date(1689516774174)

            return [
                {
                    url: `https://arible.co/styles/${url}`,
                    lastModified,
                },
                {
                    url: `https://www.arible.co/styles/${url}`,
                    lastModified,
                },
                // {
                //     url: `https://arible.co/styles-amp/${url}`,
                //     lastModified,
                // }
            ]
        })

        return items
    } else {
        return []
    }
}

export function generateSitemapXml(sitemap: Sitemap[]) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (let item of sitemap) {
        xml += `<url>`;
        xml += `<loc>${item.url}</loc>`;
        xml += `<lastmod>${item.lastModified.toISOString()}</lastmod>`;
        xml += `</url>`;
    }

    xml += `</urlset>`;
    return xml;
}
