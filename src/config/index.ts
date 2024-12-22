const appConfig = {
  port: process.env.PORT ?? 3000,
  node_env: process.env.NODE_ENV ?? 'development',
  mongo_url: process.env.MONGO_URL!,
};

export default appConfig;
