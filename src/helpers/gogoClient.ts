import axios from 'axios';
import UserAgent from 'user-agents';

const userAgent = new UserAgent({ deviceCategory: 'desktop' });

const GOGOANIME_URL = process.env.GOGOANIME_URL;

const gogoClient = axios.create({
  baseURL: GOGOANIME_URL,
  headers: {
    'User-Agent': userAgent.toString(),
    'referer': GOGOANIME_URL,
  },
});

export default gogoClient;
