// https://storage.googleapis.com/${bucketName}/${folderPathWithFile}


// --------------------------------------------------------------------

// GCP
let bucketName = 'roar-test-bucket';
// make this an array of paths
// let folderPaths = ['assets/'];

// async function fetchImagesFromFolder() {
//   const assetPromises = folderPaths.map(async (folderPath) => {
//     return await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o?prefix=${folderPath}`);
//   })

//   const assets = await Promise.all(assetPromises)

//   console.log('assets: ', assets)

//   const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o?prefix=${folderPath}`);
//   const data = await response.json();

//   data.items.forEach((item, i) => {

//     const imageUrl = `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(item.name)}`;
//     // Fetch or process the image using the constructed URL
//     console.log(imageUrl);
//   })
// }

// await fetchImagesFromFolder();



// const topLevelFolders = ['assets', 'videos', 'audio'];

// async function fetchFileNamesWithDirectoryStructure() {
//     const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o?delimiter=/`);
//     const data = await response.json();

//     console.log('folder data: ', data.kind)

//   const fileNames = [];

//   for (const folder of topLevelFolders) {
//     const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o?prefix=${encodeURIComponent(folder)}/&delimiter=/`);
//     const data = await response.json();

//     if (data.items) {
//         const folderFileNames = data.items.map((item) => {
//             const filePath = item.name.replace(`${folder}/`, '');
//             const directoryPath = filePath.split('/').slice(0, -1).join('/');
//             return { directory: directoryPath, filename: item.name };
//           });
      
//           fileNames.push(...folderFileNames);
//     }
//   }

//   console.log(fileNames);
// }

// fetchFileNamesWithDirectoryStructure();

const topLevelFolderName = 'en';

async function fetchAllAssetsFromBucket(prefix = '') {
  const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o?prefix=${encodeURIComponent(prefix)}&delimiter=/`);
  const data = await response.json();

  let assets = [];

  if (data.items) {
    assets = data.items.map((item) => {
      return { directory: prefix, filename: item.name };
    });
  }

  if (data.prefixes) {
    for (const subfolder of data.prefixes) {
      const subfolderAssets = await fetchAllAssetsFromBucket(subfolder);
      assets = assets.concat(subfolderAssets);
    }
  }

  return assets;
}

async function fetchAllAssets() {
  const allAssets = await fetchAllAssetsFromBucket(topLevelFolderName);
  console.log(allAssets);
}

fetchAllAssets();






//AWS S3
// async function fetchImagesFromFolder() {
//   const response = await fetch(`https://${bucketName}.s3.amazonaws.com/?list-type=2&prefix=${folderPath}`);
//   const data = await response.text();
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(data, 'application/xml');

//   const contents = xmlDoc.getElementsByTagName('Contents');
//   for (const content of contents) {
//     const key = content.getElementsByTagName('Key')[0].textContent;
//     const imageUrl = `https://${bucketName}.s3.amazonaws.com/${encodeURIComponent(key)}`;
//     // Fetch or process the image using the constructed URL
//     console.log(imageUrl);
//   }
// }

// fetchImagesFromFolder();