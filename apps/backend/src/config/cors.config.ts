const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: process.env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
};

export default corsOptions;
