declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PORT?: string;
      MONGO_URI: string; //  Cambiado de MONGO_CNN a MONGO_URI
    }
  }
  namespace Express {
    interface Request {
      uid: string;
      name: string;
    }
  }
}

export {};
