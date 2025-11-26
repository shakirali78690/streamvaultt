const data = require('./data/streamvault-data.json');

const episodes = data.episodes.filter(e => e.showId === '3d34d92d-66b7-4645-a165-94a0e2223ff7');
console.log('Total Stranger Things episodes:', episodes.length);

const bySeason = {};
episodes.forEach(e => {
  if (!bySeason[e.season]) bySeason[e.season] = [];
  bySeason[e.season].push({
    ep: e.episodeNumber || e.episode,
    title: e.title,
    videoUrl: e.videoUrl ? e.videoUrl.substring(0, 60) : 'NO URL'
  });
});

Object.keys(bySeason).sort((a, b) => parseInt(a) - parseInt(b)).forEach(s => {
  console.log(`\nSeason ${s} (${bySeason[s].length} episodes):`);
  bySeason[s].sort((a, b) => a.ep - b.ep).forEach(e => {
    console.log(`  E${e.ep}: ${e.videoUrl}`);
  });
});
