import cheerio from 'cheerio';
import { gogoClient } from '../helpers';
import { Anime } from '../interfaces';

async function scrape(slug: string) {
  const { data } = await gogoClient.get(`category/${slug}`);
  const $ = cheerio.load(data);

  const scrappedData: Anime[] = [];

  $('.anime_info_body_bg').each((_index, element) => {
    const genres: { name: string; slug: string }[] = [];
    const title = $(element).find('h1').text().trim();
    const cover = $(element).find('img').attr('src');
    const year = +$(element)
      .find('.type:contains("Released")')
      .text()
      .replace(/(?:released:)/i, '')
      .trim();
    const format = $(element)
      .find('.type:contains("Type")')
      .text()
      .replace(/(?:type:)/i, '')
      .trim();
    const synopsis = $(element)
      .find('.type:contains("Plot Summary")')
      .text()
      .replace(/(?:plot summary:)/i, '')
      .trim();
    const status = $(element)
      .find('.type:contains("Status")')
      .text()
      .replace(/(?:status:)/i, '')
      .trim();
    const altTitles = $(element)
      .find('.type:contains("Other name")')
      .text()
      .replace(/(?:other name:)/i, '')
      .split(';')
      .map((e) => e.trim())
      .filter((e) => e.length > 0);
    $(element)
      .find('.type:contains("Genre") a')
      .each((_index, element) => {
        const name = $(element).attr('title');
        const slug = $(element).attr('href')?.split('/').pop();
        genres.push({ name: name || '', slug: slug || '' });
      });

    scrappedData.push({
      title: title,
      altTitles: altTitles.length > 0 ? altTitles : null,
      cover: cover || '',
      format: format,
      synopsis: synopsis,
      genres: genres,
      status: status,
      year: year || null,
    });
  });

  return scrappedData;
}

export default scrape;
