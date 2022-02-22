// recursive scan folder for files and folders and write a files.json file as output
const fs = require('fs');
const path = require('path');

const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

const readFolder = (folderPath) => {
  let categories = [];
  const files = fs.readdirSync(folderPath).map((fileName) => {
    return path.join(folderPath, fileName);
  });
  files.forEach((file) => {
    let fileObj = {
      name: file.replace(folderPath + '\\', ''),
      id: file.replace(folderPath + '\\', '')
    };
    if (file !== 'node_modules' && isFile(file) === false) {
      fileObj.children = readFolder(file);
    }
    categories.push(fileObj);
  });
  return categories;
};
// write the JSON file
fs.writeFile('files.json', JSON.stringify(readFolder('./')), (err) => {
  if (err) throw err;
  console.log('Saved!');
});
