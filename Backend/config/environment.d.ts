declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT?: string;
      MONGO_URI: string; 
    }
  }
}

export {};
