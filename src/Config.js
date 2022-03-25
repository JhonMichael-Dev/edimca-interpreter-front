const prod = {
  url: {
    API_URL: "http://172.16.148.80:8080",
    PDF_URL: "http://172.16.148.80:4000",
  },
  urlDbquery: {
    API_URL: "http://172.16.148.80:8081",
  },
  defaultTimeout: 5 * 3600 * 1000, // Five hours
};

const dev = {
  url: {
    API_URL: "http://localhost:8100",
    PDF_URL: "http://172.16.148.80:4000",
  },
  urlDbquery: {
    API_URL: "http://localhost:8081",
  },
  defaultTimeout: 2 * 3600 * 1000, // Two hours
};

export const conf = process.env.NODE_ENV === "development" ? dev : prod;
