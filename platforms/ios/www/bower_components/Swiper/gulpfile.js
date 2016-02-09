!function(){"use strict";function s(s,e,r){var i="        ",p=s.path.split("src/js/")[1];if(-1!==["wrap-start.js","wrap-start-umd.js","wrap-end.js","wrap-end-umd.js","amd.js"].indexOf(p)&&(i=""),("swiper-intro.js"===p||"swiper-intro-f7.js"===p||"swiper-outro.js"===p||"dom.js"===p||"get-dom-lib.js"===p||"get-jquery.js"===p||"dom-plugins.js"===p||"swiper-proto.js"===p)&&(i="    "),r&&(i=i.substring(4)),""!==i){for(var t=m.readFileSync(s.path).toString().split("\n"),j="",c=0;c<t.length;c++)j+=i+t[c]+(c===t.length?"":"\n");s.contents=new Buffer(j)}}var e=require("gulp"),r=require("gulp-connect"),i=require("gulp-open"),p=require("gulp-less"),t=require("gulp-rename"),j=require("gulp-header"),c=require("path"),a=require("gulp-uglify"),n=require("gulp-sourcemaps"),l=require("gulp-minify-css"),o=require("gulp-tap"),u=require("gulp-concat"),d=require("gulp-jshint"),g=require("jshint-stylish"),m=require("fs"),y={root:"./",build:{root:"build/",styles:"build/css/",scripts:"build/js/"},dist:{root:"dist/",styles:"dist/css/",scripts:"dist/js/"},playground:{root:"playground/"},source:{root:"src/",styles:"src/less/",scripts:"src/js/*.js"}},f={filename:"swiper",jsFiles:["src/js/wrap-start.js","src/js/swiper-intro.js","src/js/core.js","src/js/effects.js","src/js/lazy-load.js","src/js/scrollbar.js","src/js/controller.js","src/js/hashnav.js","src/js/keyboard.js","src/js/mousewheel.js","src/js/parallax.js","src/js/plugins.js","src/js/emitter.js","src/js/a11y.js","src/js/init.js","src/js/swiper-outro.js","src/js/swiper-proto.js","src/js/dom.js","src/js/get-dom-lib.js","src/js/dom-plugins.js","src/js/wrap-end.js","src/js/amd.js"],jQueryFiles:["src/js/wrap-start.js","src/js/swiper-intro.js","src/js/core.js","src/js/effects.js","src/js/lazy-load.js","src/js/scrollbar.js","src/js/controller.js","src/js/hashnav.js","src/js/keyboard.js","src/js/mousewheel.js","src/js/parallax.js","src/js/plugins.js","src/js/emitter.js","src/js/a11y.js","src/js/init.js","src/js/swiper-outro.js","src/js/swiper-proto.js","src/js/get-dom-lib.js","src/js/dom-plugins.js","src/js/wrap-end.js","src/js/amd.js"],jQueryUMDFiles:["src/js/wrap-start-umd.js","src/js/swiper-intro.js","src/js/core.js","src/js/effects.js","src/js/lazy-load.js","src/js/scrollbar.js","src/js/controller.js","src/js/hashnav.js","src/js/keyboard.js","src/js/mousewheel.js","src/js/parallax.js","src/js/plugins.js","src/js/emitter.js","src/js/a11y.js","src/js/init.js","src/js/swiper-outro.js","src/js/swiper-proto.js","src/js/get-jquery.js","src/js/dom-plugins.js","src/js/wrap-end-umd.js"],Framework7Files:["src/js/swiper-intro-f7.js","src/js/core.js","src/js/effects.js","src/js/lazy-load.js","src/js/scrollbar.js","src/js/controller.js","src/js/parallax.js","src/js/plugins.js","src/js/emitter.js","src/js/a11y.js","src/js/init.js","src/js/swiper-outro.js","src/js/swiper-proto.js"],pkg:require("./bower.json"),banner:["/**"," * Swiper <%= pkg.version %>"," * <%= pkg.description %>"," * "," * <%= pkg.homepage %>"," * "," * Copyright <%= date.year %>, <%= pkg.author %>"," * The iDangero.us"," * http://www.idangero.us/"," * ",' * Licensed under <%= pkg.license.join(" & ") %>'," * "," * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>"," */",""].join("\n"),date:{year:(new Date).getFullYear(),month:"January February March April May June July August September October November December".split(" ")[(new Date).getMonth()],day:(new Date).getDate()}};e.task("scripts",function(i){e.src(f.jsFiles).pipe(o(function(e,r){s(e,r)})).pipe(u(f.filename+".js")).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(e.dest(y.build.scripts)).pipe(d()).pipe(d.reporter(g)),e.src(f.jQueryFiles).pipe(o(function(e,r){s(e,r)})).pipe(u(f.filename+".jquery.js")).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(e.dest(y.build.scripts)),e.src(f.jQueryUMDFiles).pipe(o(function(e,r){s(e,r)})).pipe(u(f.filename+".jquery.umd.js")).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(e.dest(y.build.scripts)),e.src(f.Framework7Files).pipe(o(function(e,r){s(e,r,!0)})).pipe(u(f.filename+".framework7.js")).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(e.dest(y.build.scripts)).pipe(r.reload()),i()}),e.task("styles",function(s){e.src(y.source.styles+"swiper.less").pipe(p({paths:[c.join(__dirname,"less","includes")]})).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(t(function(s){s.basename=f.filename})).pipe(e.dest(y.build.styles)).pipe(r.reload()),e.src([y.source.styles+"core.less",y.source.styles+"navigation-f7.less",y.source.styles+"effects.less",y.source.styles+"scrollbar.less",y.source.styles+"preloader-f7.less"]).pipe(u(f.filename+".framework7.less")).pipe(j("/* === Swiper === */\n")).pipe(e.dest(y.build.styles)),s()}),e.task("build",["scripts","styles"],function(s){s()}),e.task("dist",function(){e.src([y.build.scripts+f.filename+".js"]).pipe(e.dest(y.dist.scripts)).pipe(n.init()).pipe(a()).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(t(function(s){s.basename=f.filename+".min"})).pipe(n.write("./maps")).pipe(e.dest(y.dist.scripts)),e.src([y.build.scripts+f.filename+".jquery.js"]).pipe(e.dest(y.dist.scripts)).pipe(n.init()).pipe(a()).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(t(function(s){s.basename=f.filename+".jquery.min"})).pipe(n.write("./maps")).pipe(e.dest(y.dist.scripts)),e.src([y.build.scripts+f.filename+".jquery.umd.js"]).pipe(e.dest(y.dist.scripts)).pipe(n.init()).pipe(a()).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(t(function(s){s.basename=f.filename+".jquery.umd.min"})).pipe(n.write("./maps")).pipe(e.dest(y.dist.scripts)),e.src(y.build.styles+"*.css").pipe(e.dest(y.dist.styles)).pipe(l({advanced:!1,aggressiveMerging:!1})).pipe(j(f.banner,{pkg:f.pkg,date:f.date})).pipe(t(function(s){s.basename=f.filename+".min"})).pipe(e.dest(y.dist.styles))}),e.task("watch",function(){e.watch(y.source.scripts,["scripts"]),e.watch(y.source.styles+"*.less",["styles"])}),e.task("connect",function(){return r.server({root:[y.root],livereload:!0,port:"3000"})}),e.task("open",function(){return e.src(y.playground.root+"index.html").pipe(i({uri:"http://localhost:3000/"+y.playground.root+"index.html"}))}),e.task("server",["watch","connect","open"]),e.task("default",["server"])}();