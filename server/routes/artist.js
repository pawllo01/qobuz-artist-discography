const express = require('express');
const { validateStore, fetchStoreCookies } = require('../utils');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { store } = req.query;

  if (!id || isNaN(Number(id)))
    return res.status(400).json({ error: 'Invalid artist ID. It must contain only digits.' });
  if (!validateStore(store, res)) return;

  const zone = store.split('-')[0].toUpperCase(); // ex. gb-en -> GB
  const ALBUMS = [];
  const limit = 500;
  let offset = 0;
  let data;

  try {
    const cookies = await fetchStoreCookies(store);
    const headers = {
      'x-app-id': process.env.X_APP_ID,
      cookie: cookies,
    };

    while (true) {
      const url = `https://www.qobuz.com/api.json/0.2/artist/get?artist_id=${id}&extra=albums_with_last_release&limit=${limit}&offset=${offset}&zone=${zone}&store=${store}`;
      const response = await fetch(url, { headers });
      data = await response.json();

      if (!response.ok) throw new Error(data.message || `Fetching artist failed`);

      const albums = data.albums_without_last_release?.items || [];
      const primaryAlbums = albums.filter((alb) => alb.artists.some((art) => art.id == id)); // skip composer albums
      ALBUMS.push(...primaryAlbums);

      if (albums.length < limit) break;
      offset += limit;
    }

    const result = {
      ...data,
      albums_without_last_release: {
        offset,
        limit,
        total: ALBUMS.length,
        items: ALBUMS,
      },
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
