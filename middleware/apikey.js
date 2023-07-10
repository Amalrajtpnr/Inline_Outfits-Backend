function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers.apikey;
    const owner = req.headers.owner;
    const key = process.env.API_key;
    const origin = process.env.ORIGIN;
    if (!apiKey && !owner) {
      return res.status(200).json({ error: "API key and owner is missing" });
    } else if (!owner) {
      return res.status(200).json({ error: "owner is missing" });
    } else if (!apiKey) {
      return res.status(200).json({ error: "API key is missing" });
    } else if (apiKey !== key) {
      return res.status(200).json({ error: "Invalid API key" });
    } else if (origin !== owner) {
      return res.status(200).json({ error: "origin and owner are not same" });
    }
    next();
  }
  
  module.exports = apiKeyMiddleware;