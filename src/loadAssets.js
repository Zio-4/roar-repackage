import jsPsychPreload from '@jspsych/plugin-preload';
// import { Storage } from '@google-cloud/storage'

// async function fetchFilesFromFolder() {
//   // Instantiate a client
//   const storage = new Storage();

//   // Specify your GCS bucket name and folder path
//   const bucketName = 'roar-test-bucket';
//   const folderPath = 'assets/';

//   // Get a reference to the bucket
//   const bucket = storage.bucket(bucketName);

//   try {
//     // List files in the folder
//     const [files] = await bucket.getFiles({ prefix: folderPath });

//     // Iterate over the files and do something with them
//     files.forEach(file => {
//       console.log(file.name);
//       // Perform operations on the file, such as downloading or processing
//     });
//   } catch (error) {
//     console.error('Error fetching files:', error);
//   }
// }

// await fetchFilesFromFolder();

// ------------------------------------------------------------------------------------


// Create arrays of hot dog / not hot dog images
const numFiles = 5;
const hotDogFiles = Array.from(Array(numFiles), (_, i) => i + 1).map(
  (idx) => `https://storage.googleapis.com/roar-hot-dog-images/hotdog/${idx}.jpg`,
);

const notHotDogFiles = Array.from(Array(numFiles), (_, i) => i + 1).map(
  (idx) => `https://storage.googleapis.com/roar-hot-dog-images/nothotdog/${idx}.jpg`,
);

const allFiles = hotDogFiles.concat(notHotDogFiles);
export const allTargets = allFiles.map((url) => ({
  target: `<img src="${url}" width=250 height=250>`,
  isHotDog: !url.includes('nothotdog'),
}));

/* preload images */
export const preloadImages = {
  type: jsPsychPreload,
  images: allFiles,
};


export const autoPreload = {
  type: jsPsychPreload,
  auto_preload: true
}