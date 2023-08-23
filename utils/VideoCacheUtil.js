import shorthash from 'shorthash';
import RNFS from 'react-native-fs';

const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // 24 hours in milliseconds
const MAX_DOCUMENT_DIRECTORY_SIZE = 400 * 1024 * 1024; // 400MB in bytes
const DOCUMENT_DIRECTORY = RNFS.DocumentDirectoryPath;

async function getDirectorySize(directoryPath) {
    const response = await RNFS.readDir(directoryPath);
    let totalSize = 0;

    for (let i = 0; i < response.length; i++) {
        const item = response[i];
        if (item.isFile()) {
            const fileStats = await RNFS.stat(item.path);
            totalSize += fileStats.size;
        }
    }

    return totalSize;
}

async function clearDirectory(directoryPath) {
    await RNFS.unlink(directoryPath);
    await RNFS.mkdir(directoryPath);
}
async function memoize(url) {
    const name = shorthash.unique(url);
    const extension = 'file://';
    const path = `${RNFS.DocumentDirectoryPath}/${name}`;
    try {
        const directorySize = await getDirectorySize(DOCUMENT_DIRECTORY);
        // console.log('Document Directory Size:', directorySize);

        if (directorySize > MAX_DOCUMENT_DIRECTORY_SIZE) {
            // console.log('Clearing Document Directory...');
            await clearDirectory(DOCUMENT_DIRECTORY);
            // console.log('Document Directory cleared.');
        } else {
            // console.log('Document Directory size is within the limit.');
        }
    } catch (error) {
        // console.log('File not found in cache')
    }

    try {
        var fileExists = null,
            fileStats = null;
        try {
            fileExists = RNFS.exists(path).then(result => {
                // console.log('file exists: ', result);
                fileStats = RNFS.stat(path);
                return result;
            });
        } catch (e) {
            // console.log(e);
        }

        if (fileExists && fileStats) {
            const currentTime = Date.now();
            const fileCreationTime = new Date(fileStats.ctime).getTime();
            const fileAge = currentTime - fileCreationTime;

            if (fileAge <= CACHE_EXPIRY_TIME) {
                return { uri: path }; // Return the cached file
            }
        }

        const response = await RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
        })
            .promise.then(() => {
                fileExists = true;
            })
            .catch(err => {
                // console.log('err', err);
            });

        if (fileExists === true) {
            return { uri: path }; // Return the downloaded file
        }
    } catch (error) {
        // console.log('Error: ', error);
    }

    return null; // Return null if the source is not available
}

export { memoize };
