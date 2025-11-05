const express = require('express');
const { validateStore } = require('../utils');

const router = express.Router();

router.get('/', async (req, res) => {
  const { q, store } = req.query;

  if (!q) return res.status(400).json({ error: 'Missing search query (q)' });
  if (!validateStore(store, res)) return;

  try {
    const url = `https://www.qobuz.com/v4/${store}/catalog/search/autosuggest?q=${q}`;
    const response = await fetch(url, { headers: { 'x-requested-with': 'XMLHttpRequest' } });

    if (!response.ok) throw new Error(`Qobuz API error (${response.status})`);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
