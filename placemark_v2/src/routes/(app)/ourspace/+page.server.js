import { userStore } from '$lib/models/mongo/user-store.js';
import { poiStore } from '$lib/models/mongo/poi-store.js';
import { getCountyForPoi, dominantCategory, categoryColours, calcGreenScore } from '$lib/services/geo.js';

export async function load() {
  const users = await userStore.getAllUsers();
  const allPois = [];
  const countyCats = {};

  const usersWithScores = await Promise.all(
    users.map(async (user) => {
      const pois = await poiStore.getUserPois(user._id);
      pois.forEach((poi) => {
        if (poi.lat && poi.lng) {
          const county = getCountyForPoi(poi.lat, poi.lng);
          allPois.push({
            name: poi.name,
            description: poi.description,
            category: poi.category || '',
            location: poi.location || '',
            lat: poi.lat,
            lng: poi.lng,
            owner: `${user.firstName} ${user.lastName}`,
            county: county || 'Unknown'
          });
          if (county) {
            if (!countyCats[county]) countyCats[county] = [];
            countyCats[county].push(poi.category || '');
          }
        }
      });
      const score = calcGreenScore(pois);
      const treeCount = score !== null ? Math.max(1, Math.round(score / 20)) : 0;
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        greenScore: score,
        treeCount,
        emptyCount: 5 - treeCount
      };
    })
  );

  const countyColours = {};
  Object.entries(countyCats).forEach(([county, cats]) => {
    const dom = dominantCategory(cats);
    countyColours[county] = dom ? categoryColours[dom] : '#cccccc';
  });

  return { active: 'ourspace', users: usersWithScores, allPois, countyColours };
}
