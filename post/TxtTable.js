var FileReader = require('filereader');
var path = require('path');
var fs = require('fs');
const StreamZip = require('node-stream-zip');
var iconv = require('iconv-lite');

module.exports = async function (req, res) {
  req.files.model.mv("C:\\zip", function (err) {
    if (err) {
        console.log(err);
    }

      const zip = new StreamZip({
        file: 'c:\\zip',
        storeEntries: true
      });
  
      zip.on('ready', () => {
        for (const entry of Object.values(zip.entries())) {
          zip.extract(entry.name, 'C:\\txt', err => {
            fs.readFile("C:\\txt", function(err, data) {
              if (err) throw err;
              res.send({ text: iconv.decode(Buffer.from(data), 'win1251') });
            });
            zip.close();
          });
        }
      });
    });
};
