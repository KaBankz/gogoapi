import cheerio from 'cheerio';
import { URLSearchParams } from 'url';
import { gogoClient } from '../helpers';
import { Common, Paths } from '../interfaces';

async function scrape(path: Paths, page: number = 1, query: string = '', index: string | number = '') {
  const queries = new URLSearchParams({
    page: page.toString(),
    keyword: query,
    aph: index.toString(),
  }).toString();

  const { data } = await gogoClient.get(`${path}?${queries}`);
  const $ = cheerio.load(data);

  const scrappedData: Common[] = [];

  $('.last_episodes li').each((_index, element) => {
    const title = $(element).find('.name > a').text().trim();
    const cover = $(element).find('.img > a > img').attr('src');
    const year = +$(element)
      .find('.released')
      .text()
      .replace(/(?:released:)/i, '')
      .trim();
    const episode = +$(element)
      .find('.episode')
      .text()
      .replace(/(?:episode)/i, '')
      .trim();
    const slug = $(element)
      .find('.name > a')
      .attr('href')
      ?.replace(/^(?:\/category\/)|^(?:\/)|(?:-episode-\d+)$/gim, '');

    scrappedData.push({
      title: title || null,
      cover: cover || null,
      year: year || null,
      episode: episode || null,
      slug: slug || null,
    });
  });

  return scrappedData;
}

export default scrape;
