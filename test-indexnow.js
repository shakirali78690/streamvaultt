// Quick test of IndexNow API
const apiKey = '430747cadbbf78f339306f7049a8f3c5';
const siteUrl = 'https://streamvault.live';

const payload = {
  host: 'streamvault.live',
  key: apiKey,
  keyLocation: `${siteUrl}/${apiKey}.txt`,
  urlList: [`${siteUrl}/`]
};

console.log('Testing IndexNow with payload:');
console.log(JSON.stringify(payload, null, 2));

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(payload)
})
.then(async response => {
  console.log(`\nStatus: ${response.status} ${response.statusText}`);
  const text = await response.text();
  console.log('Response:', text || '(empty)');
})
.catch(error => {
  console.error('Error:', error);
});
