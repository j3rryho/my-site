import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const writing = await getCollection('writing');
  const reviews = await getCollection('reviews');

  const allPosts = [...writing, ...reviews].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'STAYFOCUSED',
    description: 'Writing about what I observe — apps, books, running, and life.',
    site: context.site!,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      link: `/${post.collection}/${post.id}/`,
    })),
  });
}
