import cheerio from 'cheerio';
import { Search } from '../interfaces';
import { gogoClient } from '../helpers';

async function scrape(query: string, page: number = 1) {
  const { data } = await gogoClient.get(`/search.html?keyword=${query}&page=${page}`);
  const $ = cheerio.load(data);

  const scrappedData: Search[] = [];
  $('.last_episodes li').each((_index, element) => {
    const title = $(element).find('.name > a').text().trim();
    const cover = $(element).find('.img > a > img').attr('src');
    const year = +$(element)
      .find('.released')
      .text()
      .replace(/(?:released:)/i, '')
      .trim();
    const slug = $(element)
      .find('.name > a')
      .attr('href')
      ?.replace(/^(?:\/category\/)/im, '');
    scrappedData.push({
      title: title || null,
      cover: cover || null,
      year: year || null,
      slug: slug || null,
    });
  });
  return scrappedData;
}

export default scrape;
