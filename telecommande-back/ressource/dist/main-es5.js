function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<router-outlet></router-outlet>\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/camera/camera-tile/camera-tile.component.html":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/camera/camera-tile/camera-tile.component.html ***!
    \*****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCameraCameraTileCameraTileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"tuile_1x1 material-icons\" style=\"background-color: darkseagreen;\" (click)=\"launchWebcam()\">\n    <h1>camera_alt</h1>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/camera/camera-view/camera-view.component.html":
  /*!*****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/camera/camera-view/camera-view.component.html ***!
    \*****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCameraCameraViewCameraViewComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-header [swipeLeft]=\"remoteView\"  [swipeLeftIcon]=\"swipeRightIcon\"></app-header>\n\n<div style=\"margin-top: 85px;\">\n    <app-popup-camera></app-popup-camera>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/camera/popup-camera/popup-camera.component.html":
  /*!*******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/camera/popup-camera/popup-camera.component.html ***!
    \*******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCameraPopupCameraPopupCameraComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<mat-dialog-content>\n    <div>\n         <img [src]=\"blobData\"\n         class=\"screenshot-webcam\"\n         alt=\"Screenshot webcam récupérée en quasi temps-réel\">\n    </div>\n</mat-dialog-content>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/desktop-tile/desktop-tile.component.html":
  /*!********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/desktop-tile/desktop-tile.component.html ***!
    \********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDesktopDesktopTileDesktopTileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"tuile_1x1 material-icons\" style=\"background-color: orange;\" (click)=\"launchDesktop()\">\n    <h1>desktop_windowsmouse</h1>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/desktop-view/desktop-view.component.html":
  /*!********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/desktop-view/desktop-view.component.html ***!
    \********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDesktopDesktopViewDesktopViewComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-header [swipeRight]=\"remoteView\"  [swipeRightIcon]=\"swipeRightIcon\"></app-header>\n\n<div>\n    <app-popup-image-bureau></app-popup-image-bureau>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/popup-image-bureau/popup-image-bureau.component.html":
  /*!********************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/popup-image-bureau/popup-image-bureau.component.html ***!
    \********************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDesktopPopupImageBureauPopupImageBureauComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div style=\"margin-bottom: 5em\"> \n     <mat-dialog-content>\n          <div (click)=\"getClickPosition($event)\" >\n               <img [src]=\"getDesktopBlobUrl()\"\n               class=\"screenshot-bureau\"\n               alt=\"Screenshot du bureau récupérée temps-réel\">\n          </div>\n     </mat-dialog-content>\n</div>\n<div class=\"menu-bar\">\n     <button mat-mini-fab color=\"primary\" class=\"menu-bar menu-input\" (click)=\"toggleKeyboard()\"></button>\n\n     <mat-form-field *ngIf=\"this.displayKeyboard\" class=\"menu-bar keyboard-input\" style=\"background-color: hsla(0, 0%, 100%, 0.384); border: black 1px solid;\">\n          <input matInput [(ngModel)]=\"keyboardInputValue\">\n          <button mat-button *ngIf=\"keyboardInputValue\" matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"keyboardInputValue=''\">\n               x\n          </button>\n     </mat-form-field>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/header/header.component.html":
  /*!************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/header/header.component.html ***!
    \************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHeaderHeaderComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div id=\"title\" class=\"titre-telecommande\" \n    (click)=\"headshake()\" \n    (swipeleft)=\"onSwipeLeft()\" \n    (swiperight)=\"onSwipeRight()\">\n    \n\n    <div class=\"icons\" style=\"display: flex; justify-content: space-around;\">\n    \n            <h1><div class=\"material-icons\" (click)=\"onSwipeRight()\">{{this.symbolMap.get(this.swipeRight)}}</div></h1>\n            <h1>TELECOMMANDE</h1>\n            <h1><div class=\"material-icons\" (click)=\"onSwipeLeft()\">{{this.symbolMap.get(this.swipeLeft)}}</div></h1>\n\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shutdown/popup-shutdown/popup-shutdown.component.html":
  /*!*************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shutdown/popup-shutdown/popup-shutdown.component.html ***!
    \*************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppShutdownPopupShutdownPopupShutdownComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"card my-5\">\n  <div class=\"card-body\">\n      <div *ngIf=\"!stateService.getShutdownActive()\">\n\n        <div style=\"display: flex; justify-content: space-around;\">\n          <button class=\"material-icons shutdown-action\" [class.pressed]=\"isShutdown\" (click)=\"shutdownAction(true)\">power_settings_new</button>\n          <button class=\"material-icons shutdown-action\" [class.pressed]=\"!isShutdown\" (click)=\"shutdownAction(false)\">dark_mode</button>\n        </div>\n\n          <mat-form-field *ngIf=\"isShutdown\">\n            <mat-select placeholder=\"Eteindre dans ...\">\n              <cdk-virtual-scroll-viewport itemSize=\"50\" class=\"menu\">\n                <mat-option *ngFor=\"let choix of heures\" [value]=\"choix\" (click)=\"selectionnerHeure(choix)\">{{choix}}</mat-option>\n              </cdk-virtual-scroll-viewport>\n            </mat-select>\n          </mat-form-field>\n\n        <button *ngIf=\"heureSelected != undefined || !isShutdown\" mat-raised-button type=\"submit\" class=\"btn btn-info\" (click)=\"onSubmitShutdown()\">Valider</button>\n      </div>\n\n      <div *ngIf=\"stateService.getShutdownActive()\" class=\"shutdown-text\">\n        <span>\n          Le PC s'éteindra dans\n        </span>\n        <span>\n          <h3>{{stateService.getHourBeforeShutdown()}}H{{stateService.getMinuteBeforeShutdown()}}:{{stateService.getSecondBeforeShutdown()}}</h3>\n        </span>\n        <br/>\n        <button mat-raised-button type=\"submit\" color=\"accent\" class=\"btn btn-info\" (click)=\"onSubmitCancel()\">Annuler</button>\n      </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shutdown/shutdown-tile/shutdown-tile.component.html":
  /*!***********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shutdown/shutdown-tile/shutdown-tile.component.html ***!
    \***********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppShutdownShutdownTileShutdownTileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div *ngIf=\"stateService.getShutdownActive()\" class=\"tuile_1x1\" style=\"background-color: lightcoral\" (click)=\"openShutdown()\">\n    <h2>\n        {{stateService.getHourBeforeShutdown()}}h{{stateService.getMinuteBeforeShutdown()}}:{{stateService.getSecondBeforeShutdown()}}\n    </h2>\n</div>\n<div *ngIf=\"!stateService.getShutdownActive()\" class=\"tuile_1x1 material-icons\" style=\"background-color: lightcoral\" (click)=\"openShutdown()\">\n    <h1>power_settings_new</h1>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/slider-volume/slider-volume.component.html":
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/slider-volume/slider-volume.component.html ***!
    \**************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSliderVolumeSliderVolumeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"tuile_2x1 material-icons\" style=\"background-color: lightcyan;\">\n    <h1>volume_up</h1>\n    <mat-slider\n        class=\"mat-slider\"\n        [max]=100\n        [min]=0\n        [step]=\"step\"\n        [thumbLabel]=true\n        (input)=\"onChangeVolume($event)\">\n    </mat-slider>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/telecommande/telecommande.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/telecommande/telecommande.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppTelecommandeTelecommandeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div *ngIf=\"!videoSurveillanceMode\">\n    <app-header [swipeLeft]=\"desktopView\" [swipeLeftIcon]=\"swipeLeftIcon\" [swipeRight]=\"cameraView\" [swipeRightIcon]=\"swipeRightIcon\"></app-header>\n\n    <div class=\"remote-container\">\n        <app-shutdown-tile></app-shutdown-tile>\n        <app-slider-volume></app-slider-volume>\n        <app-volume-switch-tile></app-volume-switch-tile>\n        <app-television-tile></app-television-tile>\n        <app-desktop-tile></app-desktop-tile>\n        <app-camera-tile></app-camera-tile>\n        <app-youtube-tile></app-youtube-tile>\n        <app-vocal-tile></app-vocal-tile>\n    </div>\n</div>\n\n<div *ngIf=\"videoSurveillanceMode\">\n    <app-header [swipeLeft]=\"desktopView\" [swipeLeftIcon]=\"swipeLeftIcon\" [swipeRight]=\"cameraView\" [swipeRightIcon]=\"swipeRightIcon\"></app-header>\n\n    <div class=\"remote-container\">\n        <div class=\"tuile_1x1 disabled-tile\">Désactivé</div>\n        <div class=\"tuile_2x1 disabled-tile\">Désactivé</div>\n        <div class=\"tuile_1x1 disabled-tile\">Désactivé</div>\n        <div class=\"tuile_1x1 disabled-tile\">Désactivé</div>\n        <div class=\"tuile_1x1 disabled-tile\">Désactivé</div>\n        <div class=\"tuile_1x1 disabled-tile\">Désactivé</div>\n        <div class=\"tuile_1x1 disabled-tile\">Désactivé</div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.html":
  /*!***************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.html ***!
    \***************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppTelevisionPopupRemoteTvPopupAlttabPopupAlttabComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<p><img [src]=\"giflove\"/></p>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/television/popup-remote-tv/popup-remote-tv.component.html":
  /*!*****************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/television/popup-remote-tv/popup-remote-tv.component.html ***!
    \*****************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppTelevisionPopupRemoteTvPopupRemoteTvComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"verticalContainer\">\n    <div class=\"mediaPanel\">\n        <img src=\"{{currentMedia ? currentMedia : noCurrentMediaIconUri}}\"/>\n    </div>\n    <div class=\"controlContainer\">\n        <!--<div class=\"material-icons\" (click)=\"switchPause()\"><h1>pause_circle_outline</h1></div>-->\n        <div class=\"material-icons\" *ngIf=\"currentMedia\" (click)=\"fullScreen()\"><h1>fullscreen</h1></div>\n        <div class=\"material-icons\" (click)=\"currentMedia ? closeReadingTab() : closeGeneralTab()\"><h1>close</h1></div>\n        <div class=\"material-icons\" (click)=\"switchMonitor()\"><h1>keyboard_arrow_left</h1></div>\n        <div class=\"material-icons\" (click)=\"switchMonitor()\"><h1>keyboard_arrow_right</h1></div>\n        <div class=\"material-icons\" (click)=\"openAltTab()\"><h1>view_carousel</h1></div>\n    </div>\n    <div class=\"chaineSlider\">\n        <div *ngFor=\"let chaine of arrayChainetvUri\" (click)=\"selectedChannel(chaine.nom)\" class=\"chainetv\" [ngStyle]=\"{'background-image': 'url(' + chaine.uri + ')'}\">\n            <div *ngIf=\"chaine.reading\" class=\"equalizer\">\n                <img src={{readingIconUri}}/>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/television/television-tile/television-tile.component.html":
  /*!*****************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/television/television-tile/television-tile.component.html ***!
    \*****************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppTelevisionTelevisionTileTelevisionTileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"tuile_1x1 material-icons\" style=\"background-color: burlywood;\" (click)=\"openTv()\">\n    <h1>live_tvsettings_remote</h1>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/vocal-tile/vocal-tile.component.html":
  /*!********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/vocal-tile/vocal-tile.component.html ***!
    \********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppVocalTileVocalTileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div #vocalTile class=\"tuile_3x1\" style=\"background-color: lightcyan;\" (click)=\"listen()\">\n    <div>\n        {{this.keyboardInputValue}}\n    </div>\n    <div>\n        <input matInput *ngIf=\"inputDisplayed\" #vocalCommandInput class=\"vocal-input\" [(ngModel)]=\"keyboardInputValue\" (ngModelChange)=\"onModelChange($event)\">\n    </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.html":
  /*!**************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.html ***!
    \**************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppVolumeSwitchVolumeSwitchTileVolumeSwitchTileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div [ngClass]=\"getMuteClass()\" \n    (click)=\"switchVolumeMute()\">\n    <div>\n        <h1>{{ this.currentMuted ? 'volume_off' : 'volume_mute' }}</h1>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/youtube-unit/youtube-unit.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/youtube-unit/youtube-unit.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppYoutubeUnitYoutubeUnitComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"card border-0 shadow vh-50\">\n      <img [src]=\"video.snippet.thumbnails.medium.url\" class=\"card-img-top\" alt=\"...\">\n    <div class=\"card-body text-center\">\n        <h5 class=\"card-title mb-0\">\n            {{video.snippet.title}}\n        </h5>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/youtube/popup-youtube/popup-youtube.component.html":
  /*!**********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/youtube/popup-youtube/popup-youtube.component.html ***!
    \**********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppYoutubePopupYoutubePopupYoutubeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"youtube-container\">\n    <div>\n        <mat-form-field class=\"example-full-width\">\n        <input matInput placeholder=\"URL de la vidéo à lire\" type=\"search\"  [(ngModel)]=\"search\" onsubmit=\"onSubmit()\">\n        </mat-form-field>\n    </div>\n    <div>\n        <div class=\"material-icons\" (click)=\"onSubmit()\"><h1>play_arrow</h1></div>\n        <div class=\"material-icons\" (click)=\"closeCurrentTab()\" *ngIf=\"this.onRead\"><h1>close</h1></div>\n        <div class=\"material-icons\" (click)=\"switchMonitor()\" *ngIf=\"this.onRead\"><h1>keyboard_arrow_left</h1></div>\n        <div class=\"material-icons\" (click)=\"switchMonitor()\" *ngIf=\"this.onRead\"><h1>keyboard_arrow_right</h1></div>\n    </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/youtube/youtube-tile/youtube-tile.component.html":
  /*!********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/youtube/youtube-tile/youtube-tile.component.html ***!
    \********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppYoutubeYoutubeTileYoutubeTileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"tuile_1x1 material-icons\" style=\"background-color: white; color:#FF0000\" (click)=\"openYoutube()\">\n    <h1>subscriptions</h1>\n</div>";
    /***/
  },

  /***/
  "./node_modules/tslib/tslib.es6.js":
  /*!*****************************************!*\
    !*** ./node_modules/tslib/tslib.es6.js ***!
    \*****************************************/

  /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */

  /***/
  function node_modulesTslibTslibEs6Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__extends", function () {
      return __extends;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__assign", function () {
      return _assign;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__rest", function () {
      return __rest;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__decorate", function () {
      return __decorate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__param", function () {
      return __param;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__metadata", function () {
      return __metadata;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__awaiter", function () {
      return __awaiter;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__generator", function () {
      return __generator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__exportStar", function () {
      return __exportStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__values", function () {
      return __values;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__read", function () {
      return __read;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spread", function () {
      return __spread;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () {
      return __spreadArrays;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__await", function () {
      return __await;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () {
      return __asyncGenerator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () {
      return __asyncDelegator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncValues", function () {
      return __asyncValues;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () {
      return __makeTemplateObject;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importStar", function () {
      return __importStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importDefault", function () {
      return __importDefault;
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */


    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    function __extends(d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var _assign = function __assign() {
      _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return _assign.apply(this, arguments);
    };

    function __rest(s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }

    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    }

    function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : new P(function (resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }

    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    function __exportStar(m, exports) {
      for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
      }
    }

    function __values(o) {
      var m = typeof Symbol === "function" && o[Symbol.iterator],
          i = 0;
      if (m) return m.call(o);
      return {
        next: function next() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
    }

    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
          ar.push(r.value);
        }
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }

    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
      }

      return ar;
    }

    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
        s += arguments[i].length;
      }

      for (var r = Array(s), k = 0, i = 0; i < il; i++) {
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
          r[k] = a[j];
        }
      }

      return r;
    }

    ;

    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i;

      function verb(n) {
        if (g[n]) i[n] = function (v) {
          return new Promise(function (a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }

      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }

      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }

      function fulfill(value) {
        resume("next", value);
      }

      function reject(value) {
        resume("throw", value);
      }

      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    }

    function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
      }), verb("return"), i[Symbol.iterator] = function () {
        return this;
      }, i;

      function verb(n, f) {
        i[n] = o[n] ? function (v) {
          return (p = !p) ? {
            value: __await(o[n](v)),
            done: n === "return"
          } : f ? f(v) : v;
        } : f;
      }
    }

    function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator],
          i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i);

      function verb(n) {
        i[n] = o[n] && function (v) {
          return new Promise(function (resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }

      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
          resolve({
            value: v,
            done: d
          });
        }, reject);
      }
    }

    function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
          value: raw
        });
      } else {
        cooked.raw = raw;
      }

      return cooked;
    }

    ;

    function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    }

    function __importDefault(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    }
    /***/

  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _desktop_desktop_view_desktop_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./desktop/desktop-view/desktop-view.component */
    "./src/app/desktop/desktop-view/desktop-view.component.ts");
    /* harmony import */


    var _camera_camera_view_camera_view_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./camera/camera-view/camera-view.component */
    "./src/app/camera/camera-view/camera-view.component.ts");
    /* harmony import */


    var _telecommande_telecommande_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./telecommande/telecommande.component */
    "./src/app/telecommande/telecommande.component.ts");

    var routes = [{
      path: 'camera-view',
      component: _camera_camera_view_camera_view_component__WEBPACK_IMPORTED_MODULE_4__["CameraViewComponent"]
    }, {
      path: 'desktop-view',
      component: _desktop_desktop_view_desktop_view_component__WEBPACK_IMPORTED_MODULE_3__["DesktopViewComponent"]
    }, {
      path: 'remote',
      component: _telecommande_telecommande_component__WEBPACK_IMPORTED_MODULE_5__["TelecommandeComponent"]
    }, {
      path: '',
      component: _telecommande_telecommande_component__WEBPACK_IMPORTED_MODULE_5__["TelecommandeComponent"]
    }];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], AppRoutingModule);
    /***/
  },

  /***/
  "./src/app/app.component.css":
  /*!***********************************!*\
    !*** ./src/app/app.component.css ***!
    \***********************************/

  /*! exports provided: default */

  /***/
  function srcAppAppComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);

      this.title = 'Telecommande';
    };

    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./app.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./app.component.css */
      "./src/app/app.component.css"))["default"]]
    })], AppComponent);
    /***/
  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _telecommande_telecommande_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./telecommande/telecommande.component */
    "./src/app/telecommande/telecommande.component.ts");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/fesm2015/animations.js");
    /* harmony import */


    var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/material/toolbar */
    "./node_modules/@angular/material/esm2015/toolbar.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/material/grid-list */
    "./node_modules/@angular/material/esm2015/grid-list.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/esm2015/button.js");
    /* harmony import */


    var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/material/button-toggle */
    "./node_modules/@angular/material/esm2015/button-toggle.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");
    /* harmony import */


    var _slider_volume_slider_volume_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./slider-volume/slider-volume.component */
    "./src/app/slider-volume/slider-volume.component.ts");
    /* harmony import */


    var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! @angular/cdk/scrolling */
    "./node_modules/@angular/cdk/esm2015/scrolling.js");
    /* harmony import */


    var _service_image_service_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./service/image-service.service */
    "./src/app/service/image-service.service.ts");
    /* harmony import */


    var _desktop_popup_image_bureau_popup_image_bureau_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./desktop/popup-image-bureau/popup-image-bureau.component */
    "./src/app/desktop/popup-image-bureau/popup-image-bureau.component.ts");
    /* harmony import */


    var _youtube_unit_youtube_unit_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./youtube-unit/youtube-unit.component */
    "./src/app/youtube-unit/youtube-unit.component.ts");
    /* harmony import */


    var src_environments_window_provider__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! src/environments/window-provider */
    "./src/environments/window-provider.ts");
    /* harmony import */


    var _angular_service_worker__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! @angular/service-worker */
    "./node_modules/@angular/service-worker/fesm2015/service-worker.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! ../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _camera_camera_tile_camera_tile_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./camera/camera-tile/camera-tile.component */
    "./src/app/camera/camera-tile/camera-tile.component.ts");
    /* harmony import */


    var _camera_popup_camera_popup_camera_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! ./camera/popup-camera/popup-camera.component */
    "./src/app/camera/popup-camera/popup-camera.component.ts");
    /* harmony import */


    var _desktop_desktop_tile_desktop_tile_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
    /*! ./desktop/desktop-tile/desktop-tile.component */
    "./src/app/desktop/desktop-tile/desktop-tile.component.ts");
    /* harmony import */


    var _television_television_tile_television_tile_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
    /*! ./television/television-tile/television-tile.component */
    "./src/app/television/television-tile/television-tile.component.ts");
    /* harmony import */


    var _television_popup_remote_tv_popup_alttab_popup_alttab_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
    /*! ./television/popup-remote-tv/popup-alttab/popup-alttab.component */
    "./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.ts");
    /* harmony import */


    var _television_popup_remote_tv_popup_remote_tv_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
    /*! ./television/popup-remote-tv/popup-remote-tv.component */
    "./src/app/television/popup-remote-tv/popup-remote-tv.component.ts");
    /* harmony import */


    var _youtube_youtube_tile_youtube_tile_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
    /*! ./youtube/youtube-tile/youtube-tile.component */
    "./src/app/youtube/youtube-tile/youtube-tile.component.ts");
    /* harmony import */


    var _youtube_popup_youtube_popup_youtube_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
    /*! ./youtube/popup-youtube/popup-youtube.component */
    "./src/app/youtube/popup-youtube/popup-youtube.component.ts");
    /* harmony import */


    var _volume_switch_volume_switch_tile_volume_switch_tile_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
    /*! ./volume-switch/volume-switch-tile/volume-switch-tile.component */
    "./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.ts");
    /* harmony import */


    var _shutdown_shutdown_tile_shutdown_tile_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
    /*! ./shutdown/shutdown-tile/shutdown-tile.component */
    "./src/app/shutdown/shutdown-tile/shutdown-tile.component.ts");
    /* harmony import */


    var _shutdown_popup_shutdown_popup_shutdown_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(
    /*! ./shutdown/popup-shutdown/popup-shutdown.component */
    "./src/app/shutdown/popup-shutdown/popup-shutdown.component.ts");
    /* harmony import */


    var _desktop_desktop_view_desktop_view_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(
    /*! ./desktop/desktop-view/desktop-view.component */
    "./src/app/desktop/desktop-view/desktop-view.component.ts");
    /* harmony import */


    var _camera_camera_view_camera_view_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(
    /*! ./camera/camera-view/camera-view.component */
    "./src/app/camera/camera-view/camera-view.component.ts");
    /* harmony import */


    var _header_header_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(
    /*! ./header/header.component */
    "./src/app/header/header.component.ts");
    /* harmony import */


    var _vocal_tile_vocal_tile_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(
    /*! ./vocal-tile/vocal-tile.component */
    "./src/app/vocal-tile/vocal-tile.component.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"], _telecommande_telecommande_component__WEBPACK_IMPORTED_MODULE_5__["TelecommandeComponent"], _shutdown_popup_shutdown_popup_shutdown_component__WEBPACK_IMPORTED_MODULE_33__["PopupShutdownComponent"], _slider_volume_slider_volume_component__WEBPACK_IMPORTED_MODULE_15__["SliderVolumeComponent"], _desktop_popup_image_bureau_popup_image_bureau_component__WEBPACK_IMPORTED_MODULE_18__["PopupImageBureauComponent"], _youtube_popup_youtube_popup_youtube_component__WEBPACK_IMPORTED_MODULE_30__["PopupYoutubeComponent"], _youtube_unit_youtube_unit_component__WEBPACK_IMPORTED_MODULE_19__["YoutubeUnitComponent"], _television_popup_remote_tv_popup_remote_tv_component__WEBPACK_IMPORTED_MODULE_28__["PopupRemoteTvComponent"], _television_popup_remote_tv_popup_alttab_popup_alttab_component__WEBPACK_IMPORTED_MODULE_27__["PopupAlttabComponent"], _camera_popup_camera_popup_camera_component__WEBPACK_IMPORTED_MODULE_24__["PopupCameraComponent"], _camera_camera_tile_camera_tile_component__WEBPACK_IMPORTED_MODULE_23__["CameraTileComponent"], _desktop_desktop_tile_desktop_tile_component__WEBPACK_IMPORTED_MODULE_25__["DesktopTileComponent"], _television_television_tile_television_tile_component__WEBPACK_IMPORTED_MODULE_26__["TelevisionTileComponent"], _youtube_youtube_tile_youtube_tile_component__WEBPACK_IMPORTED_MODULE_29__["YoutubeTileComponent"], _volume_switch_volume_switch_tile_volume_switch_tile_component__WEBPACK_IMPORTED_MODULE_31__["VolumeSwitchTileComponent"], _shutdown_shutdown_tile_shutdown_tile_component__WEBPACK_IMPORTED_MODULE_32__["ShutdownTileComponent"], _desktop_desktop_view_desktop_view_component__WEBPACK_IMPORTED_MODULE_34__["DesktopViewComponent"], _camera_camera_view_camera_view_component__WEBPACK_IMPORTED_MODULE_35__["CameraViewComponent"], _header_header_component__WEBPACK_IMPORTED_MODULE_36__["HeaderComponent"], _vocal_tile_vocal_tile_component__WEBPACK_IMPORTED_MODULE_37__["VocalTileComponent"]],
      exports: [_youtube_unit_youtube_unit_component__WEBPACK_IMPORTED_MODULE_19__["YoutubeUnitComponent"]],
      imports: [_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatCardModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_9__["MatGridListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialogModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"], _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatListModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"], _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSliderModule"], _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSlideToggleModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_16__["ScrollingModule"], _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSelectModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_21__["ServiceWorkerModule"].register('ngsw-worker.js', {
        enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_22__["environment"].production
      })],
      providers: [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"], _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_14__["PopupToJavaService"], _service_image_service_service__WEBPACK_IMPORTED_MODULE_17__["ImageService"], src_environments_window_provider__WEBPACK_IMPORTED_MODULE_20__["WINDOW_PROVIDERS"]],
      entryComponents: [_shutdown_popup_shutdown_popup_shutdown_component__WEBPACK_IMPORTED_MODULE_33__["PopupShutdownComponent"], _youtube_popup_youtube_popup_youtube_component__WEBPACK_IMPORTED_MODULE_30__["PopupYoutubeComponent"], _television_popup_remote_tv_popup_remote_tv_component__WEBPACK_IMPORTED_MODULE_28__["PopupRemoteTvComponent"], _desktop_popup_image_bureau_popup_image_bureau_component__WEBPACK_IMPORTED_MODULE_18__["PopupImageBureauComponent"], _television_popup_remote_tv_popup_alttab_popup_alttab_component__WEBPACK_IMPORTED_MODULE_27__["PopupAlttabComponent"], _camera_popup_camera_popup_camera_component__WEBPACK_IMPORTED_MODULE_24__["PopupCameraComponent"]],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })], AppModule);
    /***/
  },

  /***/
  "./src/app/camera/camera-tile/camera-tile.component.css":
  /*!**************************************************************!*\
    !*** ./src/app/camera/camera-tile/camera-tile.component.css ***!
    \**************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCameraCameraTileCameraTileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NhbWVyYS9jYW1lcmEtdGlsZS9jYW1lcmEtdGlsZS5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/camera/camera-tile/camera-tile.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/camera/camera-tile/camera-tile.component.ts ***!
    \*************************************************************/

  /*! exports provided: CameraTileComponent */

  /***/
  function srcAppCameraCameraTileCameraTileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CameraTileComponent", function () {
      return CameraTileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var src_app_service_image_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/service/image-service.service */
    "./src/app/service/image-service.service.ts");
    /* harmony import */


    var _popup_camera_popup_camera_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../popup-camera/popup-camera.component */
    "./src/app/camera/popup-camera/popup-camera.component.ts");

    var CameraTileComponent = /*#__PURE__*/function () {
      function CameraTileComponent(dialog, imageService) {
        _classCallCheck(this, CameraTileComponent);

        this.dialog = dialog;
        this.imageService = imageService;
      }

      _createClass(CameraTileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "launchWebcam",
        value: function launchWebcam() {
          var _this = this;

          var dialogRef = this.dialog.open(_popup_camera_popup_camera_component__WEBPACK_IMPORTED_MODULE_4__["PopupCameraComponent"], {
            maxWidth: '90%'
          });
          dialogRef.afterClosed().subscribe(function () {
            _this.imageService.closeWebcamStream().subscribe(function (res) {
              console.log("Caméra fermée : " + res);
            });
          });
        }
      }]);

      return CameraTileComponent;
    }();

    CameraTileComponent.ctorParameters = function () {
      return [{
        type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]
      }, {
        type: src_app_service_image_service_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"]
      }];
    };

    CameraTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-camera-tile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./camera-tile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/camera/camera-tile/camera-tile.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./camera-tile.component.css */
      "./src/app/camera/camera-tile/camera-tile.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], CameraTileComponent);
    /***/
  },

  /***/
  "./src/app/camera/camera-view/camera-view.component.css":
  /*!**************************************************************!*\
    !*** ./src/app/camera/camera-view/camera-view.component.css ***!
    \**************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCameraCameraViewCameraViewComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".sticky-title{\r\n  font-family: Roboto; \r\n  font-weight: 100;\r\n  text-align: center;\r\n  color: white;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  position: fixed;\r\n  height: var(--default-height);\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2FtZXJhL2NhbWVyYS12aWV3L2NhbWVyYS12aWV3LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osT0FBTztFQUNQLFFBQVE7RUFDUixNQUFNO0VBQ04sZUFBZTtFQUNmLDZCQUE2QjtBQUMvQiIsImZpbGUiOiJzcmMvYXBwL2NhbWVyYS9jYW1lcmEtdmlldy9jYW1lcmEtdmlldy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnN0aWNreS10aXRsZXtcclxuICBmb250LWZhbWlseTogUm9ib3RvOyBcclxuICBmb250LXdlaWdodDogMTAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICB0b3A6IDA7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGhlaWdodDogdmFyKC0tZGVmYXVsdC1oZWlnaHQpO1xyXG59Il19 */";
    /***/
  },

  /***/
  "./src/app/camera/camera-view/camera-view.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/camera/camera-view/camera-view.component.ts ***!
    \*************************************************************/

  /*! exports provided: CameraViewComponent */

  /***/
  function srcAppCameraCameraViewCameraViewComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CameraViewComponent", function () {
      return CameraViewComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var CameraViewComponent = function CameraViewComponent() {
      _classCallCheck(this, CameraViewComponent);

      this.remoteView = "remote";
      this.swipeRightIcon = "settings_remote";
    };

    CameraViewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-camera-view',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./camera-view.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/camera/camera-view/camera-view.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./camera-view.component.css */
      "./src/app/camera/camera-view/camera-view.component.css"))["default"]]
    })], CameraViewComponent);
    /***/
  },

  /***/
  "./src/app/camera/popup-camera/popup-camera.component.css":
  /*!****************************************************************!*\
    !*** ./src/app/camera/popup-camera/popup-camera.component.css ***!
    \****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCameraPopupCameraPopupCameraComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".screenshot-webcam{\r\n    width: auto;\r\n    height: auto;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2FtZXJhL3BvcHVwLWNhbWVyYS9wb3B1cC1jYW1lcmEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY2FtZXJhL3BvcHVwLWNhbWVyYS9wb3B1cC1jYW1lcmEuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zY3JlZW5zaG90LXdlYmNhbXtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG59Il19 */";
    /***/
  },

  /***/
  "./src/app/camera/popup-camera/popup-camera.component.ts":
  /*!***************************************************************!*\
    !*** ./src/app/camera/popup-camera/popup-camera.component.ts ***!
    \***************************************************************/

  /*! exports provided: PopupCameraComponent */

  /***/
  function srcAppCameraPopupCameraPopupCameraComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopupCameraComponent", function () {
      return PopupCameraComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../config.service */
    "./src/app/config.service.ts");
    /* harmony import */


    var _service_image_service_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../service/image-service.service */
    "./src/app/service/image-service.service.ts");

    var PopupCameraComponent = /*#__PURE__*/function () {
      function PopupCameraComponent(imageService, configService, domSanitizer) {
        _classCallCheck(this, PopupCameraComponent);

        this.imageService = imageService;
        this.configService = configService;
        this.domSanitizer = domSanitizer;
        this.dialogOpened = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.keyboardInputValue = '';
      }

      _createClass(PopupCameraComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this2 = this;

          this.refreshImage = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 750).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function (_) {
            return _this2.imageService.getImageWebcam();
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.dialogOpened)).subscribe(function (data) {
            _this2.readData(data);

            _this2.isImageLoading = false;
          }, function (error) {
            _this2.isImageLoading = false;
            console.log(error);
          });
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.refreshImage.unsubscribe();
        }
      }, {
        key: "callImageBureauService",
        value: function callImageBureauService() {
          var _this3 = this;

          this.imageService.getImageWebcam().subscribe(function (data) {
            _this3.readData(data);

            _this3.isImageLoading = false;
          }, function (error) {
            _this3.isImageLoading = false;
            console.log(error);
          });
        }
      }, {
        key: "readData",
        value: function readData(data) {
          var _this4 = this;

          var reader = new FileReader();

          reader.onloadend = function (e) {
            _this4.blobData = _this4.domSanitizer.bypassSecurityTrustUrl("".concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].BACKEND_URL, "/imageWebcam"));
          };

          if (data) {
            reader.readAsDataURL(data);
          }
        }
      }]);

      return PopupCameraComponent;
    }();

    PopupCameraComponent.ctorParameters = function () {
      return [{
        type: _service_image_service_service__WEBPACK_IMPORTED_MODULE_7__["ImageService"]
      }, {
        type: _config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]
      }];
    };

    PopupCameraComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-popup-camera',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./popup-camera.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/camera/popup-camera/popup-camera.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./popup-camera.component.css */
      "./src/app/camera/popup-camera/popup-camera.component.css"))["default"]]
    })], PopupCameraComponent);
    /***/
  },

  /***/
  "./src/app/config.service.ts":
  /*!***********************************!*\
    !*** ./src/app/config.service.ts ***!
    \***********************************/

  /*! exports provided: ConfigService */

  /***/
  function srcAppConfigServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConfigService", function () {
      return ConfigService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var ConfigService = function ConfigService() {
      _classCallCheck(this, ConfigService);
    };

    ConfigService.BACKEND_URL = "http://";
    ConfigService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], ConfigService);
    /***/
  },

  /***/
  "./src/app/desktop/desktop-tile/desktop-tile.component.css":
  /*!*****************************************************************!*\
    !*** ./src/app/desktop/desktop-tile/desktop-tile.component.css ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDesktopDesktopTileDesktopTileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rlc2t0b3AvZGVza3RvcC10aWxlL2Rlc2t0b3AtdGlsZS5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/desktop/desktop-tile/desktop-tile.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/desktop/desktop-tile/desktop-tile.component.ts ***!
    \****************************************************************/

  /*! exports provided: DesktopTileComponent */

  /***/
  function srcAppDesktopDesktopTileDesktopTileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DesktopTileComponent", function () {
      return DesktopTileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _popup_image_bureau_popup_image_bureau_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../popup-image-bureau/popup-image-bureau.component */
    "./src/app/desktop/popup-image-bureau/popup-image-bureau.component.ts");

    var DesktopTileComponent = /*#__PURE__*/function () {
      function DesktopTileComponent(dialog) {
        _classCallCheck(this, DesktopTileComponent);

        this.dialog = dialog;
      }

      _createClass(DesktopTileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "launchDesktop",
        value: function launchDesktop() {
          var dialogRef = this.dialog.open(_popup_image_bureau_popup_image_bureau_component__WEBPACK_IMPORTED_MODULE_3__["PopupImageBureauComponent"], {
            maxWidth: '90%'
          });
        }
      }]);

      return DesktopTileComponent;
    }();

    DesktopTileComponent.ctorParameters = function () {
      return [{
        type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]
      }];
    };

    DesktopTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-desktop-tile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./desktop-tile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/desktop-tile/desktop-tile.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./desktop-tile.component.css */
      "./src/app/desktop/desktop-tile/desktop-tile.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], DesktopTileComponent);
    /***/
  },

  /***/
  "./src/app/desktop/desktop-view/desktop-view.component.css":
  /*!*****************************************************************!*\
    !*** ./src/app/desktop/desktop-view/desktop-view.component.css ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDesktopDesktopViewDesktopViewComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".sticky-title{\r\n  font-family: Roboto; \r\n  font-weight: 100;\r\n  text-align: center;\r\n  color: white;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  position: fixed;\r\n  height: var(--default-height);\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVza3RvcC9kZXNrdG9wLXZpZXcvZGVza3RvcC12aWV3LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osT0FBTztFQUNQLFFBQVE7RUFDUixNQUFNO0VBQ04sZUFBZTtFQUNmLDZCQUE2QjtBQUMvQiIsImZpbGUiOiJzcmMvYXBwL2Rlc2t0b3AvZGVza3RvcC12aWV3L2Rlc2t0b3Atdmlldy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnN0aWNreS10aXRsZXtcclxuICBmb250LWZhbWlseTogUm9ib3RvOyBcclxuICBmb250LXdlaWdodDogMTAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICB0b3A6IDA7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGhlaWdodDogdmFyKC0tZGVmYXVsdC1oZWlnaHQpO1xyXG59Il19 */";
    /***/
  },

  /***/
  "./src/app/desktop/desktop-view/desktop-view.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/desktop/desktop-view/desktop-view.component.ts ***!
    \****************************************************************/

  /*! exports provided: DesktopViewComponent */

  /***/
  function srcAppDesktopDesktopViewDesktopViewComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DesktopViewComponent", function () {
      return DesktopViewComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var DesktopViewComponent = function DesktopViewComponent(router) {
      _classCallCheck(this, DesktopViewComponent);

      this.router = router;
      this.remoteView = 'remote';
      this.swipeRightIcon = "settings_remote";
    };

    DesktopViewComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    DesktopViewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-desktop-view',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./desktop-view.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/desktop-view/desktop-view.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./desktop-view.component.css */
      "./src/app/desktop/desktop-view/desktop-view.component.css"))["default"]]
    })], DesktopViewComponent);
    /***/
  },

  /***/
  "./src/app/desktop/popup-image-bureau/popup-image-bureau.component.css":
  /*!*****************************************************************************!*\
    !*** ./src/app/desktop/popup-image-bureau/popup-image-bureau.component.css ***!
    \*****************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDesktopPopupImageBureauPopupImageBureauComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".screenshot-bureau {\r\n    width: auto;\r\n    height: auto;\r\n}\r\n\r\n.displaySelector h1 { \r\n    font-size: 5em \r\n}\r\n\r\n.menu-bar {\r\n  bottom: 0;\r\n  position: fixed;\r\n}\r\n\r\n.menu-input {\r\n  position: fixed;\r\n  margin: 1em 1em 1em 1em;\r\n}\r\n\r\n.keyboard-input {\r\n  width: 80%;\r\n  position: fixed;\r\n  margin-left: 4em;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGVza3RvcC9wb3B1cC1pbWFnZS1idXJlYXUvcG9wdXAtaW1hZ2UtYnVyZWF1LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7RUFDZix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2Rlc2t0b3AvcG9wdXAtaW1hZ2UtYnVyZWF1L3BvcHVwLWltYWdlLWJ1cmVhdS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNjcmVlbnNob3QtYnVyZWF1IHtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4uZGlzcGxheVNlbGVjdG9yIGgxIHsgXHJcbiAgICBmb250LXNpemU6IDVlbSBcclxufVxyXG4gIFxyXG4ubWVudS1iYXIge1xyXG4gIGJvdHRvbTogMDtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbn1cclxuXHJcbi5tZW51LWlucHV0IHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgbWFyZ2luOiAxZW0gMWVtIDFlbSAxZW07XHJcbn1cclxuXHJcbi5rZXlib2FyZC1pbnB1dCB7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDRlbTtcclxufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/desktop/popup-image-bureau/popup-image-bureau.component.ts":
  /*!****************************************************************************!*\
    !*** ./src/app/desktop/popup-image-bureau/popup-image-bureau.component.ts ***!
    \****************************************************************************/

  /*! exports provided: PopupImageBureauComponent */

  /***/
  function srcAppDesktopPopupImageBureauPopupImageBureauComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopupImageBureauComponent", function () {
      return PopupImageBureauComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_image_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../service/image-service.service */
    "./src/app/service/image-service.service.ts");
    /* harmony import */


    var _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");

    var PopupImageBureauComponent = /*#__PURE__*/function () {
      function PopupImageBureauComponent(imageService, javaService) {
        _classCallCheck(this, PopupImageBureauComponent);

        this.imageService = imageService;
        this.javaService = javaService;
        this.displayKeyboard = false;
        this.keyboardInputValue = '';
        this.myCaptureDevice = 'imageBureau';
      }

      _createClass(PopupImageBureauComponent, [{
        key: "keyboardKeyPressed",
        value: function keyboardKeyPressed(event) {
          console.log('-->up ', event);

          if (event.isTrusted) {
            this.javaService.typeKeyboardKey(event.key).subscribe(function (res) {});
          }
        }
      }, {
        key: "toggleKeyboard",
        value: function toggleKeyboard() {
          this.displayKeyboard = !this.displayKeyboard;
        }
      }, {
        key: "getDesktopBlobUrl",
        value: function getDesktopBlobUrl() {
          return this.imageService.getDesktopBlobUrl();
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          this.imageService.startCapture(this.myCaptureDevice);
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.imageService.stopCapture(this.myCaptureDevice);
        }
      }, {
        key: "getClickPosition",
        value: function getClickPosition(e) {
          var xPosition = e.offsetX;
          var yPosition = e.offsetY;
          console.log("(", xPosition, " ; ", yPosition, ")", e);
          this.javaService.sendLeftClick(xPosition, yPosition).subscribe(function (res) {});
        }
      }]);

      return PopupImageBureauComponent;
    }();

    PopupImageBureauComponent.ctorParameters = function () {
      return [{
        type: _service_image_service_service__WEBPACK_IMPORTED_MODULE_2__["ImageService"]
      }, {
        type: _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_3__["PopupToJavaService"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:keyup', ['$event'])], PopupImageBureauComponent.prototype, "keyboardKeyPressed", null);
    PopupImageBureauComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-popup-image-bureau',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./popup-image-bureau.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/desktop/popup-image-bureau/popup-image-bureau.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./popup-image-bureau.component.css */
      "./src/app/desktop/popup-image-bureau/popup-image-bureau.component.css"))["default"]]
    })], PopupImageBureauComponent);
    /***/
  },

  /***/
  "./src/app/header/header.component.css":
  /*!*********************************************!*\
    !*** ./src/app/header/header.component.css ***!
    \*********************************************/

  /*! exports provided: default */

  /***/
  function srcAppHeaderHeaderComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".titre-telecommande{\r\n    font-family: Roboto; \r\n    font-weight: 100;\r\n    text-align: center;\r\n    color: white;  \r\n  }\r\n\r\n  .animate__slideOutRight{\r\n    --animate-duration: 500ms;\r\n  }\r\n\r\n  .animate__slideOutLeft{\r\n    --animate-duration: 500ms;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsWUFBWTtFQUNkOztFQUVBO0lBQ0UseUJBQXlCO0VBQzNCOztFQUNBO0lBQ0UseUJBQXlCO0VBQzNCIiwiZmlsZSI6InNyYy9hcHAvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpdHJlLXRlbGVjb21tYW5kZXtcclxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87IFxyXG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiB3aGl0ZTsgIFxyXG4gIH1cclxuXHJcbiAgLmFuaW1hdGVfX3NsaWRlT3V0UmlnaHR7XHJcbiAgICAtLWFuaW1hdGUtZHVyYXRpb246IDUwMG1zO1xyXG4gIH1cclxuICAuYW5pbWF0ZV9fc2xpZGVPdXRMZWZ0e1xyXG4gICAgLS1hbmltYXRlLWR1cmF0aW9uOiA1MDBtcztcclxuICB9Il19 */";
    /***/
  },

  /***/
  "./src/app/header/header.component.ts":
  /*!********************************************!*\
    !*** ./src/app/header/header.component.ts ***!
    \********************************************/

  /*! exports provided: HeaderComponent, animateCSS */

  /***/
  function srcAppHeaderHeaderComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HeaderComponent", function () {
      return HeaderComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "animateCSS", function () {
      return animateCSS;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var HeaderComponent = /*#__PURE__*/function () {
      function HeaderComponent(router) {
        _classCallCheck(this, HeaderComponent);

        this.router = router;
        this.symbolMap = new Map();
      }

      _createClass(HeaderComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.symbolMap.set(this.swipeLeft, this.swipeLeftIcon);
          this.symbolMap.set(this.swipeRight, this.swipeRightIcon);
          console.log("left: ", this.swipeLeft, ":", this.swipeLeftIcon, " - right: ", this.swipeRight, ":", this.swipeLeftIcon);
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.symbolMap.clear();
        }
      }, {
        key: "onSwipeLeft",
        value: function onSwipeLeft() {
          var _this5 = this;

          animateCSS('#title', this.swipeLeft ? 'slideOutLeft' : 'headShake');
          setTimeout(function () {
            if (_this5.swipeLeft) {
              _this5.router.navigateByUrl('/' + _this5.swipeLeft);
            }
          }, 400);
        }
      }, {
        key: "onSwipeRight",
        value: function onSwipeRight() {
          var _this6 = this;

          animateCSS('#title', this.swipeRight ? 'slideOutRight' : 'headShake');
          setTimeout(function () {
            if (_this6.swipeRight) {
              _this6.router.navigateByUrl('/' + _this6.swipeRight);
            }
          }, 400);
        }
      }, {
        key: "headshake",
        value: function headshake() {
          animateCSS('#title', 'headShake');
        }
      }]);

      return HeaderComponent;
    }();

    HeaderComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], HeaderComponent.prototype, "swipeLeft", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], HeaderComponent.prototype, "swipeLeftIcon", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], HeaderComponent.prototype, "swipeRight", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], HeaderComponent.prototype, "swipeRightIcon", void 0);
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-header',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./header.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/header/header.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./header.component.css */
      "./src/app/header/header.component.css"))["default"]]
    })], HeaderComponent);

    var animateCSS = function animateCSS(element, animation) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'animate__';
      return (// We create a Promise and return it
        new Promise(function (resolve, reject) {
          var animationName = "".concat(prefix).concat(animation);
          var node = document.querySelector(element);
          node.classList.add("".concat(prefix, "animated"), animationName); // When the animation ends, we clean the classes and resolve the Promise

          function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove("".concat(prefix, "animated"), animationName);
            resolve('Animation ended');
          }

          node.addEventListener('animationend', handleAnimationEnd, {
            once: true
          });
        })
      );
    };
    /***/

  },

  /***/
  "./src/app/service/image-service.service.ts":
  /*!**************************************************!*\
    !*** ./src/app/service/image-service.service.ts ***!
    \**************************************************/

  /*! exports provided: ImageService */

  /***/
  function srcAppServiceImageServiceServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ImageService", function () {
      return ImageService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../config.service */
    "./src/app/config.service.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");

    var ImageService = /*#__PURE__*/function () {
      function ImageService(http, domSanitizer, configService) {
        _classCallCheck(this, ImageService);

        this.http = http;
        this.domSanitizer = domSanitizer;
        this.configService = configService;
      }

      _createClass(ImageService, [{
        key: "getImageBureau",
        value: function getImageBureau() {
          return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].BACKEND_URL + '/imageBureau', {
            responseType: 'blob'
          });
        }
      }, {
        key: "getImageWebcam",
        value: function getImageWebcam() {
          return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].BACKEND_URL + '/imageWebcam', {
            responseType: 'blob'
          });
        }
      }, {
        key: "closeWebcamStream",
        value: function closeWebcamStream() {
          console.log(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].BACKEND_URL + '/closeWebcam');
          return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].BACKEND_URL + '/closeWebcam');
        }
      }, {
        key: "startCapture",
        value: function startCapture(whichCapture) {
          switch (whichCapture) {
            case 'imageBureau':
              this.startDesktopCapture();
              break;

            case 'imageWebcam':
              break;

            default:
              break;
          }
        }
      }, {
        key: "stopCapture",
        value: function stopCapture(whichCapture) {
          switch (whichCapture) {
            case 'imageBureau':
              this.desktopObservableTimer.unsubscribe();
              break;

            case 'imageWebcam':
              break;

            default:
              break;
          }
        }
      }, {
        key: "startDesktopCapture",
        value: function startDesktopCapture() {
          var _this7 = this;

          this.desktopObservableTimer = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, 750).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["mergeMap"])(function (_) {
            return _this7.getImageBureau();
          })).subscribe(function (data) {
            _this7.readDesktopImageFromBackend(data);
          });
        }
      }, {
        key: "readDesktopImageFromBackend",
        value: function readDesktopImageFromBackend(data) {
          var _this8 = this;

          var reader = new FileReader();

          reader.onloadend = function () {
            _this8.setDesktopBlobUrl(_this8.domSanitizer.bypassSecurityTrustUrl("".concat(src_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].BACKEND_URL, "/imageBureau")));
          };

          if (data) {
            reader.readAsDataURL(data);
          }
        }
      }, {
        key: "setDesktopBlobUrl",
        value: function setDesktopBlobUrl(blob) {
          this.desktopBlobUrl = blob;
        }
      }, {
        key: "getDesktopBlobUrl",
        value: function getDesktopBlobUrl() {
          return this.desktopBlobUrl;
        }
      }]);

      return ImageService;
    }();

    ImageService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"]
      }, {
        type: _config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"]
      }];
    };

    ImageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], ImageService);
    /***/
  },

  /***/
  "./src/app/service/popup-to-java.service.ts":
  /*!**************************************************!*\
    !*** ./src/app/service/popup-to-java.service.ts ***!
    \**************************************************/

  /*! exports provided: PopupToJavaService */

  /***/
  function srcAppServicePopupToJavaServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopupToJavaService", function () {
      return PopupToJavaService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../config.service */
    "./src/app/config.service.ts");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");

    var PopupToJavaService = /*#__PURE__*/function () {
      function PopupToJavaService(http, configService) {
        _classCallCheck(this, PopupToJavaService);

        this.http = http;
        this.configService = configService;
        this.shutdownUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/shutdown';
        this.shutdownCancelUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/shutdown/cancel';
        this.volumeUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/volume';
        this.isMutedUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/muted';
        this.muteUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/muteVolume';
        this.switchSoundDeviceUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/switchSoundDevice';
        this.tvUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/tv';
        this.youtubeVideo = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/youtube';
        this.netflixTab = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/netflix';
        this.switchPause = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/switchPause';
        this.fullScreen = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/fullscreen';
        this.closeTab = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/closeCurrentChromeTab';
        this.currentMedia = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/currentMedia';
        this.switchMonitor = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/switchMonitor';
        this.leftClick = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/leftclick';
        this.pressKeyboardKey = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/pressKeyboardKey';
        this.vocalCommandUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].BACKEND_URL + '/vocalCommand';
      }

      _createClass(PopupToJavaService, [{
        key: "manageShutdown",
        value: function manageShutdown(time, isShutdown) {
          var command = {
            isShutdown: isShutdown,
            time: time
          };
          return this.http.post(this.shutdownUrl, command);
        }
      }, {
        key: "cancelShutdown",
        value: function cancelShutdown() {
          return this.http.get(this.shutdownCancelUrl);
        }
      }, {
        key: "getShutdownCount",
        value: function getShutdownCount() {
          return this.http.get(this.shutdownUrl);
        }
      }, {
        key: "getCurrentVolume",
        value: function getCurrentVolume() {
          return this.http.get(this.volumeUrl);
        }
      }, {
        key: "postVolume",
        value: function postVolume(cmd) {
          return this.http.post(this.volumeUrl, cmd);
        }
      }, {
        key: "getSwitchSoundDevice",
        value: function getSwitchSoundDevice() {
          return this.http.get(this.switchSoundDeviceUrl);
        }
      }, {
        key: "postMute",
        value: function postMute(muteOrUnmute) {
          return this.http.post(this.muteUrl, muteOrUnmute);
        }
      }, {
        key: "getMute",
        value: function getMute() {
          return this.http.get(this.isMutedUrl);
        }
      }, {
        key: "getYoutubeVideo",
        value: function getYoutubeVideo(idVideo) {
          return this.http.get(this.youtubeVideo + "?idVideo=" + idVideo).subscribe(function (res) {
            console.log("Youtube: ", res);
          }, function (error) {
            console.error("Erreur youtube !", error);
          });
        } // TODO : En faire une méthode POST

      }, {
        key: "getTvChannel",
        value: function getTvChannel(chaineTv) {
          var channelRequested = this.tvUrl.valueOf();
          channelRequested = channelRequested.concat("?chaine=" + chaineTv);
          return this.http.get(channelRequested).subscribe(function () {
            return console.log("Chaine mise : " + chaineTv);
          }, function (err) {
            return console.error("erreur chaine tv");
          });
        }
      }, {
        key: "openNetflixTab",
        value: function openNetflixTab() {
          return this.http.get(this.netflixTab);
        }
      }, {
        key: "getCurrentMedia",
        value: function getCurrentMedia() {
          return this.http.get(this.currentMedia, {
            responseType: 'text'
          });
        }
      }, {
        key: "getSwitchPause",
        value: function getSwitchPause() {
          return this.http.get(this.switchPause);
        }
      }, {
        key: "postFullScreen",
        value: function postFullScreen() {
          return this.http.post(this.fullScreen, [{
            "fullscreen": "on"
          }]);
        }
      }, {
        key: "getCloseTab",
        value: function getCloseTab() {
          return this.http.get(this.closeTab);
        }
      }, {
        key: "getSwitchMonitor",
        value: function getSwitchMonitor() {
          return this.http.get(this.switchMonitor);
        }
      }, {
        key: "sendLeftClick",
        value: function sendLeftClick(xPosition, yPosition) {
          var params = {
            "xPosition": xPosition,
            "yPosition": yPosition
          };
          return this.http.post(this.leftClick, params);
        }
      }, {
        key: "typeKeyboardKey",
        value: function typeKeyboardKey(key) {
          return this.http.post(this.pressKeyboardKey, key);
        }
      }, {
        key: "sendVocalCommand",
        value: function sendVocalCommand(cmd) {
          return this.http.post(this.vocalCommandUrl, cmd);
        }
      }]);

      return PopupToJavaService;
    }();

    PopupToJavaService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _config_service__WEBPACK_IMPORTED_MODULE_3__["ConfigService"]
      }];
    };

    PopupToJavaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], PopupToJavaService);
    /***/
  },

  /***/
  "./src/app/service/state.service.ts":
  /*!******************************************!*\
    !*** ./src/app/service/state.service.ts ***!
    \******************************************/

  /*! exports provided: StateService */

  /***/
  function srcAppServiceStateServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StateService", function () {
      return StateService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");

    var StateService = /*#__PURE__*/function () {
      function StateService(javaService) {
        _classCallCheck(this, StateService);

        this.javaService = javaService;
        this.fetchShutdownState();
      }

      _createClass(StateService, [{
        key: "fetchShutdownState",
        value: function fetchShutdownState() {
          var _this9 = this;

          this.javaService.getShutdownCount().subscribe(function (res) {
            if (res) {
              _this9.shutdown_active = true;
              _this9.secondsLeftBeforeShutdown = res;
              _this9.shutdownTimer = setInterval(function () {
                if (!_this9.shutdown_active) {
                  clearTimeout(_this9.shutdownTimer);
                }

                _this9.secondsLeftBeforeShutdown = _this9.secondsLeftBeforeShutdown - 1;

                _this9.setHourBeforeShutdown(Math.floor(_this9.secondsLeftBeforeShutdown / 3600));

                _this9.setMinuteBeforeShutdown(Math.floor(_this9.secondsLeftBeforeShutdown % 3600 / 60));

                _this9.setSecondBeforeShutdown(Math.floor(_this9.secondsLeftBeforeShutdown % 3600 % 60));
              }, 1000);
            }
          });
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          clearTimeout(this.shutdownTimer);
        }
      }, {
        key: "getShutdownActive",
        value: function getShutdownActive() {
          return this.shutdown_active;
        }
      }, {
        key: "setShutdownActive",
        value: function setShutdownActive(active) {
          this.shutdown_active = active;
        }
      }, {
        key: "getHourBeforeShutdown",
        value: function getHourBeforeShutdown() {
          return this.shutdownHourLeft;
        }
      }, {
        key: "getMinuteBeforeShutdown",
        value: function getMinuteBeforeShutdown() {
          return this.shutdownMinuteLeft;
        }
      }, {
        key: "getSecondBeforeShutdown",
        value: function getSecondBeforeShutdown() {
          return this.shutdownSecondLeft;
        }
      }, {
        key: "setHourBeforeShutdown",
        value: function setHourBeforeShutdown(hour) {
          this.shutdownHourLeft = hour;
        }
      }, {
        key: "setMinuteBeforeShutdown",
        value: function setMinuteBeforeShutdown(minute) {
          this.shutdownMinuteLeft = minute;
        }
      }, {
        key: "setSecondBeforeShutdown",
        value: function setSecondBeforeShutdown(second) {
          this.shutdownSecondLeft = second;
        }
      }]);

      return StateService;
    }();

    StateService.ctorParameters = function () {
      return [{
        type: _popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__["PopupToJavaService"]
      }];
    };

    StateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], StateService);
    /***/
  },

  /***/
  "./src/app/shutdown/popup-shutdown/popup-shutdown.component.css":
  /*!**********************************************************************!*\
    !*** ./src/app/shutdown/popup-shutdown/popup-shutdown.component.css ***!
    \**********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppShutdownPopupShutdownPopupShutdownComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".menu {\r\n    height: 200px;\r\n    width: 200px;\r\n    border: 5px solid lightgrey;\r\n  }\r\n  \r\n  .example-item {\r\n    height: 50px;\r\n  }\r\n  \r\n  .shutdown-text{\r\n    text-align: center;\r\n  }\r\n  \r\n  .shutdown-action {\r\n    font-size: 10vw;\r\n    width: 25vw;\r\n    height: 25vw;\r\n  }\r\n  \r\n  .pressed {\r\n    background-color: lightslategray;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2h1dGRvd24vcG9wdXAtc2h1dGRvd24vcG9wdXAtc2h1dGRvd24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osMkJBQTJCO0VBQzdCOztFQUVBO0lBQ0UsWUFBWTtFQUNkOztFQUVBO0lBQ0Usa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLFdBQVc7SUFDWCxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxnQ0FBZ0M7RUFDbEMiLCJmaWxlIjoic3JjL2FwcC9zaHV0ZG93bi9wb3B1cC1zaHV0ZG93bi9wb3B1cC1zaHV0ZG93bi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1lbnUge1xyXG4gICAgaGVpZ2h0OiAyMDBweDtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGJvcmRlcjogNXB4IHNvbGlkIGxpZ2h0Z3JleTtcclxuICB9XHJcbiAgXHJcbiAgLmV4YW1wbGUtaXRlbSB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5zaHV0ZG93bi10ZXh0e1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLnNodXRkb3duLWFjdGlvbiB7XHJcbiAgICBmb250LXNpemU6IDEwdnc7XHJcbiAgICB3aWR0aDogMjV2dztcclxuICAgIGhlaWdodDogMjV2dztcclxuICB9XHJcbiAgXHJcbiAgLnByZXNzZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRzbGF0ZWdyYXk7XHJcbiAgfSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/shutdown/popup-shutdown/popup-shutdown.component.ts":
  /*!*********************************************************************!*\
    !*** ./src/app/shutdown/popup-shutdown/popup-shutdown.component.ts ***!
    \*********************************************************************/

  /*! exports provided: PopupShutdownComponent */

  /***/
  function srcAppShutdownPopupShutdownPopupShutdownComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopupShutdownComponent", function () {
      return PopupShutdownComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var src_app_service_state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/service/state.service */
    "./src/app/service/state.service.ts");

    var PopupShutdownComponent = /*#__PURE__*/function () {
      function PopupShutdownComponent(javaService, stateService, dialogRef, data) {
        _classCallCheck(this, PopupShutdownComponent);

        this.javaService = javaService;
        this.stateService = stateService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.isShutdown = true;

        if (data.shutdownCountdown != undefined) {
          this.shutdownTimeRequested = data.shutdownCountdown;
        }

        this.heures = this.generateQuartDheure();
      }

      _createClass(PopupShutdownComponent, [{
        key: "onSubmitShutdown",
        value: function onSubmitShutdown() {
          var _this10 = this;

          this.javaService.manageShutdown(this.convertHeureToSeconde(), this.isShutdown).subscribe(function (result) {
            _this10.shutdownTimeRequested = result;

            _this10.stateService.setShutdownActive(true);

            _this10.stateService.fetchShutdownState();
          });
          this.shutdownTimeRequested = this.convertHeureToSeconde();
          this.heureSelected = null;
        }
      }, {
        key: "onSubmitCancel",
        value: function onSubmitCancel() {
          var _this11 = this;

          this.javaService.cancelShutdown().subscribe(function (result) {
            _this11.stateService.setShutdownActive(false);
          });
          this.shutdownTimeRequested = null;
        }
      }, {
        key: "selectionnerHeure",
        value: function selectionnerHeure(choix) {
          this.heureSelected = choix;
        }
      }, {
        key: "generateQuartDheure",
        value: function generateQuartDheure() {
          var quartHeure = Array();

          for (var h = 0; h < 24; h++) {
            var heures = h;

            for (var m = 0; m < 4; m++) {
              var minutes = m == 0 ? '00' : m * 15;
              quartHeure.push(heures + ':' + minutes);
            }
          }

          return quartHeure;
        }
      }, {
        key: "convertHeureToSeconde",
        value: function convertHeureToSeconde() {
          if (this.heureSelected == undefined) {
            return;
          }

          var heureMinutes = this.heureSelected.split(":");
          var nbSecondes = Number(heureMinutes[0]) * 3600 + Number(heureMinutes[1]) * 60;
          this.shutdownTimeRequested = nbSecondes;
          return nbSecondes;
        }
      }, {
        key: "displayCountdown",
        value: function displayCountdown() {
          this.javaService.getShutdownCount().subscribe(function (res) {
            console.log(res);
          });
        }
      }, {
        key: "shutdownAction",
        value: function shutdownAction(isShutdownAction) {
          this.isShutdown = isShutdownAction;
        }
      }]);

      return PopupShutdownComponent;
    }();

    PopupShutdownComponent.ctorParameters = function () {
      return [{
        type: _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__["PopupToJavaService"]
      }, {
        type: src_app_service_state_service__WEBPACK_IMPORTED_MODULE_4__["StateService"]
      }, {
        type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]
      }, {
        type: undefined,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
          args: [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]]
        }]
      }];
    };

    PopupShutdownComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-popup-shutdown',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./popup-shutdown.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shutdown/popup-shutdown/popup-shutdown.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./popup-shutdown.component.css */
      "./src/app/shutdown/popup-shutdown/popup-shutdown.component.css"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"]))], PopupShutdownComponent);
    /***/
  },

  /***/
  "./src/app/shutdown/shutdown-tile/shutdown-tile.component.css":
  /*!********************************************************************!*\
    !*** ./src/app/shutdown/shutdown-tile/shutdown-tile.component.css ***!
    \********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppShutdownShutdownTileShutdownTileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NodXRkb3duL3NodXRkb3duLXRpbGUvc2h1dGRvd24tdGlsZS5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/shutdown/shutdown-tile/shutdown-tile.component.ts":
  /*!*******************************************************************!*\
    !*** ./src/app/shutdown/shutdown-tile/shutdown-tile.component.ts ***!
    \*******************************************************************/

  /*! exports provided: ShutdownTileComponent */

  /***/
  function srcAppShutdownShutdownTileShutdownTileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ShutdownTileComponent", function () {
      return ShutdownTileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var src_app_service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");
    /* harmony import */


    var src_app_service_state_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/service/state.service */
    "./src/app/service/state.service.ts");
    /* harmony import */


    var _popup_shutdown_popup_shutdown_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../popup-shutdown/popup-shutdown.component */
    "./src/app/shutdown/popup-shutdown/popup-shutdown.component.ts");

    var ShutdownTileComponent = /*#__PURE__*/function () {
      function ShutdownTileComponent(dialog, stateService, javaService) {
        _classCallCheck(this, ShutdownTileComponent);

        this.dialog = dialog;
        this.stateService = stateService;
        this.javaService = javaService;
      }

      _createClass(ShutdownTileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "openShutdown",
        value: function openShutdown() {
          var dialogRef = this.dialog.open(_popup_shutdown_popup_shutdown_component__WEBPACK_IMPORTED_MODULE_5__["PopupShutdownComponent"], {
            width: '250px',
            data: {
              radical: "shutdown",
              shutdownCountdown: this.chosenShutdownCountdown
            }
          });
        }
      }]);

      return ShutdownTileComponent;
    }();

    ShutdownTileComponent.ctorParameters = function () {
      return [{
        type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]
      }, {
        type: src_app_service_state_service__WEBPACK_IMPORTED_MODULE_4__["StateService"]
      }, {
        type: src_app_service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_3__["PopupToJavaService"]
      }];
    };

    ShutdownTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-shutdown-tile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./shutdown-tile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shutdown/shutdown-tile/shutdown-tile.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./shutdown-tile.component.css */
      "./src/app/shutdown/shutdown-tile/shutdown-tile.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], ShutdownTileComponent);
    /***/
  },

  /***/
  "./src/app/slider-volume/slider-volume.component.css":
  /*!***********************************************************!*\
    !*** ./src/app/slider-volume/slider-volume.component.css ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppSliderVolumeSliderVolumeComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NsaWRlci12b2x1bWUvc2xpZGVyLXZvbHVtZS5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/slider-volume/slider-volume.component.ts":
  /*!**********************************************************!*\
    !*** ./src/app/slider-volume/slider-volume.component.ts ***!
    \**********************************************************/

  /*! exports provided: SliderVolumeComponent */

  /***/
  function srcAppSliderVolumeSliderVolumeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SliderVolumeComponent", function () {
      return SliderVolumeComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");

    var SliderVolumeComponent = /*#__PURE__*/function () {
      function SliderVolumeComponent(javaService) {
        _classCallCheck(this, SliderVolumeComponent);

        this.javaService = javaService;
        this.autoTicks = false;
        this.disabled = false;
        this.invert = false;
        this.max = 100;
        this.min = 0;
        this.step = 1;
        this.thumbLabel = false;
        this.currentVolume = 50;
        this.vertical = false;
      }

      _createClass(SliderVolumeComponent, [{
        key: "getCurrentVolume",
        value: function getCurrentVolume() {
          this.javaService.getCurrentVolume();
        }
      }, {
        key: "onChangeVolume",
        value: function onChangeVolume(event) {
          var _this12 = this;

          console.log(event.value.toString());
          this.javaService.postVolume(event.value.toString()).subscribe(function (result) {
            return _this12.currentVolume = event.value;
          });
        }
      }]);

      return SliderVolumeComponent;
    }();

    SliderVolumeComponent.ctorParameters = function () {
      return [{
        type: _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__["PopupToJavaService"]
      }];
    };

    SliderVolumeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-slider-volume',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./slider-volume.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/slider-volume/slider-volume.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./slider-volume.component.css */
      "./src/app/slider-volume/slider-volume.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], SliderVolumeComponent);
    /***/
  },

  /***/
  "./src/app/telecommande/telecommande.component.css":
  /*!*********************************************************!*\
    !*** ./src/app/telecommande/telecommande.component.css ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppTelecommandeTelecommandeComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".remote-container {\r\n  flex-wrap: wrap;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  user-zoom: none;\r\n}\r\n\r\n.tuile_1x1{\r\n  border-radius: 17px 17px 17px 17px;\r\n  margin: 0.5px;\r\n  height: 33vw;\r\n  width: 33vw;\r\n  max-height: 100px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.tuile_2x1{\r\n  border-radius: 17px 17px 17px 17px;\r\n  height: 33vw;\r\n  width: 66vw;\r\n  max-height: 100px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.tuile_3x1{\r\n  border-radius: 17px 17px 17px 17px;\r\n  height: 33vw;\r\n  width: 100vw;\r\n  max-height: 100px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.material-icons{\r\n  opacity: 95%;\r\n}\r\n\r\n.disabled-tile {\r\n  opacity: 50%;\r\n  background-color:powderblue;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVsZWNvbW1hbmRlL3RlbGVjb21tYW5kZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtFQUNmLHlCQUFpQjtLQUFqQixzQkFBaUI7TUFBakIscUJBQWlCO1VBQWpCLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLGFBQWE7RUFDYixZQUFZO0VBQ1osV0FBVztFQUNYLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxZQUFZO0VBQ1osV0FBVztFQUNYLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxZQUFZO0VBQ1osWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7RUFDWiwyQkFBMkI7QUFDN0IiLCJmaWxlIjoic3JjL2FwcC90ZWxlY29tbWFuZGUvdGVsZWNvbW1hbmRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVtb3RlLWNvbnRhaW5lciB7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIHVzZXItem9vbTogbm9uZTtcclxufVxyXG5cclxuLnR1aWxlXzF4MXtcclxuICBib3JkZXItcmFkaXVzOiAxN3B4IDE3cHggMTdweCAxN3B4O1xyXG4gIG1hcmdpbjogMC41cHg7XHJcbiAgaGVpZ2h0OiAzM3Z3O1xyXG4gIHdpZHRoOiAzM3Z3O1xyXG4gIG1heC1oZWlnaHQ6IDEwMHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi50dWlsZV8yeDF7XHJcbiAgYm9yZGVyLXJhZGl1czogMTdweCAxN3B4IDE3cHggMTdweDtcclxuICBoZWlnaHQ6IDMzdnc7XHJcbiAgd2lkdGg6IDY2dnc7XHJcbiAgbWF4LWhlaWdodDogMTAwcHg7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLnR1aWxlXzN4MXtcclxuICBib3JkZXItcmFkaXVzOiAxN3B4IDE3cHggMTdweCAxN3B4O1xyXG4gIGhlaWdodDogMzN2dztcclxuICB3aWR0aDogMTAwdnc7XHJcbiAgbWF4LWhlaWdodDogMTAwcHg7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLm1hdGVyaWFsLWljb25ze1xyXG4gIG9wYWNpdHk6IDk1JTtcclxufVxyXG5cclxuLmRpc2FibGVkLXRpbGUge1xyXG4gIG9wYWNpdHk6IDUwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOnBvd2RlcmJsdWU7XHJcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/telecommande/telecommande.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/telecommande/telecommande.component.ts ***!
    \********************************************************/

  /*! exports provided: TelecommandeComponent */

  /***/
  function srcAppTelecommandeTelecommandeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TelecommandeComponent", function () {
      return TelecommandeComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/environments/environment */
    "./src/environments/environment.ts");

    var TelecommandeComponent = function TelecommandeComponent() {
      _classCallCheck(this, TelecommandeComponent);

      this.desktopView = "desktop-view";
      this.swipeLeftIcon = "desktop_windows";
      this.cameraView = "camera-view";
      this.swipeRightIcon = "camera_alt";
      this.videoSurveillanceMode = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].videoSurveillance;
    };

    TelecommandeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-telecommande',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./telecommande.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/telecommande/telecommande.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], TelecommandeComponent);
    /***/
  },

  /***/
  "./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.css":
  /*!************************************************************************************!*\
    !*** ./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.css ***!
    \************************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppTelevisionPopupRemoteTvPopupAlttabPopupAlttabComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RlbGV2aXNpb24vcG9wdXAtcmVtb3RlLXR2L3BvcHVwLWFsdHRhYi9wb3B1cC1hbHR0YWIuY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.ts":
  /*!***********************************************************************************!*\
    !*** ./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.ts ***!
    \***********************************************************************************/

  /*! exports provided: PopupAlttabComponent */

  /***/
  function srcAppTelevisionPopupRemoteTvPopupAlttabPopupAlttabComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopupAlttabComponent", function () {
      return PopupAlttabComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var PopupAlttabComponent = /*#__PURE__*/function () {
      function PopupAlttabComponent() {
        _classCallCheck(this, PopupAlttabComponent);

        this.giflove = 'assets/giphy.gif';
      }

      _createClass(PopupAlttabComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return PopupAlttabComponent;
    }();

    PopupAlttabComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-popup-alttab',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./popup-alttab.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./popup-alttab.component.css */
      "./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.css"))["default"]]
    })], PopupAlttabComponent);
    /***/
  },

  /***/
  "./src/app/television/popup-remote-tv/popup-remote-tv.component.css":
  /*!**************************************************************************!*\
    !*** ./src/app/television/popup-remote-tv/popup-remote-tv.component.css ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppTelevisionPopupRemoteTvPopupRemoteTvComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".equalizer{\r\n    width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n\r\n.verticalContainer {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-around;\r\n}\r\n\r\n\r\n.mediaPanel {\r\n  width: 100%;\r\n  height: auto;\r\n  position: relative;\r\n}\r\n\r\n\r\n.mediaPanel  img {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n  display: block;\r\n}\r\n\r\n\r\n.controlContainer {\r\n  height: auto;\r\n}\r\n\r\n\r\n.chaineSlider {\r\n  width: 100%; \r\n  height: auto; \r\n  overflow-x:auto; \r\n  white-space: nowrap;\r\n  display: inline-block;\r\n}\r\n\r\n\r\n.chainetv {\r\n  width: 100px;\r\n  height: 100px;\r\n  background-size: 100px;\r\n  display: inline-block;\r\n  position: relative;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVsZXZpc2lvbi9wb3B1cC1yZW1vdGUtdHYvcG9wdXAtcmVtb3RlLXR2LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0VBQ2IsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztBQUNUOzs7QUFHQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsNkJBQTZCO0FBQy9COzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOzs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjs7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7OztBQUdBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLHFCQUFxQjtBQUN2Qjs7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLDRCQUE0QjtBQUM5QiIsImZpbGUiOiJzcmMvYXBwL3RlbGV2aXNpb24vcG9wdXAtcmVtb3RlLXR2L3BvcHVwLXJlbW90ZS10di5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVxdWFsaXplcntcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcblxyXG4udmVydGljYWxDb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxufVxyXG5cclxuLm1lZGlhUGFuZWwge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogYXV0bztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi5tZWRpYVBhbmVsICBpbWcge1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gIG1hcmdpbi1yaWdodDogYXV0bztcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuLmNvbnRyb2xDb250YWluZXIge1xyXG4gIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuXHJcbi5jaGFpbmVTbGlkZXIge1xyXG4gIHdpZHRoOiAxMDAlOyBcclxuICBoZWlnaHQ6IGF1dG87IFxyXG4gIG92ZXJmbG93LXg6YXV0bzsgXHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5jaGFpbmV0diB7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG4gIGhlaWdodDogMTAwcHg7XHJcbiAgYmFja2dyb3VuZC1zaXplOiAxMDBweDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbn1cclxuXHJcblxyXG4iXX0= */";
    /***/
  },

  /***/
  "./src/app/television/popup-remote-tv/popup-remote-tv.component.ts":
  /*!*************************************************************************!*\
    !*** ./src/app/television/popup-remote-tv/popup-remote-tv.component.ts ***!
    \*************************************************************************/

  /*! exports provided: PopupRemoteTvComponent */

  /***/
  function srcAppTelevisionPopupRemoteTvPopupRemoteTvComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopupRemoteTvComponent", function () {
      return PopupRemoteTvComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _popup_alttab_popup_alttab_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./popup-alttab/popup-alttab.component */
    "./src/app/television/popup-remote-tv/popup-alttab/popup-alttab.component.ts");

    var PopupRemoteTvComponent = /*#__PURE__*/function () {
      function PopupRemoteTvComponent(dialog, javaService) {
        _classCallCheck(this, PopupRemoteTvComponent);

        this.dialog = dialog;
        this.javaService = javaService;
        this.readingIconUri = "assets/reading.gif";
        this.noCurrentMediaIconUri = "assets/nocurrentmedia.png";
        this.numberOfCloseCommandsInARow = 0;
      }

      _createClass(PopupRemoteTvComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this13 = this;

          this.arrayChainetvUri = [{
            "nom": "tf1",
            "uri": "assets/tf1.png",
            "reading": false
          }, {
            "nom": "fr2",
            "uri": "assets/fr2.png",
            "reading": false
          }, {
            "nom": "fr3",
            "uri": "assets/fr3.png",
            "reading": false
          }, {
            "nom": "fr4",
            "uri": "assets/fr4.png",
            "reading": false
          }, {
            "nom": "fr5",
            "uri": "assets/fr5.png",
            "reading": false
          }, {
            "nom": "arte",
            "uri": "assets/arte.png",
            "reading": false
          }, {
            "nom": "m6",
            "uri": "assets/m6.png",
            "reading": false
          }, {
            "nom": "fro",
            "uri": "assets/fro.png",
            "reading": false
          }, {
            "nom": "bfm",
            "uri": "assets/bfm.png",
            "reading": false
          }, {
            "nom": "cnews",
            "uri": "/assets/cnews.png",
            "reading": false
          }, {
            "nom": "c8",
            "uri": "/assets/c8.png",
            "reading": false
          }, {
            "nom": "cstar",
            "uri": "/assets/cstar.png",
            "reading": false
          }, {
            "nom": "w9",
            "uri": "/assets/w9.png",
            "reading": false
          }, {
            "nom": "tfx",
            "uri": "/assets/tfx.png",
            "reading": false
          }, {
            "nom": "tmc",
            "uri": "/assets/tmc.png",
            "reading": false
          }];
          this.javaService.getCurrentMedia().subscribe(function (res) {
            var chaine = _this13.arrayChainetvUri.find(function (chaine) {
              return chaine.nom === res;
            });

            if (chaine) {
              _this13.currentMedia = chaine.uri;
            }
          });
        }
      }, {
        key: "resetReading",
        value: function resetReading() {
          var _this14 = this;

          this.arrayChainetvUri.find(function (o) {
            return o.uri === _this14.currentMedia;
          }).reading = false;
        }
      }, {
        key: "selectedChannel",
        value: function selectedChannel(chaine) {
          if (this.currentMedia) this.resetReading();
          this.currentMedia = this.arrayChainetvUri.find(function (o) {
            return o.nom === chaine;
          }).uri;
          var elt = this.arrayChainetvUri.find(function (o) {
            return o.nom === chaine;
          });
          elt.reading = true;
          this.javaService.getTvChannel(chaine);
        }
      }, {
        key: "switchPause",
        value: function switchPause() {
          this.javaService.getSwitchPause().subscribe(function (res) {
            return console.log("switchpuase : ", res);
          });
        }
      }, {
        key: "fullScreen",
        value: function fullScreen() {
          var _this15 = this;

          this.javaService.postFullScreen().subscribe(function (res) {
            return _this15.fullScreenOn = res ? undefined : _this15.fullScreenOn;
          });
        }
      }, {
        key: "closeGeneralTab",
        value: function closeGeneralTab() {
          var _this16 = this;

          if (++this.numberOfCloseCommandsInARow % 3 === 0) {
            if (confirm("Ils t'ont rien fait de mal les onglets,\nt'es sûr que tu veux en fermer un de plus ?")) {
              this.javaService.getCloseTab().subscribe(function (res) {
                return _this16.currentMedia = res ? undefined : _this16.currentMedia;
              });
            }
          } else {
            this.javaService.getCloseTab().subscribe(function (res) {
              return _this16.currentMedia = res ? undefined : _this16.currentMedia;
            });
          }
        }
      }, {
        key: "closeReadingTab",
        value: function closeReadingTab() {
          var _this17 = this;

          this.numberOfCloseCommandsInARow = 0;
          this.javaService.getCloseTab().subscribe(function (res) {
            _this17.resetReading();

            _this17.currentMedia = res ? undefined : _this17.currentMedia;
          });
        }
      }, {
        key: "switchMonitor",
        value: function switchMonitor() {
          this.javaService.getSwitchMonitor().subscribe(function () {});
        }
      }, {
        key: "openAltTab",
        value: function openAltTab() {
          var dialogRef = this.dialog.open(_popup_alttab_popup_alttab_component__WEBPACK_IMPORTED_MODULE_4__["PopupAlttabComponent"], {
            data: {}
          });
          dialogRef.afterClosed().subscribe(function (result) {});
        }
      }]);

      return PopupRemoteTvComponent;
    }();

    PopupRemoteTvComponent.ctorParameters = function () {
      return [{
        type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]
      }, {
        type: _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__["PopupToJavaService"]
      }];
    };

    PopupRemoteTvComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-popup-remote-tv',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./popup-remote-tv.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/television/popup-remote-tv/popup-remote-tv.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./popup-remote-tv.component.css */
      "./src/app/television/popup-remote-tv/popup-remote-tv.component.css"))["default"]]
    })], PopupRemoteTvComponent);
    /***/
  },

  /***/
  "./src/app/television/television-tile/television-tile.component.css":
  /*!**************************************************************************!*\
    !*** ./src/app/television/television-tile/television-tile.component.css ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppTelevisionTelevisionTileTelevisionTileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RlbGV2aXNpb24vdGVsZXZpc2lvbi10aWxlL3RlbGV2aXNpb24tdGlsZS5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/television/television-tile/television-tile.component.ts":
  /*!*************************************************************************!*\
    !*** ./src/app/television/television-tile/television-tile.component.ts ***!
    \*************************************************************************/

  /*! exports provided: TelevisionTileComponent */

  /***/
  function srcAppTelevisionTelevisionTileTelevisionTileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TelevisionTileComponent", function () {
      return TelevisionTileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _popup_remote_tv_popup_remote_tv_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../popup-remote-tv/popup-remote-tv.component */
    "./src/app/television/popup-remote-tv/popup-remote-tv.component.ts");

    var TelevisionTileComponent = /*#__PURE__*/function () {
      function TelevisionTileComponent(dialog) {
        _classCallCheck(this, TelevisionTileComponent);

        this.dialog = dialog;
      }

      _createClass(TelevisionTileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "openTv",
        value: function openTv() {
          var dialogRef = this.dialog.open(_popup_remote_tv_popup_remote_tv_component__WEBPACK_IMPORTED_MODULE_3__["PopupRemoteTvComponent"], {
            data: {}
          });
        }
      }]);

      return TelevisionTileComponent;
    }();

    TelevisionTileComponent.ctorParameters = function () {
      return [{
        type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]
      }];
    };

    TelevisionTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-television-tile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./television-tile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/television/television-tile/television-tile.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./television-tile.component.css */
      "./src/app/television/television-tile/television-tile.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], TelevisionTileComponent);
    /***/
  },

  /***/
  "./src/app/vocal-tile/vocal-tile.component.css":
  /*!*****************************************************!*\
    !*** ./src/app/vocal-tile/vocal-tile.component.css ***!
    \*****************************************************/

  /*! exports provided: default */

  /***/
  function srcAppVocalTileVocalTileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".vocal-input {\r\n    height: 1; \r\n    width: 1; \r\n    opacity: 0;\r\n}\r\n\r\n.animation-valid-response {\r\n    -webkit-animation-name: valid-response-from-back;\r\n            animation-name: valid-response-from-back;\r\n    -webkit-animation-duration: 2s;\r\n            animation-duration: 2s;\r\n}\r\n\r\n@-webkit-keyframes valid-response-from-back {\r\n    from {background-color: lawngreen;}\r\n    to {background-color: lightcyan;}\r\n}\r\n\r\n@keyframes valid-response-from-back {\r\n    from {background-color: lawngreen;}\r\n    to {background-color: lightcyan;}\r\n}\r\n\r\n.animation-invalid-response {\r\n    -webkit-animation-name: invalid-response-from-back;\r\n            animation-name: invalid-response-from-back;\r\n    -webkit-animation-duration: 2s;\r\n            animation-duration: 2s;\r\n}\r\n\r\n@-webkit-keyframes invalid-response-from-back {\r\n    from {background-color: red;}\r\n    to {background-color: lightcyan;}\r\n}\r\n\r\n@keyframes invalid-response-from-back {\r\n    from {background-color: red;}\r\n    to {background-color: lightcyan;}\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdm9jYWwtdGlsZS92b2NhbC10aWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxTQUFTO0lBQ1QsUUFBUTtJQUNSLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGdEQUF3QztZQUF4Qyx3Q0FBd0M7SUFDeEMsOEJBQXNCO1lBQXRCLHNCQUFzQjtBQUMxQjs7QUFDQTtJQUNJLE1BQU0sMkJBQTJCLENBQUM7SUFDbEMsSUFBSSwyQkFBMkIsQ0FBQztBQUNwQzs7QUFIQTtJQUNJLE1BQU0sMkJBQTJCLENBQUM7SUFDbEMsSUFBSSwyQkFBMkIsQ0FBQztBQUNwQzs7QUFFQTtJQUNJLGtEQUEwQztZQUExQywwQ0FBMEM7SUFDMUMsOEJBQXNCO1lBQXRCLHNCQUFzQjtBQUMxQjs7QUFDQTtJQUNJLE1BQU0scUJBQXFCLENBQUM7SUFDNUIsSUFBSSwyQkFBMkIsQ0FBQztBQUNwQzs7QUFIQTtJQUNJLE1BQU0scUJBQXFCLENBQUM7SUFDNUIsSUFBSSwyQkFBMkIsQ0FBQztBQUNwQyIsImZpbGUiOiJzcmMvYXBwL3ZvY2FsLXRpbGUvdm9jYWwtdGlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnZvY2FsLWlucHV0IHtcclxuICAgIGhlaWdodDogMTsgXHJcbiAgICB3aWR0aDogMTsgXHJcbiAgICBvcGFjaXR5OiAwO1xyXG59XHJcblxyXG4uYW5pbWF0aW9uLXZhbGlkLXJlc3BvbnNlIHtcclxuICAgIGFuaW1hdGlvbi1uYW1lOiB2YWxpZC1yZXNwb25zZS1mcm9tLWJhY2s7XHJcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xyXG59XHJcbkBrZXlmcmFtZXMgdmFsaWQtcmVzcG9uc2UtZnJvbS1iYWNrIHtcclxuICAgIGZyb20ge2JhY2tncm91bmQtY29sb3I6IGxhd25ncmVlbjt9XHJcbiAgICB0byB7YmFja2dyb3VuZC1jb2xvcjogbGlnaHRjeWFuO31cclxufVxyXG5cclxuLmFuaW1hdGlvbi1pbnZhbGlkLXJlc3BvbnNlIHtcclxuICAgIGFuaW1hdGlvbi1uYW1lOiBpbnZhbGlkLXJlc3BvbnNlLWZyb20tYmFjaztcclxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XHJcbn1cclxuQGtleWZyYW1lcyBpbnZhbGlkLXJlc3BvbnNlLWZyb20tYmFjayB7XHJcbiAgICBmcm9tIHtiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7fVxyXG4gICAgdG8ge2JhY2tncm91bmQtY29sb3I6IGxpZ2h0Y3lhbjt9XHJcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/vocal-tile/vocal-tile.component.ts":
  /*!****************************************************!*\
    !*** ./src/app/vocal-tile/vocal-tile.component.ts ***!
    \****************************************************/

  /*! exports provided: VocalTileComponent */

  /***/
  function srcAppVocalTileVocalTileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "VocalTileComponent", function () {
      return VocalTileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");

    var VocalTileComponent = /*#__PURE__*/function () {
      function VocalTileComponent(javaService) {
        _classCallCheck(this, VocalTileComponent);

        this.javaService = javaService;
        this.keyboardInputValue = '';
        this.inputDisplayed = true;
      }

      _createClass(VocalTileComponent, [{
        key: "listen",
        value: function listen() {
          this.vocalCommandInput.nativeElement.focus();
        }
      }, {
        key: "onModelChange",
        value: function onModelChange(e) {
          var _this18 = this;

          clearTimeout(this.commandTimer);
          this.commandTimer = setTimeout(function () {
            _this18.javaService.sendVocalCommand(_this18.keyboardInputValue).subscribe(function (executed) {
              var responseClass = executed === true ? 'animation-valid-response' : 'animation-invalid-response';

              _this18.vocalTile.nativeElement.classList.add(responseClass);

              setTimeout(function () {
                _this18.vocalTile.nativeElement.classList.remove(responseClass);
              }, 2000);
              _this18.keyboardInputValue = '';
            });
          }, 1500);
        }
      }]);

      return VocalTileComponent;
    }();

    VocalTileComponent.ctorParameters = function () {
      return [{
        type: _service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__["PopupToJavaService"]
      }];
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('vocalCommandInput', {
      "static": false
    })], VocalTileComponent.prototype, "vocalCommandInput", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('vocalTile', {
      "static": false
    })], VocalTileComponent.prototype, "vocalTile", void 0);
    VocalTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-vocal-tile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./vocal-tile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/vocal-tile/vocal-tile.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./vocal-tile.component.css */
      "./src/app/vocal-tile/vocal-tile.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], VocalTileComponent);
    /***/
  },

  /***/
  "./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.css":
  /*!***********************************************************************************!*\
    !*** ./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.css ***!
    \***********************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppVolumeSwitchVolumeSwitchTileVolumeSwitchTileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".mutedVolume {\r\n    background-color:lightpink;\r\n  }\r\n\r\n.notMutedVolume {\r\n  background-color:aliceblue;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdm9sdW1lLXN3aXRjaC92b2x1bWUtc3dpdGNoLXRpbGUvdm9sdW1lLXN3aXRjaC10aWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSwwQkFBMEI7RUFDNUI7O0FBRUY7RUFDRSwwQkFBMEI7QUFDNUIiLCJmaWxlIjoic3JjL2FwcC92b2x1bWUtc3dpdGNoL3ZvbHVtZS1zd2l0Y2gtdGlsZS92b2x1bWUtc3dpdGNoLXRpbGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tdXRlZFZvbHVtZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOmxpZ2h0cGluaztcclxuICB9XHJcblxyXG4ubm90TXV0ZWRWb2x1bWUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6YWxpY2VibHVlO1xyXG59Il19 */";
    /***/
  },

  /***/
  "./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.ts":
  /*!**********************************************************************************!*\
    !*** ./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.ts ***!
    \**********************************************************************************/

  /*! exports provided: VolumeSwitchTileComponent */

  /***/
  function srcAppVolumeSwitchVolumeSwitchTileVolumeSwitchTileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "VolumeSwitchTileComponent", function () {
      return VolumeSwitchTileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");

    var VolumeSwitchTileComponent = /*#__PURE__*/function () {
      function VolumeSwitchTileComponent(javaService) {
        _classCallCheck(this, VolumeSwitchTileComponent);

        this.javaService = javaService;
        this.MUTE = "1";
        this.UNMUTE = "0";
        this.currentMuted = false;
      }

      _createClass(VolumeSwitchTileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this19 = this;

          this.javaService.getMute().subscribe(function (isMuted) {
            _this19.currentMuted = isMuted;
          });
        }
      }, {
        key: "switchVolumeMute",
        value: function switchVolumeMute() {
          var _this20 = this;

          var muteOrUnmute = this.currentMuted ? this.UNMUTE : this.MUTE;
          this.javaService.postMute(muteOrUnmute).subscribe(function (result) {
            _this20.currentMuted = result;
          });
        }
      }, {
        key: "getMuteClass",
        value: function getMuteClass() {
          var classList = 'material-icons tuile_1x1';
          return classList + (this.currentMuted ? ' mutedVolume' : ' notMutedVolume');
        }
      }]);

      return VolumeSwitchTileComponent;
    }();

    VolumeSwitchTileComponent.ctorParameters = function () {
      return [{
        type: src_app_service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_2__["PopupToJavaService"]
      }];
    };

    VolumeSwitchTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-volume-switch-tile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./volume-switch-tile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./volume-switch-tile.component.css */
      "./src/app/volume-switch/volume-switch-tile/volume-switch-tile.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], VolumeSwitchTileComponent);
    /***/
  },

  /***/
  "./src/app/youtube-unit/youtube-unit.component.css":
  /*!*********************************************************!*\
    !*** ./src/app/youtube-unit/youtube-unit.component.css ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppYoutubeUnitYoutubeUnitComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3lvdXR1YmUtdW5pdC95b3V0dWJlLXVuaXQuY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/youtube-unit/youtube-unit.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/youtube-unit/youtube-unit.component.ts ***!
    \********************************************************/

  /*! exports provided: YoutubeUnitComponent */

  /***/
  function srcAppYoutubeUnitYoutubeUnitComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "YoutubeUnitComponent", function () {
      return YoutubeUnitComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var YoutubeUnitComponent = /*#__PURE__*/function () {
      function YoutubeUnitComponent() {
        _classCallCheck(this, YoutubeUnitComponent);
      }

      _createClass(YoutubeUnitComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.urlVideo = "https://www.youtube.com/watch?v=" + this.video.id.videoId;
        }
      }, {
        key: "ngOnChanges",
        value: function ngOnChanges() {}
      }]);

      return YoutubeUnitComponent;
    }();

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], YoutubeUnitComponent.prototype, "video", void 0);
    YoutubeUnitComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-youtube-unit',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./youtube-unit.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/youtube-unit/youtube-unit.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./youtube-unit.component.css */
      "./src/app/youtube-unit/youtube-unit.component.css"))["default"]]
    })], YoutubeUnitComponent);
    /***/
  },

  /***/
  "./src/app/youtube/popup-youtube/popup-youtube.component.css":
  /*!*******************************************************************!*\
    !*** ./src/app/youtube/popup-youtube/popup-youtube.component.css ***!
    \*******************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppYoutubePopupYoutubePopupYoutubeComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".video-list {\r\n    overflow-y:scroll;\r\n    height: 700px;\r\n}\r\n\r\n.youtube-container {\r\n    display: flex;           /* establish flex container */\r\n    flex-direction: column;  /* make main axis vertical */\r\n    justify-content: center; /* center items vertically, in this case */\r\n    align-items: center;  \r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAveW91dHViZS9wb3B1cC15b3V0dWJlL3BvcHVwLXlvdXR1YmUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYSxZQUFZLDZCQUE2QjtJQUN0RCxzQkFBc0IsR0FBRyw0QkFBNEI7SUFDckQsdUJBQXVCLEVBQUUsMENBQTBDO0lBQ25FLG1CQUFtQjtBQUN2QiIsImZpbGUiOiJzcmMvYXBwL3lvdXR1YmUvcG9wdXAteW91dHViZS9wb3B1cC15b3V0dWJlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudmlkZW8tbGlzdCB7XHJcbiAgICBvdmVyZmxvdy15OnNjcm9sbDtcclxuICAgIGhlaWdodDogNzAwcHg7XHJcbn1cclxuXHJcbi55b3V0dWJlLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4OyAgICAgICAgICAgLyogZXN0YWJsaXNoIGZsZXggY29udGFpbmVyICovXHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyAgLyogbWFrZSBtYWluIGF4aXMgdmVydGljYWwgKi9cclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyAvKiBjZW50ZXIgaXRlbXMgdmVydGljYWxseSwgaW4gdGhpcyBjYXNlICovXHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAgXHJcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/youtube/popup-youtube/popup-youtube.component.ts":
  /*!******************************************************************!*\
    !*** ./src/app/youtube/popup-youtube/popup-youtube.component.ts ***!
    \******************************************************************/

  /*! exports provided: PopupYoutubeComponent */

  /***/
  function srcAppYoutubePopupYoutubePopupYoutubeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PopupYoutubeComponent", function () {
      return PopupYoutubeComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var src_app_service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/service/popup-to-java.service */
    "./src/app/service/popup-to-java.service.ts");

    var PopupYoutubeComponent = /*#__PURE__*/function () {
      function PopupYoutubeComponent(sanitizer, javaService) {
        _classCallCheck(this, PopupYoutubeComponent);

        this.sanitizer = sanitizer;
        this.javaService = javaService;
        this.search = '';
        this.onRead = false;
        this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("www.youtube.com");
      }

      _createClass(PopupYoutubeComponent, [{
        key: "onSubmit",
        value: function onSubmit() {
          if (this.search) {
            this.javaService.getYoutubeVideo(this.search);
            this.onRead = true;
            this.search = '';
          }
        }
      }, {
        key: "closeCurrentTab",
        value: function closeCurrentTab() {
          this.javaService.getCloseTab().subscribe(function (res) {
            return console.log("Onglet fermé.");
          });
          this.onRead = false;
        }
      }, {
        key: "switchMonitor",
        value: function switchMonitor() {
          this.javaService.getSwitchMonitor().subscribe(function (res) {
            return console.log(res);
          });
        }
      }, {
        key: "thisVideoGotSelected",
        value: function thisVideoGotSelected(video) {
          this.javaService.getYoutubeVideo(video.id.videoId);
        }
      }]);

      return PopupYoutubeComponent;
    }();

    PopupYoutubeComponent.ctorParameters = function () {
      return [{
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]
      }, {
        type: src_app_service_popup_to_java_service__WEBPACK_IMPORTED_MODULE_3__["PopupToJavaService"]
      }];
    };

    PopupYoutubeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-popup-youtube',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./popup-youtube.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/youtube/popup-youtube/popup-youtube.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./popup-youtube.component.css */
      "./src/app/youtube/popup-youtube/popup-youtube.component.css"))["default"]]
    })], PopupYoutubeComponent);
    /***/
  },

  /***/
  "./src/app/youtube/youtube-tile/youtube-tile.component.css":
  /*!*****************************************************************!*\
    !*** ./src/app/youtube/youtube-tile/youtube-tile.component.css ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppYoutubeYoutubeTileYoutubeTileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".youtube {\r\n    background-image: url(\"/assets/youtube.png\");\r\n    background-repeat: no-repeat;\r\n    background-size: 46px 32px;\r\n    background-position-x: center;\r\n    background-position-y: center;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAveW91dHViZS95b3V0dWJlLXRpbGUveW91dHViZS10aWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw0Q0FBNEM7SUFDNUMsNEJBQTRCO0lBQzVCLDBCQUEwQjtJQUMxQiw2QkFBNkI7SUFDN0IsNkJBQTZCO0VBQy9CIiwiZmlsZSI6InNyYy9hcHAveW91dHViZS95b3V0dWJlLXRpbGUveW91dHViZS10aWxlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIueW91dHViZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL3lvdXR1YmUucG5nXCIpO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogNDZweCAzMnB4O1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uLXk6IGNlbnRlcjtcclxuICB9Il19 */";
    /***/
  },

  /***/
  "./src/app/youtube/youtube-tile/youtube-tile.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/youtube/youtube-tile/youtube-tile.component.ts ***!
    \****************************************************************/

  /*! exports provided: YoutubeTileComponent */

  /***/
  function srcAppYoutubeYoutubeTileYoutubeTileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "YoutubeTileComponent", function () {
      return YoutubeTileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/esm2015/material.js");
    /* harmony import */


    var _popup_youtube_popup_youtube_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../popup-youtube/popup-youtube.component */
    "./src/app/youtube/popup-youtube/popup-youtube.component.ts");

    var YoutubeTileComponent = /*#__PURE__*/function () {
      function YoutubeTileComponent(dialog) {
        _classCallCheck(this, YoutubeTileComponent);

        this.dialog = dialog;
      }

      _createClass(YoutubeTileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "openYoutube",
        value: function openYoutube() {
          var dialogRef = this.dialog.open(_popup_youtube_popup_youtube_component__WEBPACK_IMPORTED_MODULE_3__["PopupYoutubeComponent"], {
            width: '500px',
            data: {}
          });
        }
      }]);

      return YoutubeTileComponent;
    }();

    YoutubeTileComponent.ctorParameters = function () {
      return [{
        type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]
      }];
    };

    YoutubeTileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-youtube-tile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./youtube-tile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/youtube/youtube-tile/youtube-tile.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./youtube-tile.component.css */
      "./src/app/youtube/youtube-tile/youtube-tile.component.css"))["default"], tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ../../telecommande/telecommande.component.css */
      "./src/app/telecommande/telecommande.component.css"))["default"]]
    })], YoutubeTileComponent);
    /***/
  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js"); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      production: false,
      videoSurveillance: false,
      BACKEND_URL: "http://192.168.1.123:8080"
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/environments/window-provider.ts":
  /*!*********************************************!*\
    !*** ./src/environments/window-provider.ts ***!
    \*********************************************/

  /*! exports provided: WINDOW, WINDOW_PROVIDERS */

  /***/
  function srcEnvironmentsWindowProviderTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WINDOW", function () {
      return WINDOW;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WINDOW_PROVIDERS", function () {
      return WINDOW_PROVIDERS;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var WINDOW = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('window');
    var windowProvider = {
      provide: WINDOW,
      useFactory: function useFactory() {
        return window;
      }
    };
    var WINDOW_PROVIDERS = [windowProvider];
    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! hammerjs */
    "./node_modules/hammerjs/hammer.js");
    /* harmony import */


    var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
    }

    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/
  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! C:\Users\gazor\Desktop\Git\bvstien\Angular\Telecommande\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map