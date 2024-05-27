const fs = requrie("fs");

//appened to file
fs.appendFile("newFile.txt", "Hello World! (again)", err =>{
    if (err) throw err;
    console.log("File Saved.");
});

//open file
fs.open('newFile2.txt', 'w', (err, file) => {
    if(err) throw err;
    console.log('File Saved.');
});

//write to file
fs.writeFile('newFile3.txt', 'Hello world!', err => {
    if(err) throw err;
    console.log('File Saved.');
});

//delete file
fs.unlink('newFile2.txt', err => {
    if(err) throw err;
    console.log('File deleted.');
});

//rename file
fs.rename('newFile.txt', "renamedFile.txt", err => {
    if(err) throw err;
    console.log('File renamed.');
});