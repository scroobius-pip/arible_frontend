import { ApiService } from '@/lib/api'

export default async function sitemap() {
    const { data, error } = await ApiService.allPages()
    if (data) {
        const items = data.flatMap(({ updated_at, slug: url }) => {

            const lastModified = updated_at ? new Date(
                Number(updated_at) * 1000
            ) : new Date(1689516774174)

            return [{
                url: `https://arible.co/styles/${url}`,
                lastModified,
            },
            {
                url: `https://arible.co/styles-amp/${url}`,
                lastModified,
            }
            ]
        })

        return items
    }
}