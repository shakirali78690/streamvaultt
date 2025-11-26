// Quick test to verify comments API is working
// Run this after restarting the server: node test-comments-api.js

const testComment = {
  episodeId: '74dc6cc7-0056-44dd-892b-88b0d889c64a',
  userName: 'Test User',
  comment: 'Test comment 🔥'
};

fetch('http://localhost:5000/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testComment)
})
  .then(res => {
    console.log('Status:', res.status);
    return res.text();
  })
  .then(data => {
    console.log('Response:', data);
    try {
      const json = JSON.parse(data);
      console.log('Parsed JSON:', json);
    } catch (e) {
      console.log('Not JSON - likely HTML error page');
    }
  })
  .catch(err => console.error('Error:', err));
