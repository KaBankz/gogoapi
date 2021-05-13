declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      HOME: string;
      PORT?: string;
      BABEL_ENV?: string;
      dirname?: string;
      GOGOANIME_URL?: string;
    }
  }
}

export {};
