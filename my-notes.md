### 11ty
static site generator
server side, but the websites server

> npm init -y
> npm i --save-dev @11ty/eleventy


we can customize out input and output diectories, thats why we need a config file

> mkdir .eleventy.js
content:
module.exports = function (eleventyConfig) {
    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}

create the index.html in the src file to test

> npx @11ty/eleventy (to run the eleventy generator without installing it on our system, creates a folder _site with generated html)
> npx @11ty/eleventy --serve (starts a server and a small change is recognised and new output is produced)

the folder will create folder layout and one index.html outside

next we need to add some style:
- create the directory and set up the scss
- link the style to the index.html file
- create the linking in the .eleventy.js file, because the 11ty doesnt recognise css

    eleventyConfig.addPassthroughCopy("./src/assets/styles/compiled_styles/");
    eleventyConfig.addWatchTarget("./src/assets/styles/compiled_styles/");

the first means that on build the 11 will pick up the contents of the directory and add it to our output directory
the second means that if we make changes this will also trigger a build

We need 1 index file in the src folder. It can also be markdown file (index.md) and in can reffer to a layout

We can have 3 or more folders
- _includes (njk files where we store our templates, for example base.njk has the html with header and footer and in the middle in the <main> has <article> and inside this keyword {{ content | safe }} . This means the other files that have layout:base.njk will post their content in this base layout exactly where the content keyword is)
- _data (here we can store js files, which return jsons or just text, or simply json files which we can access anywhere in out md, njk files with their file name. For example you have cats.json, then you can loop the data from there like this - mustache syntax   
    {% for cat in cats %}
        <a href={{ cat.url }}> {{ cat.name }}</a> <br>
    {%- endfor %} 
)
in the js files (catpic.js) we can use axios for fetch requests without installing it even and everything should be inside the export like this:
const axios = require('axios');

module.exports = async () => {
    const result = await axios.get('https://picsum.photos/400');
    console.log(result.request.res.responseUrl)// depends on the response
    return result.request.res.responseUrl;
}
and then the usage in md is 
![this is the title CAT of THE day]( {{catpic}} "hover this to see info, its title in html") 

- pages folder for example, or something else. but the name is important, because this folder can then be accessed from the "collections"
  {% for page in collections.pages %}
  <a href={{page.url}}> {{ page.data.title }}</a> <br>
  {%- endfor %}
in the pages folder you can have md files with content inside, but pay attention these objects have extra attributes like url (default) and data.title (we define in the file like :
 --- 
 title: sth 
 ---
 )


## the package.json:

> npm i --save-dev rimraf 
//this will delete the folder public when you start new, so that there are no thisngs left
we will use this for the compiled styles and public

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev:css": "sass src/assets/styles/scss/main.scss:src/assets/styles/compiled_styles/main.css",
    "watch:sass": "sass --watch src/assets/styles/scss src/assets/styles/scss/main.scss:src/assets/styles/compiled_styles/main.css",
    "build:css": "sass src/assets/styles/scss/main.scss:src/assets/styles/compiled_styles/main.css",
    "build:site": "npx eleventy",
    "serve:11ty": "npx eleventy --serve",
    "serve:prod": "serve ./public/",
    "del:public": "rimraf ./public",
    "del:assets": "rimraf ./src/assets/styles/compiled_styles",
    "build": "npm-run-all  del:public del:assets build:css build:site",
    "dev": "npm-run-all --parallel watch serve:11ty",
    "live": "npm run build && npm run serve:prod",
    "watch": "npm-run-all --parallel dev:css watch:*"
  },

## how to use:

### Funktionen

`npm install`
Installiert die erforderlichen Abhängigkeiten.

`npm run build` 
kompiliert einen Build und speichert diesen im `docs` Folder.

`npm run dev` 
Watchmode für den SASS Compiler und Browsersync, der die Inhalte inkl. livereload serviert.

`npm run live` erzeugt einen Build und startet den Webserver, der die Inhalte serviert.