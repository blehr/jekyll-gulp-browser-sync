# Jekyll - Gulp - Browser-sync 

Jekyll build processs using Gulp and Browser-sync, compatible with [Cloud9](http://c9.io).

### Directory Structure
```
- myCoolBlog
  |-- _app <-- contains all files to be processed by gulp
  | |
  | |-- images <-- images to be compressed
  | |
  | |-- scripts
  | | + - main.js <-- script to be uglified
  | | 
  | |-- styles          sass to be processed and minified - 
  |   + - main.scss <-- this file should @import all other scss files
  |                     
  |-- _includes <-- partial html templates
  | + - disqus_comments.html
  | + - footer.html
  | + - head.html
  | + - header.html
  | + - icon-github.html
  | + - icon-github.svg
  | + - icon-twitter.html
  | + - icon-twitter.svg
  |
  |-- _layouts <-- all of the layouts
  | + - default.html
  | + - page.html
  | + - post.html
  |
  |-- _posts
  | + - 2016-08-30-this-is-a-post.md
  | 
  |-- _site <-- final build files all output to here
  |
  |-- about <-- an about page
  | + - index.html
  |
  |-- css <-- the processed styles end up here
  | + - main.min.css
  |
  |-- js <-- the processed scripts end up here
  | + - main.min.js
  |
  |-- node_modules 
  |
  + - .gitignore
  + - _config.yml
  + - feed.xml
  + - Gemfile
  + - Gemfile.lock
  + - gulpfile.js <-- here the magic happens
  + - index.html  <-- home page
  + - package.json
  + - README.md
```

### Installation

1. Clone this repository
2. Run `bundle install` - ( installs gems )
3. Run `npm install` - ( installs node_modules )

### Run Development Server

* Running `gulp default` will
   * build all styles in `_app/styles` and place the 
   new file in the `css` folder and in the `_site/css` 
   * build all scripts in `_app/scripts` and place the
   new file in `js` folder and in `_site/js`
   * process all images in `_app/images` and place them
   in the `images` folder and in `_site/images`
   * next `jekyll build` will build the site to `_site`
   * browser-sync will serve `_site` on localhost:8082
   * any changes saved in `_app/styles` will be built and injected
   to be shown without a page refresh
   * Any changes saved in either `_app/scripts` or `_app/images`
   will build and be injected in to `_site` and the browser will
   be automatically refreshed.
   * all other `.html` files will be watched for changes and 
   will trigger a full `jekyll build` and the browser will refresh
   when finished

### Production Build

* Running `gulp production` will
  * build all styles, images, and scripts,
  * run `jekyll build`
  * all files will be in `_site`
  * this process is only needed when uploading the site 
  to a host server
  
### Git-Pages

* Just push to your USERNAME.github.io repo and 
github will handle the build process.

### The Default Theme

The default jekyll theme [Minima](https://github.com/jekyll/minima) is used in this build.
All the theme files which are normally not seen in a new jekyll build, ( due to the gem theme install ), have been copied
to the relevent folders to be built and easily modified.
