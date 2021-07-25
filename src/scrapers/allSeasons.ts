import cheerio from 'cheerio';
import { gogoClient } from '../helpers';
import { Seasons } from '../interfaces';

async function scrape() {
  const { data } = await gogoClient.get('/');
  const $ = cheerio.load(data);

  const scrappedData: Seasons[] = [];

  $('.series > .recent nav.menu_series.cron > ul > li').each((_index, element) => {
    const seasons: { name: string; slug: string }[] = [];

    const year = +$(element)
      .find('span')
      .text()
      .replace(/[^0-9]/gim, '')
      .trim();

    $(element)
      .find('a')
      .each((_index, element) => {
        const name = $(element).text().trim();
        const slug = $(element).attr('href');
        seasons.push({ name, slug: slug || '' });
      });

    scrappedData.push({
      year: year || null,
      seasons: seasons || null,
    });
  });

  return scrappedData;
}

export default scrape;
