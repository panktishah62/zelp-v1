import remoteConfig from '@react-native-firebase/remote-config';
import RemoteConfigService from './remoteConfigService';

const algoliaSearchApplicationId = RemoteConfigService.getRemoteValue(
    'AlgoliaSearchApplicationId',
).asString();

const algoliaSearchToken =
    RemoteConfigService.getRemoteValue('AlgoliaSearchToken').asString();

const algoliaSearchIndexSettings = JSON.parse(
    RemoteConfigService.getRemoteValue('AlgoliaSearchIndexSettings').asString(),
);
const minServicableRadius = RemoteConfigService.getRemoteValue(
    'minServicableRadius',
).asNumber();

const globalSearchQueryConfig = RemoteConfigService.getRemoteValue(
    'globalSearchQueryConfig',
)
    ? JSON.parse(
          RemoteConfigService.getRemoteValue(
              'globalSearchQueryConfig',
          ).asString(),
      )
    : {};

const algoliasearch = require('algoliasearch');
const client = algoliasearch(algoliaSearchApplicationId, algoliaSearchToken);
const index = client.initIndex('Items');

index.setSettings(algoliaSearchIndexSettings);

export const searchbyAlgolia = async (query, latitude, longitude) => {
    try {
        return await index
            .search(query, {
                aroundRadius: minServicableRadius * 1000, // 1km
                aroundLatLng: `${latitude}, ${longitude}`,
                ...globalSearchQueryConfig?.globalSearchQueryConfig,
            })
            .then(data => {
                const facets = data?.facets;
                const facetCounts = facets?.restaurantName;
                const groupedResults = {};

                if (facetCounts) {
                    // Iterate through the facet counts and group results
                    Object.keys(facetCounts).forEach(restaurantName => {
                        groupedResults[restaurantName] = data?.hits?.filter(
                            result => result.restaurantName === restaurantName,
                        );
                    });
                }

                return {
                    count: data.hits.length,
                    facets,
                    data: groupedResults,
                };
            })
            .catch(err => {
                return null;
            });
    } catch (error) {
        return null;
    }
};
