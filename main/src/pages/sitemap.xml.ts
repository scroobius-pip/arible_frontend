import { generateSitemap, generateSitemapXml } from '@/lib/sitemap'
import { GetServerSideProps } from 'next'

export default function Sitemap() {
}

export async function getServerSideProps({ res }: any) {
    const sitemap = await generateSitemap()
    const xml = generateSitemapXml(sitemap)
    res.setHeader('Content-Type', 'text/xml')
    res.write(xml)
    res.end()
    return { props: {} }
}