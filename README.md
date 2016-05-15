Selfie Editor Prototype
=============

Requirements
-----------

Node.js and ffmpeg need to be installed and in your PATH.

To install the required dependencies:

#### Mac OS X ####
---
Make sure you have [homebrew](http://brew.sh/) installed, then start a terminal and run:
```
brew update
brew install node ffmpeg
```

Installation
-----------

```
git clone https://github.com/kevinvandijk/shelfie-editor.git
cd shelfie-editor
npm install
```

Usage
-----------

Make sure you are in the `shelfie-editor` directory and run:
```
npm start
```

You should see something that looks like this:

```
> shelfie-editor@0.0.1 start /Users/kevin/code/shelfie/shelfie-editor
> babel-node ./api/server.js | ./node_modules/.bin/webpack-dev-server

http://localhost:4000/
webpack result is served from /
content is served from /Users/kevin/code/shelfie/shelfie-editor/build
404s will fallback to /index.html
Child html-webpack-plugin for "index.html":

webpack: bundle is now VALID.
```

Once you see the 'bundle is now VALID' message,  open a browser and browse to [http://localhost:4000](http://localhost:4000).
