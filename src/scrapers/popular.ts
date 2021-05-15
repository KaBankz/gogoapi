import cheerio from 'cheerio';
import { Popular } from '../interfaces';
import { gogoClient } from '../helpers';

async function scrape(page: number = 1) {
  const { data } = await gogoClient.get(`/popular.html?page=${page}`);
  const $ = cheerio.load(data);

  const scrappedData: Popular[] = [];
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
      title: title,
      cover: cover,
      year: year,
      slug: slug,
    });
  });
  return scrappedData;
}

export default scrape;
