define("BLAdapter",["exports","aurelia-framework","model/Model"],function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.BLAdapter=void 0;var i,o,r=n.LogManager.getLogger("ui.BLAdapter");e.BLAdapter=(i=(0,n.inject)(t.Model),i(o=function(){function e(n){a(this,e),this.model=n}return e.prototype.receiveMessage=function(e){r.info("received message",e.data)},e.prototype.postMessage=function(e){r.info("post message",e),this.blWorker.postMessage(e)},e.prototype.init=function(){this.blWorker&&this.blWorker.terminate(),this.blWorker=new Worker("scripts/bl.bundle.js"),this.blWorker.addEventListener("message",this.receiveMessage.bind(this)),this.postMessage("hello")},e}())||o)}),define("app",["exports","aurelia-framework","BLAdapter"],function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0;var i,o;e.App=(i=(0,n.inject)(t.BLAdapter),i(o=function(){function e(n){a(this,e),this.message="Hello brave new World!",this.blAdapter=n,this.blAdapter.init()}return e.prototype.configureRouter=function(e,n){e.title="Au PWA",e.map([{route:["","search"],name:"search",moduleId:"search/search",nav:!1,title:"Search"},{route:"settings",name:"settings",moduleId:"settings/settings",nav:!1,title:"settings"}]),this.router=n},e}())||o)}),define("environment",["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={debug:!1,testing:!1}}),define("main",["exports","environment"],function(e,n){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function a(e){e.use.standardConfiguration().feature("resources"),e.use.plugin("aurelia-animator-css"),i.default.debug&&e.use.developmentLogging(),i.default.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot()})}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=a;var i=t(n);Promise.config({warnings:{wForgottenReturn:!1}})}),define("model/Model",["exports"],function(e){"use strict";function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.Model=function e(){n(this,e),this.bl={}}}),define("model/actions",["../../bl/bl.actions"],function(){}),define("resources/index",["exports"],function(e){"use strict";function n(e){}Object.defineProperty(e,"__esModule",{value:!0}),e.configure=n}),define("search/ehr",["exports"],function(e){"use strict";function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.EHR=function e(){n(this,e)}}),define("search/literature",["exports"],function(e){"use strict";function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.Literature=function e(){n(this,e)}}),define("search/search",["exports"],function(e){"use strict";function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.Search=function(){function e(){n(this,e)}return e.prototype.configureRouter=function(e,n){e.map([{route:["","ehr"],name:"ehr",moduleId:"search/ehr",nav:!1,title:"Patient Record"},{route:"literature",name:"literature",moduleId:"search/literature",nav:!1,title:"Literature"},{route:"trial",name:"trial",moduleId:"search/trial",nav:!1,title:"Trials"}])},e}()}),define("search/trial",["exports"],function(e){"use strict";function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),console.log("trial");e.Trial=function e(){n(this,e)}}),define("settings/settings",["exports","aurelia-framework","BLAdapter","aurelia-router"],function(e,n,t,a){"use strict";function i(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Settings=void 0;var o,r;e.Settings=(o=(0,n.inject)(t.BLAdapter,a.router),o(r=function(){function e(n,t){i(this,e),this.blAdapter=n,this.router=t}return e.prototype.back=function(){},e.prototype.reloadBL=function(){this.blAdapter.init()},e}())||r)}),define("users/no-selection",["exports"],function(e){"use strict";function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.NoSelection=function e(){n(this,e),this.message="Please Select a Contact."}}),define("users/user",["exports","aurelia-framework","model/Model"],function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.User=void 0;var i,o;e.User=(i=(0,n.inject)(t.Model),i(o=function(){function e(n){a(this,e),this.heading="User Details",http.configure(function(e){e.useStandardConfiguration().withBaseUrl("https://api.github.com/")}),this.http=http,this.model=n}return e.prototype.syncState=function(e){},e.prototype.attached=function(){console.log("attached()",arguments)},e.prototype.detached=function(){console.log("detached()",arguments)},e.prototype.bind=function(){console.log("bind()",arguments)},e.prototype.unbind=function(){console.log("unbind()",arguments)},e.prototype.activate=function(e,n){var t=this;return subscribe("users/"+e.name,this.syncState.bind(this)),console.log("activate",e.name),this.http.fetch("users/"+e.name).then(function(e){return e.json()}).then(function(e){return t.name=e.login})},e}())||o)}),console.log("actions"),define("model/../../bl/bl.actions",[],function(){}),define("text!app.html",["module"],function(e){e.exports='<template>\n    <require from ="./styles/main.css"></require>\n\n    <!--<require from="nav-bar.html"></require>-->\n    <!--<nav-bar router.bind="router"></nav-bar>-->\n\n    <div class="page-host">\n        <router-view swap-order="before"></router-view>\n    </div>\n\n</template>\n'}),define("text!nav-bar.html",["module"],function(e){e.exports='<template bindable="router">\n\n  <aside class="navigation" role="banner">\n    <div class="navigation-wrapper">\n      <a href="#" class="logo">\n        <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png" alt="Logo Image">\n      </a>\n      <a  click.delegate="showMenu = showMenu ? false : true" class="navigation-menu-button">MENU</a>\n      <nav role="navigation">\n        <ul class.bind="showMenu ? \'navigation-menu show\' : \'navigation-menu\'">\n          <li repeat.for="row of router.navigation" class="nav-link ${row.isActive ? \'active\' : \'\'}">\n            <a href.bind="row.href">${row.title}</a>\n          </li>\n\n          <li>\n            <div class="search-bar">\n              <form role="search">\n                <input type="search" placeholder="Enter Search" />\n                <button type="submit">\n                  <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon.png" alt="Search Icon">\n                </button>\n              </form>\n            </div>\n          </li>\n\n\n        </ul>\n      </nav>\n\n    </div>\n  </aside>\n\n</template>\n'}),define("text!search/ehr.html",["module"],function(e){e.exports='<template>\n  <section class="au-animate">\n\n    <div class="cards">\n  <div class="card">\n    <!--<div class="card-image">-->\n    <!--  <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png" alt="">-->\n    <!--</div>-->\n    <div class="card-stats">\n      <div class="stats-row"><p class="small">similarities</p>87%</div>\n    </div>\n\n    <div class="card-header">\n      Kai Habighorst\n    </div>\n    <div class="card-copy">\n      <p>35 yr old male with ... </p>\n      <p>\n        <span class="badge-alert">Asthma</span>\n        <span class="badge-notice">Cortisol</span>\n      </p>\n    </div>\n  </div>\n\n  <div class="card">\n    <!--<div class="card-image">-->\n    <!--  <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png" alt="">-->\n    <!--</div>-->\n    <div class="card-stats">\n      <div class="stats-row"><p class="small">similarities</p>21%</div>\n    </div>\n\n    <div class="card-header">\n      Carsten Eickhoff\n    </div>\n    <div class="card-copy">\n      <p>30 year old male ...</p>\n      <p>\n        <span class="badge-alert">Tall</span>\n        <span class="badge-alert">male</span>\n        <span class="badge-error">a lot of sports</span>\n      </p>\n    </div>\n  </div>\n\n  <div class="card">\n    <div class="card-image">\n      <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains-3.png" alt="">\n    </div>\n    <div class="card-header">\n      The Last Card\n    </div>\n    <div class="card-copy">\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>\n    </div>\n  </div>\n</div>\n</section>\n\n</template>'}),define("text!search/literature.html",["module"],function(e){e.exports='<template>\n  <section class="au-animate">\n\n<h1>Literature</h1>\n\n</section>\n</template>'}),define("text!styles/main.css",["module"],function(e){e.exports="html {\n  box-sizing: border-box; }\n\n*, *::after, *::before {\n  box-sizing: inherit; }\n\nbutton, [type='button'], [type='reset'], [type='submit'] {\n  appearance: none;\n  background-color: #1565c0;\n  border: 0;\n  border-radius: 3px;\n  color: #fff;\n  cursor: pointer;\n  display: inline-block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  font-size: 1em;\n  -webkit-font-smoothing: antialiased;\n  font-weight: 600;\n  line-height: 1;\n  padding: 0.75em 1.5em;\n  text-align: center;\n  text-decoration: none;\n  transition: background-color 150ms ease;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap; }\n  button:hover, button:focus, [type='button']:hover, [type='button']:focus, [type='reset']:hover, [type='reset']:focus, [type='submit']:hover, [type='submit']:focus {\n    background-color: #11519a;\n    color: #fff; }\n  button:disabled, [type='button']:disabled, [type='reset']:disabled, [type='submit']:disabled {\n    cursor: not-allowed;\n    opacity: 0.5; }\n    button:disabled:hover, [type='button']:disabled:hover, [type='reset']:disabled:hover, [type='submit']:disabled:hover {\n      background-color: #1565c0; }\n\nfieldset {\n  background-color: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0; }\n\nlegend {\n  font-weight: 600;\n  margin-bottom: 0.375em;\n  padding: 0; }\n\nlabel {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 0.375em; }\n\ninput,\nselect,\ntextarea {\n  display: block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  font-size: 1em; }\n\n[type='color'], [type='date'], [type='datetime'], [type='datetime-local'], [type='email'], [type='month'], [type='number'], [type='password'], [type='search'], [type='tel'], [type='text'], [type='time'], [type='url'], [type='week'], input:not([type]), textarea {\n  appearance: none;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  margin-bottom: 0.75em;\n  padding: 0.5em;\n  transition: border-color 150ms ease;\n  width: 100%; }\n  [type='color']:hover, [type='date']:hover, [type='datetime']:hover, [type='datetime-local']:hover, [type='email']:hover, [type='month']:hover, [type='number']:hover, [type='password']:hover, [type='search']:hover, [type='tel']:hover, [type='text']:hover, [type='time']:hover, [type='url']:hover, [type='week']:hover, input:not([type]):hover, textarea:hover {\n    border-color: #b1b1b1; }\n  [type='color']:focus, [type='date']:focus, [type='datetime']:focus, [type='datetime-local']:focus, [type='email']:focus, [type='month']:focus, [type='number']:focus, [type='password']:focus, [type='search']:focus, [type='tel']:focus, [type='text']:focus, [type='time']:focus, [type='url']:focus, [type='week']:focus, input:not([type]):focus, textarea:focus {\n    border-color: #1565c0;\n    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 0 5px rgba(18, 89, 169, 0.7);\n    outline: none; }\n  [type='color']:disabled, [type='date']:disabled, [type='datetime']:disabled, [type='datetime-local']:disabled, [type='email']:disabled, [type='month']:disabled, [type='number']:disabled, [type='password']:disabled, [type='search']:disabled, [type='tel']:disabled, [type='text']:disabled, [type='time']:disabled, [type='url']:disabled, [type='week']:disabled, input:not([type]):disabled, textarea:disabled {\n    background-color: #f2f2f2;\n    cursor: not-allowed; }\n    [type='color']:disabled:hover, [type='date']:disabled:hover, [type='datetime']:disabled:hover, [type='datetime-local']:disabled:hover, [type='email']:disabled:hover, [type='month']:disabled:hover, [type='number']:disabled:hover, [type='password']:disabled:hover, [type='search']:disabled:hover, [type='tel']:disabled:hover, [type='text']:disabled:hover, [type='time']:disabled:hover, [type='url']:disabled:hover, [type='week']:disabled:hover, input:not([type]):disabled:hover, textarea:disabled:hover {\n      border: 1px solid #ddd; }\n  [type='color']::placeholder, [type='date']::placeholder, [type='datetime']::placeholder, [type='datetime-local']::placeholder, [type='email']::placeholder, [type='month']::placeholder, [type='number']::placeholder, [type='password']::placeholder, [type='search']::placeholder, [type='tel']::placeholder, [type='text']::placeholder, [type='time']::placeholder, [type='url']::placeholder, [type='week']::placeholder, input:not([type])::placeholder, textarea::placeholder {\n    color: #858585; }\n\ntextarea {\n  resize: vertical; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  display: inline;\n  margin-right: 0.375em; }\n\n[type=\"file\"] {\n  margin-bottom: 0.75em;\n  width: 100%; }\n\nselect {\n  margin-bottom: 0.75em;\n  width: 100%; }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\nhtml,\nbody {\n  height: 100%; }\n\nul,\nol {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\ndl {\n  margin: 0; }\n\ndt {\n  font-weight: 600;\n  margin: 0; }\n\ndd {\n  margin: 0; }\n\nfigure {\n  margin: 0; }\n\nimg,\npicture {\n  margin: 0;\n  max-width: 100%; }\n\ntable {\n  border-collapse: collapse;\n  margin: 0.75em 0;\n  table-layout: fixed;\n  width: 100%; }\n\nth {\n  border-bottom: 1px solid #a6a6a6;\n  font-weight: 600;\n  padding: 0.75em 0;\n  text-align: left; }\n\ntd {\n  border-bottom: 1px solid #ddd;\n  padding: 0.75em 0; }\n\ntr,\ntd,\nth {\n  vertical-align: middle; }\n\nbody {\n  color: #333;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  font-size: 1em;\n  line-height: 1.5; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  font-size: 1.25em;\n  line-height: 1.2;\n  margin: 0 0 0.75em; }\n\np {\n  margin: 0 0 0.75em; }\n\na {\n  color: #1565c0;\n  text-decoration: none;\n  transition: color 150ms ease; }\n  a:active, a:focus, a:hover {\n    color: #104c90; }\n\nhr {\n  border-bottom: 1px solid #ddd;\n  border-left: 0;\n  border-right: 0;\n  border-top: 0;\n  margin: 1.5em 0; }\n\n.cards {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between; }\n\n.card {\n  background-color: #f7f7f7;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  box-shadow: 0 2px 4px #e6e6e6;\n  cursor: pointer;\n  flex-basis: 15em;\n  flex-grow: 1;\n  margin: 0 1em 1.5em 1em;\n  position: relative;\n  transition: all 0.2s ease-in-out; }\n  .card .card-image {\n    background-color: #F8F2B4;\n    height: 150px;\n    max-height: 150px;\n    overflow: hidden; }\n    .card .card-image img {\n      border-top-left-radius: 3px;\n      border-top-right-radius: 3px;\n      opacity: 1;\n      transition: all 0.2s ease-in-out;\n      width: 100%; }\n  .card .card-stats {\n    background-image: url(https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png);\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    background-color: #F8F2B4;\n    height: 150px;\n    max-height: 150px;\n    overflow: hidden; }\n  .card .card-header {\n    background-color: #f7f7f7;\n    border-bottom: 1px solid #ddd;\n    border-radius: 3px 3px 0 0;\n    font-weight: bold;\n    line-height: 1.5em;\n    padding: 0.5em 0.75em;\n    transition: all 0.2s ease-in-out; }\n  .card .card-copy {\n    font-size: 0.9em;\n    line-height: 1.5em;\n    padding: 0.75em 0.75em; }\n    .card .card-copy p {\n      margin: 0 0 0.75em; }\n  .card:focus, .card:hover {\n    cursor: pointer; }\n    .card:focus img, .card:hover img {\n      opacity: 0.7; }\n  .card:active {\n    background-color: #f7f7f7; }\n    .card:active .card-header {\n      background-color: #f7f7f7; }\n\n.stats-row {\n  font-size: 4.5rem;\n  display: flex; }\n  .stats-row .small {\n    font-size: 1rem; }\n\n.sliding-panel-content {\n  position: fixed;\n  top: 0;\n  right: auto;\n  bottom: 0;\n  left: 0;\n  height: 100%;\n  width: 80%;\n  background: #404040;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: auto;\n  transform: translateX(-100%);\n  transition: all 0.25s linear;\n  z-index: 999999; }\n  .sliding-panel-content ul {\n    padding: 0;\n    margin: 0; }\n  .sliding-panel-content li {\n    list-style: none; }\n  .sliding-panel-content li a {\n    border-bottom: 1px solid #333;\n    color: #fff;\n    display: block;\n    font-weight: bold;\n    padding: 1em;\n    text-decoration: none; }\n    .sliding-panel-content li a:focus {\n      background-color: #4d4d4d; }\n    .sliding-panel-content li a:hover {\n      background-color: #1565c0;\n      color: #fff; }\n  .sliding-panel-content.is-visible {\n    transform: translateX(0); }\n\n.sliding-panel-fade-screen {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: black;\n  opacity: 0;\n  transition: all 0.2s ease-in-out;\n  visibility: hidden;\n  z-index: 999998; }\n  .sliding-panel-fade-screen.is-visible {\n    opacity: 0.4;\n    visibility: visible; }\n\n.sliding-panel-button {\n  cursor: pointer;\n  display: inline-block;\n  outline: none;\n  padding: 10px 16px;\n  position: relative; }\n  .sliding-panel-button img {\n    height: 1.3em; }\n\nform.search-bar {\n  position: relative; }\n  form.search-bar textarea[type=search] {\n    appearance: none;\n    background-color: white;\n    border: 1px solid #ddd;\n    box-sizing: border-box;\n    display: block;\n    font-size: 1em;\n    font-style: italic;\n    margin: 0;\n    padding: 0.5em 0.5em;\n    position: relative;\n    transition: border-color;\n    width: 100%;\n    height: 70vh; }\n  form.search-bar button[type=submit] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    outline: none;\n    padding: 5px 10px; }\n    form.search-bar button[type=submit] img {\n      height: 12px;\n      opacity: 0.7; }\n\n.comment {\n  border-bottom: 1px solid rgba(51, 51, 51, 0.1);\n  display: table;\n  margin-bottom: 1.5em;\n  padding-bottom: 1em;\n  width: 100%; }\n  .comment .comment-image,\n  .comment .comment-content {\n    display: table-cell;\n    vertical-align: top; }\n  .comment .comment-image {\n    padding-right: 1.4em; }\n    .comment .comment-image > img {\n      background: #388be9;\n      border-radius: 3px;\n      display: block;\n      height: auto;\n      max-width: none;\n      padding: 0.7em;\n      width: 4em; }\n    .comment-reverse-order .comment .comment-image {\n      padding-left: 10px;\n      padding-right: 0; }\n  .comment .comment-content {\n    width: 100%; }\n    .comment .comment-content h1 {\n      font-size: 1em;\n      margin: 0 0 0.5em 0; }\n    .comment .comment-content p {\n      line-height: 1.5em;\n      margin-bottom: 0.5em; }\n    .comment .comment-content p.comment-detail {\n      color: rgba(51, 51, 51, 0.5);\n      font-size: 0.9em;\n      font-style: italic; }\n\n.badge-alert {\n  background-color: #fff6bf;\n  border-radius: 3.75em;\n  color: #8c7800;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-default {\n  background-color: #999;\n  border-radius: 3.75em;\n  color: black;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-error {\n  background-color: #fbe3e4;\n  border-radius: 3.75em;\n  color: #97161b;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-notice {\n  background-color: #e5edf8;\n  border-radius: 3.75em;\n  color: #244e87;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-success {\n  background-color: #e6efc2;\n  border-radius: 3.75em;\n  color: #56651a;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s; }\n\n/* animate page transitions */\nsection.au-enter-leave {\n  -webkit-animation: fadeOutLeft 1s;\n  animation: fadeOutLeft 1s; }\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms; }\n\n/* animation definitions */\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none; } }\n\n@keyframes fadeOutLeft {\n  0% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\nbody {\n  font-family: GillSans, Calibri, Trebuchet, sans-serif;\n  max-width: 1200px;\n  margin-left: auto;\n  margin-right: auto; }\n  body::after {\n    clear: both;\n    content: \"\";\n    display: block; }\n\nnav {\n  padding: 0 2vw 0 2vw;\n  border-bottom: 1px solid #ddd !important;\n  height: 8vh;\n  margin-bottom: 2vh;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center; }\n  nav > ul {\n    display: flex;\n    flex-direction: row; }\n\n.rounded {\n  height: 50px;\n  width: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid #1565c0;\n  border-radius: 50%;\n  cursor: pointer;\n  text-align: center;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  z-index: 9999;\n  font-size: 1.5rem; }\n  .rounded.secondary {\n    color: #ddd;\n    border-color: #ddd; }\n\n.results {\n  padding: 0 2vw; }\n"}),define("text!search/search.html",["module"],function(e){e.exports='<template>\n    <nav class="fixedsticky" role="navigation">\n        <a class="rounded secondary" click.delegate="hideMenu = hideMenu ? false : true" >\n          <i class="fa fa-search"></i>\n        </a>\n\n        <ul>\n        <li><a class="rounded" href="#/search/ehr"><i class="fa fa-user"></i></a></li>\n        <li><a class="rounded" href="#/search/trial"><i class="fa fa-flask"></i></a></li>\n        <li><a class="rounded" href="#/search/literature"><i class="fa fa-book" aria-hidden="true"></i></a></li>\n        </ul>\n\n      </button>\n    </nav>\n\n        <aside class.bind="hideMenu ? \'sliding-panel-content is-visible \' : \'sliding-panel-content\'" >\n          <nav role="navigation">\n              <a class="rounded secondary" click.delegate="hideMenu = hideMenu ? false : true">\n                <i class="fa fa-times" aria-hidden="true"></i>\n              </a>\n          </nav>\n\n          <section>\n            <form class="search-bar" role="search">\n              <textarea type="search" placeholder="Enter Search" ></textarea>\n              <button type="submit">\n                <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon-black.png" alt="Search Icon">\n              </button>\n            </form>\n          </section>\n\n          <hr>\n          <a class="rounded" href="#/settings"><i class="fa fa-cogs" aria-hidden="true"></i></a>\n        </aside>\n\n        <div class="sliding-panel-fade-screen"  click.delegate="hideMenu = hideMenu ? false : true" class.bind="hideMenu ? \'sliding-panel-fade-screen is-visible\' : \'sliding-panel-fade-screen\'" ></div>\n\n        <div class="results row au-stagger">\n            <router-view swap-order="after"></router-view>\n        </div>\n\n</template>'}),define("text!search/trial.html",["module"],function(e){e.exports='<template>\n  <section class="au-animate">\n\n<h1>Trials</h1>\n\n<div class="comment">\n  <div class="comment-image">\n    <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png">\n  </div>\n  <div class="comment-content">\n    <h1>First Comment Title or Author</h1>\n    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, aspernatur, quia modi minima debitis tempora ducimus quam vero impedit alias earum nemo error tenetur sed.</p>\n    <p class="comment-detail">Date or details about this post</p>\n  </div>\n</div>\n\n<div class="comment">\n  <div class="comment-image">\n    <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png">\n  </div>\n  <div class="comment-content">\n    <h1>Another One</h1>\n    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, aspernatur, quia modi minima debitis tempora ducimus quam vero impedit alias earum nemo error tenetur sed.</p>\n    <p class="comment-detail">Date or details about this post</p>\n  </div>\n</div>\n\n\n</section>\n</template>'}),define("text!settings/settings.html",["module"],function(e){e.exports='<template>\n    <nav class="fixedsticky" role="navigation">\n        <a class="rounded secondary" click.delegate="back()" >\n          <i class="fa fa-chevron-left"></i>\n        </a>\n      </button>\n    </nav>\n\n    <h1>Settings</h1>\n\n    <button click.delegate="reloadBL()">reload Business Layer</button>\n</template>\n'}),define("text!users/no-selection.html",["module"],function(e){e.exports='<template>\n  <section class="au-animate">\n    <div class="no-selection text-center">\n      <h2>${message}</h2>\n    </div>\n  </section>\n</template>\n'}),define("text!users/user.html",["module"],function(e){e.exports='<template>\n  <require from="blur-image"></require>\n\n  <section class="au-animate">\n    <h2>${heading} - ${name}</h2>\n    <div class="row au-stagger">\n\n  </section>\n</template>\n'}),define("text!users/users.html",["module"],function(e){e.exports='<template>\n  <require from="blur-image"></require>\n\n  <section class="au-animate">\n    <h2>${heading}</h2>\n    <div class="row au-stagger">\n      <router-view swap-order="after"></router-view>\n    </div>\n\n    <hr/>\n    <section id="UserSearch" class="row container">\n      <!--<input type="search" class="form-control" placeholder="Search for..." value.bind="search & debounce:200" />-->\n      <input type="search" class="form-control" placeholder="Search for..." keyup.delegate="query($event) & debounce:100" value.bind="search " />\n    </section>\n\n    <hr/>\n\n    <div class="row au-stagger">\n      <div class="col-sm-6 col-md-3 card-container au-animate" repeat.for="user of model.users.users"  >\n        <div class="card">\n          <a route-href="route: users; params.bind: {name:user.login}">\n          <canvas class="header-bg" width="250" height="70" blur-image.bind="image"></canvas>\n          <div class="avatar">\n            <img src.bind="user.avatar_url" crossorigin ref="image"/>\n          </div>\n          <div class="content">\n            <p class="name">${user.login}</p>\n            <p><a target="_blank" class="btn btn-default" click.delegate="click(user)" >Contact</a></p>\n          </div>\n          </a>\n        </div>\n      </div>\n    </div>\n\n\n  </section>\n</template>\n'});