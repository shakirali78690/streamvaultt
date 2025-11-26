const data = require('./data/streamvault-data.json');

const episodes = data.episodes.filter(e => e.showId === '3d34d92d-66b7-4645-a165-94a0e2223ff7');

console.log('Checking Stranger Things episode thumbnails:\n');

episodes.slice(0, 10).forEach(e => {
  console.log(`S${e.season}E${e.episodeNumber}: ${e.title}`);
  console.log(`  Thumbnail: ${e.thumbnail || e.thumbnailUrl || 'NONE'}`);
  console.log('');
});
