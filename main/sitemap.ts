import { ApiService } from '@/lib/api'

export default async function sitemap() {
    const { data, error } = await ApiService.allPages()
    if (data) {
        return data.map(({ updated_at, slug: url }) => {

            const lastmod = updated_at ? new Date(
                Number(updated_at) * 1000
            ).toISOString() : new Date(1689516774174).toISOString()

            return {
                url,
                lastmod,
            }
        })
    }

}