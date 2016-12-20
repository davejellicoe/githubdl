var request = require('request');

var fs = require("fs");

var GITHUB_USER = "davejellicoe";

var GITHUB_TOKEN = "1fd002e3676e2021aae12b8a4c8143fb966808cd";

function getContributorImages(repoOwner, repoName, callback) {
	var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

	var options = {
  url: requestURL,
  headers: {
    'User-Agent': 'request'
  }
};

// the get request with options and a callback
request.get(options, callback)

}

var urlList = []

// call getContributorImages to request images

getContributorImages(process.argv[2], process.argv[3], function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body)
      data.forEach (function (elm, index, array) {
        urlList.push(elm["avatar_url"])
      })
  }
  downloadImageByURL(urlList);

})

  // request put the images in the given url filePath.

function downloadImageByURL(urlList) {
  fs.mkdirSync('avatars')
  urlList.forEach (function (elm, imageName, array) {
    request.get(elm).pipe(fs.createWriteStream(`avatars/${imageName}.jpg`));
    })
    if (process.argv.length !== 4) {  // if the call isn't made with the repo info
      var badArgs = "Please provide the name of the repo owner and the name of the rep e.g. \"jquery\" \"jquery\"";
      throw badArgs;
  }
}
