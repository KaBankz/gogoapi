import cheerio from 'cheerio';
import { Recent } from '../interfaces';
import { gogoClient } from '../helpers';

async function scrape(page: number = 1) {
  const { data } = await gogoClient.get(`/?page=${page}`);
  const $ = cheerio.load(data);

  const scrappedData: Recent[] = [];
  $('.last_episodes li').each((_index, element) => {
    const title = $(element).find('.name > a').text().trim();
    const cover = $(element).find('.img > a > img').attr('src');
    const episode = +$(element)
      .find('.episode')
      .text()
      .replace(/(?:episode)/i, '')
      .trim();
    const slug = $(element)
      .find('.name > a')
      .attr('href')
      ?.replace(/^(?:\/)|(?:-episode-\d+)$/gim, '');
    scrappedData.push({
      title: title,
      cover: cover,
      episode: episode,
      slug: slug,
    });
  });
  return scrappedData;
}

export default scrape;
