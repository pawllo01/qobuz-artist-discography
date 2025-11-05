const STORES = require('./stores.json');

function validateStore(store, res) {
  if (!STORES.includes(store)) {
    res.status(400).json({ error: 'Invalid store', stores: STORES });
    return false;
  }
  return true;
}

async function fetchStoreCookies(store) {
  const res = await fetch(`https://www.qobuz.com/${store}/discover`);
  return res.headers.get('set-cookie');
}

module.exports = { validateStore, fetchStoreCookies };
