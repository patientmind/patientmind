define('BLAdapter',['exports', 'aurelia-framework', 'model/Model'], function (exports, _aureliaFramework, _Model) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BLAdapter = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var log = _aureliaFramework.LogManager.getLogger('ui.BLAdapter');

    var BLAdapter = exports.BLAdapter = (_dec = (0, _aureliaFramework.inject)(_Model.Model), _dec(_class = function () {
        function BLAdapter(model) {
            _classCallCheck(this, BLAdapter);

            this.model = model;
        }

        BLAdapter.prototype.receiveMessage = function receiveMessage(event) {
            log.info('received message', event.data);
        };

        BLAdapter.prototype.postMessage = function postMessage(message) {
            log.info('post message', message);
            this.blWorker.postMessage(message);
        };

        BLAdapter.prototype.init = function init() {
            if (this.blWorker) {
                this.blWorker.terminate();
            }

            this.blWorker = new Worker('scripts/bl.bundle.js');
            this.blWorker.addEventListener('message', this.receiveMessage.bind(this));

            this.postMessage('hello');
        };

        return BLAdapter;
    }()) || _class);
});
define('app',['exports', 'aurelia-framework', 'BLAdapter'], function (exports, _aureliaFramework, _BLAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_BLAdapter.BLAdapter), _dec(_class = function () {
    function App(blAdapter) {
      _classCallCheck(this, App);

      this.message = 'Hello brave new World!';
      this.blAdapter = blAdapter;
      this.blAdapter.init();

      this.primaryColor = 'white';
      this.accentColor = 'darkblue';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Au PWA';
      config.map([{ route: ['', 'search'], name: 'search', moduleId: 'search/search', nav: false, title: 'Search' }, { route: 'settings', name: 'settings', moduleId: 'settings/settings', nav: false, title: 'settings' }, { route: 'ehr', name: 'ehr', moduleId: 'search/ehr', nav: true, title: 'Patient Records' }, { route: 'literature', name: 'literature', moduleId: 'search/literature', nav: true, title: 'Literature' }, { route: 'trial', name: 'trial', moduleId: 'search/trial', nav: true, title: 'Trials' }]);

      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', 'environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    aurelia.use.plugin('aurelia-animator-css');

    aurelia.use.plugin('aurelia-materialize-bridge', function (b) {
      return b.useAll();
    });

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('model/Model',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Model = exports.Model = function Model() {
    _classCallCheck(this, Model);

    this.bl = {
      patients: [{ id: 1,
        relevance: 76,
        name: 'Ms [anonymous 1]',
        ehr_short: 'Ms [**Known patient lastname 241**] is a [**Age over 90 2398**] year old woman with past medical history significant for hypertension, severe aortic stenosis, hyperlipidemia, arthroplasty ...',
        ehr: 'Ms [**Known patient lastname 241**] is a [**Age over 90 2398**] year old woman with past medical history significant for hypertension, severe aortic stenosis, hyperlipidemia, arthroplasty. . Per the patient, she was standing and felt a snap of her right leg and fell to the ground. No head trauma or LOC. She was evaluated by orthopedics and transferred to medicine for optimization of her cardiac status. Review of systems: Ear, Nose, Throat: Dry mouth Cardiovascular: Edema, Orthopnea Respiratory: Dyspnea Flowsheet Data as of [**3294-3-6**] 10:33 PM Vital Signs Hemodynamic monitoring Fluid Balance 24 hours Since [**96**] AM Tmax: 37.5 C (99.5) Tcurrent: 37.5 C (99.5) HR: 102 (93 - 102) bpm BP: 117/54(70) {117/54(70) - 117/54(70)} mmHg RR: 24 (15 - 24) insp/min SpO2: 100% Heart rhythm: ST (Sinus Tachycardia) . -- Clarify She appears comfortable with adequate pain control with prn morphine. Given her tight valvular stenosis, she is high risk for general anesthesia. - would start standing tylenol 1g q8 - continue morphine IV prn for breakthrough - plan for OR tomorrow am per ortho pending optimization of her cardiac function, and improvement in renal function . # CAD: No clear documentation, however given age calcific atherosclerosis is highly likely -- continue statin -- Hold beta blocker for now -- hold aspirin in perioperative period . # ATRIAL FIBRILLATION: In setting of acute pain and peri-op. Will need to monitor as pt with high CHADS score, however in periop period would not be able to have systemic anticoagulation -- Rate control with beta blocker once stable -- If unstable, would use esmolol first, cardiovert last option. . # HTN: Better controlled on floor. Good BP control essential for preventing flash pulmonary edema in setting of AS. - continue metoprolol, as above - continue to monitor BP and consider adding another [**Doctor Last Name **] such as amlodipine 5mg daily if BP sustains above SBP 150s . # Hyperlipidemia - continue simvastatin 40mg PO daily . # FEN/GI: Low sodium diet, replete lytes PRN . # CODE: Confirmed DNR/DNI',
        words: ['hypertension', 'severe aortic stenosis', 'hyperlipidemia', 'arthroplasty']

      }, { id: 2,
        relevance: 52,
        name: 'Ms [anonymous 2]',
        ehr_short: 'Pt is a 75F with a PMHx significant for severe PVD, CAD, DM, and CKD who presented to [**Hospital1 **]-[**Location (un) 1375**] on [**6-25**] after ... ',
        ehr: 'Pt is a 75F with a PMHx significant for severe PVD, CAD, DM, and CKD who presented to [**Hospital1 **]-[**Location (un) 1375**] on [**6-25**] after being found down unresponsive at home. She was found to be hypoglycemic to 29 with hypotension and bradycardia. Her hypotension and confusion improved with hydration. She had a positive UA which eventually grew klebsiella, treated initially with levofloxacin. She had a leukocytosis to 18 and a creatinine of 6 up from presumed prior baseline of ~2. On morning of transfer, pt had blood cultures result 3/3 bottles positive for GAS, her antibiotics were switched to vancomycin which was then changed to ceftriaxone. Her blood pressure dropped to the 60s. She was given a bolus of bicarb and transfered to their ICU. After an additional bolus of 500cc she was started on levophed. She was anuric throughout the day. She had a midline placed on right side. She received 80mg IV solumedrol this morning in the setting of low BPs and rare eos in urine. On arrival to the MICU pt was awake but drowsy. She was receiving levophed throughout her transfer. Arrival VS: 96.3 68 102/26 22 97% 2L NC on 0.04mcg/kg/min levophed. On ROS, pt denies pain, lightheadedness, headache, neck pain, sore throat, recent illness or sick contacts, cough, shortness of breath, chest discomfort, heartburn, abd pain, n/v, diarrhea, constipation, dysuria. Is a poor historian regarding how long she has had a rash on her legs. States she has not felt ill and she was brought to the hospital because her daughter came home and found her sleeping. Does complain of feeling very thirsty.',
        words: ['rash on her legs', 'PVD', 'CAD', 'DM', 'CKD']
      }, { id: 3,
        relevance: 22,
        name: 'Ms [anonymous 3]',
        ehr_short: 'Ms. [**Known patient lastname **] is a G2P0010 26 yo F, now estimated to 10 weeks pregnant. Pt has 4yr hx of IDDM. LMP is not known ...',
        ehr: 'Ms. [**Known patient lastname **] is a G2P0010 26 yo F, now estimated to 10 weeks pregnant. Pt has 4yr hx of IDDM. LMP is not known but was sometime in [**Month (only) **]. On [**3243-11-10**], the patient began feeling achy and congested. She had received a flu shot about 1 week prior. She continued to feel poorly on [**3243-11-11**], and developed hyperemesis. She was seen in the ED (but not admitted) at [**Hospital3 **], where she was given IVF, Reglan and Tylenol and she was found to have a positive pregnancy test. Today, she returned to the ED with worsening of symptoms. She was admitted to the OB service and given IVF and Reglan. Of note, her labwork demonstrates a blood glucose of 160, bicarbonate of 11, beta-hCG of 3373 and ketones in her urine. Her family noted that she was breathing rapidly and was quite somnolent. She appears to be in respiratory distress. . The falling beta-HCG and trans-abdominal ultrasound indicate intra-uterine fetal demise. Medications on Admission: Lantus 65 units qAM Novolog SSI Cortef 3mg qAM, 1mg qHS . Meds on Transfer: Levophed Dopamine Solumedrol 80mg IV Amiodarone load Insulin in D10',
        words: ['G2P0010', 'pregnant', 'hyperemesis']
      }]

    };
  };
});
define('model/actions',['../../bl/bl.actions'], function () {});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('search/ehr',['exports', 'aurelia-framework', '../model/Model'], function (exports, _aureliaFramework, _Model) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.EHR = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var EHR = exports.EHR = (_dec = (0, _aureliaFramework.inject)(_Model.Model), _dec(_class = function EHR(model) {
        _classCallCheck(this, EHR);

        this.model = model;
    }) || _class);
});
define('search/literature',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Literature = exports.Literature = function Literature() {
    _classCallCheck(this, Literature);
  };
});
define('search/search',['exports', 'aurelia-animator-css', 'aurelia-framework'], function (exports, _aureliaAnimatorCss, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Search = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var menuClasses = {
    sliding_menu: ".sliding_menu",
    fade_screen: ".sliding_menu-fade-screen",
    menuVisible: "is_active"
  };

  var Search = exports.Search = (_dec = (0, _aureliaFramework.inject)(_aureliaAnimatorCss.CssAnimator, Element), _dec(_class = function () {
    function Search(animator, element) {
      _classCallCheck(this, Search);

      this.animator = animator;
      this.element = element;
      this.menuVisible = false;
    }

    Search.prototype.toggleSideMenu = function toggleSideMenu() {

      this.menuVisible = this.menuVisible ? false : true;

      console.log('animation_start');

      var menuElement = this.element.querySelector(menuClasses.sliding_menu);

      if (this.menuVisible) {
        this.animator.addClass(menuElement, menuClasses.menuVisible);
      } else {
        this.animator.removeClass(menuElement, menuClasses.menuVisible);
      }
    };

    Search.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'ehr'], name: 'ehr', moduleId: 'search/ehr', nav: false, title: 'Patient Record' }, { route: 'literature', name: 'literature', moduleId: 'search/literature', nav: false, title: 'Literature' }, { route: 'trial', name: 'trial', moduleId: 'search/trial', nav: false, title: 'Trials' }]);
    };

    return Search;
  }()) || _class);
});
define('search/trial',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  console.log('trial');

  var Trial = exports.Trial = function Trial() {
    _classCallCheck(this, Trial);
  };
});
define('settings/settings',['exports', 'aurelia-framework', 'BLAdapter'], function (exports, _aureliaFramework, _BLAdapter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Settings = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_BLAdapter.BLAdapter), _dec(_class = function () {
        function Settings(blAdapter) {
            _classCallCheck(this, Settings);

            this.blAdapter = blAdapter;
        }

        Settings.prototype.reloadBL = function reloadBL() {
            this.blAdapter.init();
        };

        return Settings;
    }()) || _class);
});
define('users/no-selection',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NoSelection = exports.NoSelection = function NoSelection() {
    _classCallCheck(this, NoSelection);

    this.message = "Please Select a Contact.";
  };
});
define('users/user',['exports', 'aurelia-framework', 'model/Model'], function (exports, _aureliaFramework, _Model) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.User = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var User = exports.User = (_dec = (0, _aureliaFramework.inject)(_Model.Model), _dec(_class = function () {
    function User(model) {
      _classCallCheck(this, User);

      this.heading = 'User Details';

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
      this.model = model;
    }

    User.prototype.syncState = function syncState(state) {};

    User.prototype.attached = function attached() {
      console.log('attached()', arguments);
    };

    User.prototype.detached = function detached() {
      console.log('detached()', arguments);
    };

    User.prototype.bind = function bind() {
      console.log('bind()', arguments);
    };

    User.prototype.unbind = function unbind() {
      console.log('unbind()', arguments);
    };

    User.prototype.activate = function activate(params, test) {
      var _this = this;

      subscribe('users/' + params.name, this.syncState.bind(this));

      console.log('activate', params.name);
      return this.http.fetch('users/' + params.name).then(function (response) {
        return response.json();
      }).then(function (user) {
        return _this.name = user.login;
      });
    };

    return User;
  }()) || _class);
});
console.log('actions');
define("model/../../bl/bl.actions", [],function(){});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from =\"./styles/main.css\"></require>\n    <require from=\"materialize-css/css/materialize.css\"></require>\n\n    <require from=\"nav-bar.html\"></require>\n\n    <md-colors md-primary-color.bind=\"primaryColor\" md-accent-color.bind=\"accentColor\"></md-colors>\n\n    <nav-bar router.bind=\"router\"></nav-bar>\n\n    <div class=\"page-host\">\n        <router-view swap-order=\"before\"></router-view>\n    </div>\n\n</template>\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n\n  <md-navbar>\n    <ul class=\"left\">\n      <li>\n        <a class=\"indigo lighten-5\" md-sidenav-collapse=\"ref.bind: sideNav;\" md-button=\"floating: true; large: small;\" md-waves ><i class=\"fa fa-search\"></i></a>\n      </li>\n    </ul>\n\n    <ul class=\"right\">\n      <li><a class=\"md-secondary\"  md-button=\"floating: true; large: small;\" md-waves href=\"#/search/ehr\"><i class=\"fa fa-user\"></i></a></li>\n      <li><a md-button=\"floating: true; large: small;\" md-waves href=\"#/search/trial\"><i class=\"fa fa-flask\"></i></a></li>\n      <li><a md-button=\"floating: true; large: small;\" md-waves href=\"#/search/literature\"><i class=\"fa fa-book\" aria-hidden=\"true\"></i></a></li>\n\n    </ul>\n\n\n  </md-navbar>\n\n  <md-sidenav view-model.ref=\"sideNav\" md-close-on-click=\"true\">\n    <md-navbar>\n      <ul class=\"left\">\n        <li>\n          <a  ><i class=\"fa fa-close\"></i></a>\n        </li>\n      </ul>\n\n      <ul class=\"right\">\n        <li>\n          <a href=\"#/settings\" md-waves ><i class=\"fa fa-cogs\"></i></a>\n        </li>\n      </ul>\n\n\n\n  </md-navbar>\n\n    <h3>Search for EHR</h3>\n    <textarea type=\"search\"\n          style=\"height:60vh\"\n\n    placeholder=\"Enter Search\">\n\n    Ms [**Known patient lastname 241**] is a [**Age over 90 2398**] year old woman with past medical history significant for hypertension, severe aortic stenosis, hyperlipidemia, arthroplasty. . Per the patient, she was standing and felt a snap of her right leg and fell to the ground. No head trauma or LOC. She was evaluated by orthopedics and transferred to medicine for optimization of her cardiac status. Review of systems: Ear, Nose, Throat: Dry mouth Cardiovascular: Edema, Orthopnea Respiratory: Dyspnea Flowsheet Data as of [**3294-3-6**] 10:33 PM Vital Signs Hemodynamic monitoring Fluid Balance 24 hours Since [**96**] AM Tmax: 37.5 C (99.5) Tcurrent: 37.5 C (99.5) HR: 102 (93 - 102) bpm BP: 117/54(70) {117/54(70) - 117/54(70)} mmHg RR: 24 (15 - 24) insp/min SpO2: 100% Heart rhythm: ST (Sinus Tachycardia) . -- Clarify She appears comfortable with adequate pain control with prn morphine. Given her tight valvular stenosis, she is high risk for general anesthesia. - would start standing tylenol 1g q8 - continue morphine IV prn for breakthrough - plan for OR tomorrow am per ortho pending optimization of her cardiac function, and improvement in renal function . # CAD: No clear documentation, however given age calcific atherosclerosis is highly likely -- continue statin -- Hold beta blocker for now -- hold aspirin in perioperative period . # ATRIAL FIBRILLATION: In setting of acute pain and peri-op. Will need to monitor as pt with high CHADS score, however in periop period would not be able to have systemic anticoagulation -- Rate control with beta blocker once stable -- If unstable, would use esmolol first, cardiovert last option. . # HTN: Better controlled on floor. Good BP control essential for preventing flash pulmonary edema in setting of AS. - continue metoprolol, as above - continue to monitor BP and consider adding another [**Doctor Last Name **] such as amlodipine 5mg daily if BP sustains above SBP 150s . # Hyperlipidemia - continue simvastatin 40mg PO daily . # FEN/GI: Low sodium diet, replete lytes PRN . # CODE: Confirmed DNR/DNI\n\n    </textarea>\n\n    <hr>\n\n    <ul>\n      <li md-waves><a href=\"#\">About</a></li>\n    </ul>\n\n\n\n\n\n\n\n  </md-sidenav>\n\n\n  <!--<aside class=\"navigation\" role=\"banner\">-->\n  <!--  <div class=\"navigation-wrapper\">-->\n  <!--    <a href=\"#\" class=\"logo\">-->\n  <!--      <img src=\"https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png\" alt=\"Logo Image\">-->\n  <!--    </a>-->\n  <!--    <a  click.delegate=\"showMenu = showMenu ? false : true\" class=\"navigation-menu-button\">MENU</a>-->\n  <!--    <nav role=\"navigation\">-->\n  <!--      <ul class.bind=\"showMenu ? 'navigation-menu show' : 'navigation-menu'\">-->\n  <!--        <li repeat.for=\"row of router.navigation\" class=\"nav-link ${row.isActive ? 'active' : ''}\">-->\n  <!--          <a href.bind=\"row.href\">${row.title}</a>-->\n  <!--        </li>-->\n\n  <!--        <li>-->\n  <!--          <div class=\"search-bar\">-->\n  <!--            <form role=\"search\">-->\n  <!--              <input type=\"search\" placeholder=\"Enter Search\" />-->\n  <!--              <button type=\"submit\">-->\n  <!--                <img src=\"https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon.png\" alt=\"Search Icon\">-->\n  <!--              </button>-->\n  <!--            </form>-->\n  <!--          </div>-->\n  <!--        </li>-->\n\n\n  <!--      </ul>-->\n  <!--    </nav>-->\n\n  <!--  </div>-->\n  <!--</aside>-->\n\n</template>\n"; });
define('text!search/ehr.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n\n  <h1>Health records</h1>\n\n  <md-card\n    md-color=\"indigo lighten-3\"\n    md-title=\"${patient.name}\"\n    md-reveal=\"false\"\n    md-size=\"small\"\n    repeat.for=\"patient of model.bl.patients\">\n    <div>\n      <md-progress md-value.bind=\"patient.relevance\"></md-progress>\n      <p class=\"right\"><span>${patient.relevance}%</span><span> similarities</span></p>\n      <md-chip md-close=\"false\" repeat.for=\"word of patient.words\">${word}</md-chip>\n      <p>${patient.ehr_short}</p>\n    </div>\n    <div slot=\"reveal-text\">\n      ${patient.ehr}\n    </div>\n  </md-card>\n\n    <div class=\"cards\">\n      <div class=\"card\" repeat.for=\"patient of model.bl.patients\">\n        <div class=\"card-stats\">\n          <div class=\"stats-row\">\n            <p class=\"small\">similarities</p>${patient.relevance}%</div>\n        </div>\n\n        <div class=\"card-header\">\n          ${patient.name}\n        </div>\n        <div class=\"card-copy\">\n          <p>${patient.ehr_short}</p>\n          <p>\n            <span class=\"badge-notice\" repeat.for=\"word of patient.words\">${word}</span>\n            <span class=\"badge-alert\">Cortisol</span>\n          </p>\n        </div>\n\n      </div>\n\n  <div class=\"card\">\n    <div class=\"card-image\">\n      <img src=\"https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains-3.png\" alt=\"\">\n    </div>\n    <div class=\"card-header\">\n      The Last Card\n    </div>\n    <div class=\"card-copy\">\n      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>\n    </div>\n  </div>\n</div>\n</section>\n\n</template>"; });
define('text!search/literature.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n\n<h1>Literature</h1>\n\n</section>\n</template>"; });
define('text!styles/main.css', ['module'], function(module) { module.exports = "html {\n  box-sizing: border-box; }\n\n*, *::after, *::before {\n  box-sizing: inherit; }\n\nbutton, input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  appearance: none;\n  background-color: #1565c0;\n  border: 0;\n  border-radius: 3px;\n  color: #fff;\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  -webkit-font-smoothing: antialiased;\n  font-weight: 600;\n  line-height: 1;\n  padding: 0.75em 1.5em;\n  text-decoration: none;\n  transition: background-color 150ms ease;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap; }\n  button:hover, button:focus, input[type=\"button\"]:hover, input[type=\"button\"]:focus, input[type=\"reset\"]:hover, input[type=\"reset\"]:focus, input[type=\"submit\"]:hover, input[type=\"submit\"]:focus {\n    background-color: #11519a;\n    color: #fff; }\n  button:disabled, input[type=\"button\"]:disabled, input[type=\"reset\"]:disabled, input[type=\"submit\"]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5; }\n    button:disabled:hover, input[type=\"button\"]:disabled:hover, input[type=\"reset\"]:disabled:hover, input[type=\"submit\"]:disabled:hover {\n      background-color: #1565c0; }\n\nfieldset {\n  background-color: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0; }\n\nlegend {\n  font-weight: 600;\n  margin-bottom: 0.375em;\n  padding: 0; }\n\nlabel {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 0.375em; }\n\ninput,\nselect {\n  display: block;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em; }\n\ninput[type=\"color\"], input[type=\"date\"], input[type=\"datetime\"], input[type=\"datetime-local\"], input[type=\"email\"], input[type=\"month\"], input[type=\"number\"], input[type=\"password\"], input[type=\"search\"], input[type=\"tel\"], input[type=\"text\"], input[type=\"time\"], input[type=\"url\"], input[type=\"week\"], input:not([type]), textarea,\nselect[multiple] {\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  margin-bottom: 0.75em;\n  padding: 0.5em;\n  transition: border-color 150ms ease;\n  width: 100%; }\n  input[type=\"color\"]:hover, input[type=\"date\"]:hover, input[type=\"datetime\"]:hover, input[type=\"datetime-local\"]:hover, input[type=\"email\"]:hover, input[type=\"month\"]:hover, input[type=\"number\"]:hover, input[type=\"password\"]:hover, input[type=\"search\"]:hover, input[type=\"tel\"]:hover, input[type=\"text\"]:hover, input[type=\"time\"]:hover, input[type=\"url\"]:hover, input[type=\"week\"]:hover, input:not([type]):hover, textarea:hover,\n  select[multiple]:hover {\n    border-color: #b1b1b1; }\n  input[type=\"color\"]:focus, input[type=\"date\"]:focus, input[type=\"datetime\"]:focus, input[type=\"datetime-local\"]:focus, input[type=\"email\"]:focus, input[type=\"month\"]:focus, input[type=\"number\"]:focus, input[type=\"password\"]:focus, input[type=\"search\"]:focus, input[type=\"tel\"]:focus, input[type=\"text\"]:focus, input[type=\"time\"]:focus, input[type=\"url\"]:focus, input[type=\"week\"]:focus, input:not([type]):focus, textarea:focus,\n  select[multiple]:focus {\n    border-color: #1565c0;\n    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 0 5px rgba(18, 89, 169, 0.7);\n    outline: none; }\n  input[type=\"color\"]:disabled, input[type=\"date\"]:disabled, input[type=\"datetime\"]:disabled, input[type=\"datetime-local\"]:disabled, input[type=\"email\"]:disabled, input[type=\"month\"]:disabled, input[type=\"number\"]:disabled, input[type=\"password\"]:disabled, input[type=\"search\"]:disabled, input[type=\"tel\"]:disabled, input[type=\"text\"]:disabled, input[type=\"time\"]:disabled, input[type=\"url\"]:disabled, input[type=\"week\"]:disabled, input:not([type]):disabled, textarea:disabled,\n  select[multiple]:disabled {\n    background-color: #f2f2f2;\n    cursor: not-allowed; }\n    input[type=\"color\"]:disabled:hover, input[type=\"date\"]:disabled:hover, input[type=\"datetime\"]:disabled:hover, input[type=\"datetime-local\"]:disabled:hover, input[type=\"email\"]:disabled:hover, input[type=\"month\"]:disabled:hover, input[type=\"number\"]:disabled:hover, input[type=\"password\"]:disabled:hover, input[type=\"search\"]:disabled:hover, input[type=\"tel\"]:disabled:hover, input[type=\"text\"]:disabled:hover, input[type=\"time\"]:disabled:hover, input[type=\"url\"]:disabled:hover, input[type=\"week\"]:disabled:hover, input:not([type]):disabled:hover, textarea:disabled:hover,\n    select[multiple]:disabled:hover {\n      border: 1px solid #ddd; }\n\ntextarea {\n  resize: vertical; }\n\n[type=\"search\"] {\n  appearance: none; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  display: inline;\n  margin-right: 0.375em; }\n\n[type=\"file\"] {\n  margin-bottom: 0.75em;\n  width: 100%; }\n\nselect {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  width: auto; }\n\nul,\nol {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\ndl {\n  margin-bottom: 0.75em; }\n  dl dt {\n    font-weight: 600;\n    margin-top: 0.75em; }\n  dl dd {\n    margin: 0; }\n\ntable {\n  border-collapse: collapse;\n  margin: 0.75em 0;\n  table-layout: fixed;\n  width: 100%; }\n\nth {\n  border-bottom: 1px solid #a6a6a6;\n  font-weight: 600;\n  padding: 0.75em 0;\n  text-align: left; }\n\ntd {\n  border-bottom: 1px solid #ddd;\n  padding: 0.75em 0; }\n\ntr,\ntd,\nth {\n  vertical-align: middle; }\n\nbody {\n  color: #333;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  line-height: 1.5; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  line-height: 1.2;\n  margin: 0 0 0.75em; }\n\np {\n  margin: 0 0 0.75em; }\n\na {\n  color: #1565c0;\n  text-decoration: none;\n  transition: color 150ms ease; }\n  a:active, a:focus, a:hover {\n    color: #104c90; }\n\nhr {\n  border-bottom: 1px solid #ddd;\n  border-left: 0;\n  border-right: 0;\n  border-top: 0;\n  margin: 1.5em 0; }\n\nimg,\npicture {\n  margin: 0;\n  max-width: 100%; }\n\n.cards {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between; }\n\n.card {\n  background-color: #f7f7f7;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  box-shadow: 0 2px 4px #e6e6e6;\n  cursor: pointer;\n  flex-basis: 15em;\n  flex-grow: 1;\n  margin: 0 1em 1.5em 1em;\n  position: relative;\n  transition: all 0.2s ease-in-out; }\n  .card .card-image {\n    background-color: #F8F2B4;\n    height: 150px;\n    max-height: 150px;\n    overflow: hidden; }\n    .card .card-image img {\n      border-top-left-radius: 3px;\n      border-top-right-radius: 3px;\n      opacity: 1;\n      transition: all 0.2s ease-in-out;\n      width: 100%; }\n  .card .card-stats {\n    background-image: url(https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png);\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    background-color: #F8F2B4;\n    height: 150px;\n    max-height: 150px;\n    overflow: hidden; }\n  .card .card-header {\n    background-color: #f7f7f7;\n    border-bottom: 1px solid #ddd;\n    border-radius: 3px 3px 0 0;\n    font-weight: bold;\n    line-height: 1.5em;\n    padding: 0.5em 0.75em;\n    transition: all 0.2s ease-in-out; }\n  .card .card-copy {\n    font-size: 0.9em;\n    line-height: 1.5em;\n    padding: 0.75em 0.75em; }\n    .card .card-copy p {\n      margin: 0 0 0.75em; }\n  .card:focus, .card:hover {\n    cursor: pointer; }\n    .card:focus img, .card:hover img {\n      opacity: 0.7; }\n  .card:active {\n    background-color: #f7f7f7; }\n    .card:active .card-header {\n      background-color: #f7f7f7; }\n\n.stats-row {\n  font-size: 4.5rem;\n  display: flex; }\n  .stats-row .small {\n    font-size: 1rem; }\n\nform.search-bar {\n  position: relative; }\n  form.search-bar textarea[type=search] {\n    appearance: none;\n    background-color: white;\n    border: 1px solid #ddd;\n    box-sizing: border-box;\n    display: block;\n    font-size: 1em;\n    font-style: italic;\n    margin: 0;\n    padding: 0.5em 0.5em;\n    position: relative;\n    transition: border-color;\n    width: 100%;\n    height: 60vh; }\n  form.search-bar button[type=submit] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    outline: none;\n    padding: 5px 10px; }\n    form.search-bar button[type=submit] img {\n      height: 12px;\n      opacity: 0.7; }\n\n.comment {\n  border-bottom: 1px solid rgba(51, 51, 51, 0.1);\n  display: table;\n  margin-bottom: 1.5em;\n  padding-bottom: 1em;\n  width: 100%; }\n  .comment .comment-image,\n  .comment .comment-content {\n    display: table-cell;\n    vertical-align: top; }\n  .comment .comment-image {\n    padding-right: 1.4em; }\n    .comment .comment-image > img {\n      background: #388be9;\n      border-radius: 3px;\n      display: block;\n      height: auto;\n      max-width: none;\n      padding: 0.7em;\n      width: 4em; }\n    .comment-reverse-order .comment .comment-image {\n      padding-left: 10px;\n      padding-right: 0; }\n  .comment .comment-content {\n    width: 100%; }\n    .comment .comment-content h1 {\n      font-size: 1em;\n      margin: 0 0 0.5em 0; }\n    .comment .comment-content p {\n      line-height: 1.5em;\n      margin-bottom: 0.5em; }\n    .comment .comment-content p.comment-detail {\n      color: rgba(51, 51, 51, 0.5);\n      font-size: 0.9em;\n      font-style: italic; }\n\n.badge-alert {\n  background-color: #fff6bf;\n  border-radius: 3.75em;\n  color: #8c7800;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-default {\n  background-color: #999;\n  border-radius: 3.75em;\n  color: black;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-error {\n  background-color: #fbe3e4;\n  border-radius: 3.75em;\n  color: #97161b;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-notice {\n  background-color: #e5edf8;\n  border-radius: 3.75em;\n  color: #244e87;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.badge-success {\n  background-color: #e6efc2;\n  border-radius: 3.75em;\n  color: #56651a;\n  display: inline-block;\n  font-size: 0.75em;\n  line-height: 1;\n  padding: 0.4em 1.2em; }\n\n.sliding_menu {\n  position: fixed;\n  z-index: 999;\n  background-color: #67b5d1;\n  top: 0;\n  left: 0;\n  -webkit-transform: translateX(-100%);\n  -moz-transform: translateX(-100%);\n  -ms-transform: translateX(-100%);\n  -o-transform: translateX(-100%);\n  transform: translateX(-100%);\n  background: -webkit-linear-gradient(red, green) left repeat;\n  background: linear-gradient(red, green) left repeat; }\n  .sliding_menu.is_active {\n    -webkit-animation: changeBack 3s;\n    animation: changeBack 3s;\n    width: 100%;\n    height: 100%;\n    overflow-y: scroll; }\n\n.sliding_menu-fade-screen {\n  position: fixed;\n  z-index: 998;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 0;\n  height: 0;\n  background-color: #000;\n  opacity: 0;\n  transition: opacity 0.3s, width 0s 0.3s, height 0s 0.3s; }\n  .sliding_menu-fade-screen.is_active {\n    width: 100%;\n    height: 100%;\n    opacity: 0.7;\n    transition: opacity 0.3s; }\n\n/**\n * Body states.\n *\n * When a menu is active, we want to hide the overflows on the body to prevent\n * awkward document scrolling.\n */\nbody.has-active-menu {\n  overflow: hidden; }\n\n@-webkit-keyframes changeBack {\n  0% {\n    background-color: #e6efff; }\n  25% {\n    background-color: #4d91ff; }\n  50% {\n    background-color: #0058e6; }\n  75% {\n    background-color: #003180; }\n  100% {\n    background-color: #000a1a; } }\n\n@keyframes changeBack {\n  0% {\n    background-color: #000a1a; }\n  25% {\n    background-color: #003180; }\n  50% {\n    background-color: #0058e6; }\n  75% {\n    background-color: #4d91ff; }\n  100% {\n    background-color: #e6efff; } }\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s; }\n\n/* animate page transitions */\nsection.au-enter-leave {\n  -webkit-animation: fadeOutLeft 1s;\n  animation: fadeOutLeft 1s; }\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms; }\n\n/* animation definitions */\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none; } }\n\n@keyframes fadeOutLeft {\n  0% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\nbody {\n  font-family: GillSans, Calibri, Trebuchet, sans-serif;\n  max-width: 1200px;\n  margin-left: auto;\n  margin-right: auto; }\n  body::after {\n    clear: both;\n    content: \"\";\n    display: block; }\n\nnav {\n  padding: 0 2vw 0 2vw;\n  border-bottom: 1px solid #ddd !important;\n  height: 75px;\n  margin-bottom: 2vh;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center; }\n  nav > ul {\n    display: flex;\n    flex-direction: row; }\n\n.rounded {\n  height: 50px;\n  width: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid #1565c0;\n  border-radius: 50%;\n  cursor: pointer;\n  text-align: center;\n  -webkit-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  z-index: 9999;\n  font-size: 1.5rem; }\n  .rounded.secondary {\n    color: #ddd;\n    border-color: #ddd; }\n\n.results {\n  padding: 0 2vw; }\n"; });
define('text!search/search.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"content\">\n\n    <div class=\"results row au-stagger\">\n        <router-view swap-order=\"after\"></router-view>\n    </div>\n\n\n  </section>\n\n\n  <!--<aside class.bind=\"hideMenu ? 'sliding-panel-content is-visible ' : 'sliding-panel-content'\">-->\n  <!--  <nav role=\"navigation\">-->\n  <!--    <a class=\"rounded secondary\" click.delegate=\"hideMenu = hideMenu ? false : true\">-->\n  <!--      <i class=\"fa fa-times\" aria-hidden=\"true\"></i>-->\n  <!--    </a>-->\n  <!--  </nav>-->\n\n  <!--  <section>-->\n  <!--    <form class=\"search-bar\" role=\"search\">-->\n  <!--      <textarea type=\"search\" placeholder=\"Enter Search\">-->\n\n  <!--        Ms [**Known patient lastname 241**] is a [**Age over 90 2398**] year old woman with past medical history significant for hypertension, severe aortic stenosis, hyperlipidemia, arthroplasty. . Per the patient, she was standing and felt a snap of her right leg and fell to the ground. No head trauma or LOC. She was evaluated by orthopedics and transferred to medicine for optimization of her cardiac status. Review of systems: Ear, Nose, Throat: Dry mouth Cardiovascular: Edema, Orthopnea Respiratory: Dyspnea Flowsheet Data as of [**3294-3-6**] 10:33 PM Vital Signs Hemodynamic monitoring Fluid Balance 24 hours Since [**96**] AM Tmax: 37.5 C (99.5) Tcurrent: 37.5 C (99.5) HR: 102 (93 - 102) bpm BP: 117/54(70) {117/54(70) - 117/54(70)} mmHg RR: 24 (15 - 24) insp/min SpO2: 100% Heart rhythm: ST (Sinus Tachycardia) . -- Clarify She appears comfortable with adequate pain control with prn morphine. Given her tight valvular stenosis, she is high risk for general anesthesia. - would start standing tylenol 1g q8 - continue morphine IV prn for breakthrough - plan for OR tomorrow am per ortho pending optimization of her cardiac function, and improvement in renal function . # CAD: No clear documentation, however given age calcific atherosclerosis is highly likely -- continue statin -- Hold beta blocker for now -- hold aspirin in perioperative period . # ATRIAL FIBRILLATION: In setting of acute pain and peri-op. Will need to monitor as pt with high CHADS score, however in periop period would not be able to have systemic anticoagulation -- Rate control with beta blocker once stable -- If unstable, would use esmolol first, cardiovert last option. . # HTN: Better controlled on floor. Good BP control essential for preventing flash pulmonary edema in setting of AS. - continue metoprolol, as above - continue to monitor BP and consider adding another [**Doctor Last Name **] such as amlodipine 5mg daily if BP sustains above SBP 150s . # Hyperlipidemia - continue simvastatin 40mg PO daily . # FEN/GI: Low sodium diet, replete lytes PRN . # CODE: Confirmed DNR/DNI-->\n\n  <!--      </textarea>-->\n  <!--    </form>-->\n  <!--  </section>-->\n\n  <!--  <hr>-->\n  <!--  <a class=\"rounded\" href=\"#/settings\"><i class=\"fa fa-cogs\" aria-hidden=\"true\"></i></a>-->\n  <!--</aside>-->\n\n  <!--<div class=\"sliding-panel-fade-screen\" click.delegate=\"hideMenu = hideMenu ? false : true\" class.bind=\"hideMenu ? 'sliding-panel-fade-screen is-visible' : 'sliding-panel-fade-screen'\"></div>-->\n\n\n</template>"; });
define('text!search/trial.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n\n<h1>Trials</h1>\n\n<div class=\"comment\">\n  <div class=\"comment-image\">\n    <img src=\"https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png\">\n  </div>\n  <div class=\"comment-content\">\n    <h1>First Comment Title or Author</h1>\n    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, aspernatur, quia modi minima debitis tempora ducimus quam vero impedit alias earum nemo error tenetur sed.</p>\n    <p class=\"comment-detail\">Date or details about this post</p>\n  </div>\n</div>\n\n<div class=\"comment\">\n  <div class=\"comment-image\">\n    <img src=\"https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_square.png\">\n  </div>\n  <div class=\"comment-content\">\n    <h1>Another One</h1>\n    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, aspernatur, quia modi minima debitis tempora ducimus quam vero impedit alias earum nemo error tenetur sed.</p>\n    <p class=\"comment-detail\">Date or details about this post</p>\n  </div>\n</div>\n\n\n</section>\n</template>"; });
define('text!settings/settings.html', ['module'], function(module) { module.exports = "<template>\n\n    <h1>Settings</h1>\n\n    <button click.delegate=\"reloadBL()\">reload Business Layer</button>\n</template>\n"; });
define('text!users/no-selection.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n    <div class=\"no-selection text-center\">\n      <h2>${message}</h2>\n    </div>\n  </section>\n</template>\n"; });
define('text!users/user.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"blur-image\"></require>\n\n  <section class=\"au-animate\">\n    <h2>${heading} - ${name}</h2>\n    <div class=\"row au-stagger\">\n\n  </section>\n</template>\n"; });
define('text!users/users.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"blur-image\"></require>\n\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <div class=\"row au-stagger\">\n      <router-view swap-order=\"after\"></router-view>\n    </div>\n\n    <hr/>\n    <section id=\"UserSearch\" class=\"row container\">\n      <!--<input type=\"search\" class=\"form-control\" placeholder=\"Search for...\" value.bind=\"search & debounce:200\" />-->\n      <input type=\"search\" class=\"form-control\" placeholder=\"Search for...\" keyup.delegate=\"query($event) & debounce:100\" value.bind=\"search \" />\n    </section>\n\n    <hr/>\n\n    <div class=\"row au-stagger\">\n      <div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of model.users.users\"  >\n        <div class=\"card\">\n          <a route-href=\"route: users; params.bind: {name:user.login}\">\n          <canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas>\n          <div class=\"avatar\">\n            <img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"/>\n          </div>\n          <div class=\"content\">\n            <p class=\"name\">${user.login}</p>\n            <p><a target=\"_blank\" class=\"btn btn-default\" click.delegate=\"click(user)\" >Contact</a></p>\n          </div>\n          </a>\n        </div>\n      </div>\n    </div>\n\n\n  </section>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map