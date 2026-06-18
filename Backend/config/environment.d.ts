declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT?: string;
      MONGO_URI: string; 
    }
  }
  namespace Express {
    interface Request {
      uid: string;
      name: string;
      email: string;
    }
  }
}

export {};
