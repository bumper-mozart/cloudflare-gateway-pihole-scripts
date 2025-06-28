// cf_test_manual_delete.js
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN env variables.');
  process.exit(1);
}

const CF_API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/gateway/lists`;

const getLists = async () => {
  const res = await fetch(CF_API, {
    headers: { Authorization: `Bearer ${API_TOKEN}` }
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error('Error fetching lists: ' + JSON.stringify(json.errors, null, 2));
  }
  return json.result;
};

const deleteList = async (listId) => {
  const res = await fetch(`${CF_API}/${listId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${API_TOKEN}` }
  });
  return res.json();
};

const main = async () => {
  try {
    console.log('Fetching lists...');
    const lists = await getLists();
    const target = lists.find(l => l.name && l.name.startsWith('xxx'));
    if (!target) {
      console.log('No list found with name starting by "xxx".');
      return;
    }
    console.log(`Attempting to delete: ${target.name} (ID: ${target.id})`);
    const result = await deleteList(target.id);
    if (result.success) {
      console.log('Delete successful!');
    } else {
      console.error('Delete failed:', JSON.stringify(result.errors, null, 2));
    }
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
};

main();
