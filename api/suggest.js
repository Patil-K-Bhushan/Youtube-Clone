export default async function handler(req, res) {
  const q = req.query.q || "";
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`;
  const upstream = await fetch(url);
  const body = await upstream.text();
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(body);
}
