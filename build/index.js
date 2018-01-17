module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wavy = function (_React$Component) {
  _inherits(Wavy, _React$Component);

  function Wavy() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Wavy);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wavy.__proto__ || Object.getPrototypeOf(Wavy)).call.apply(_ref, [this].concat(args))), _this), _this.state = { cursor: 0 }, _this.onMouseMove = function (event) {
      if (!_this.props.useCursor) return;
      var rect = _this.canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      _this.setState({ cursor: x });
    }, _this.onMouseLeave = function (event) {
      if (!_this.props.useCursor) return;
      _this.setState({ cursor: 0 });
    }, _this.onClick = function (event) {
      var rect = _this.canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      _this.props.onClick(x);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Wavy, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvas = this.canvas;
      var ctx = canvas.getContext("2d");
      this.draw(ctx);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.draw(this.canvas.getContext("2d"));
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var data = this.props.data;
      var width = this.props.width;
      var height = this.props.height;
      var cursor = this.state.cursor;
      var useMiddle = this.props.useMiddle;
      var progress = this.props.progress;
      var cursorColor = this.props.cursorColor;
      var innerColor = this.props.innerColor;
      var outerColor = this.props.outerColor;
      var gap = this.props.gap;
      var step = this.props.step;

      var ratio = data.length / width;

      var position = progress * width;

      var max = Math.max.apply(Math, _toConsumableArray(data));
      var fixedData = max > 1 ? data.map(function (i) {
        return i / max;
      }) : data;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (var i = 0; i < width; i += step + gap) {
        var datum = fixedData[Math.floor(i * ratio)];
        if (position >= i) {
          if (cursor >= position && position >= i) {
            ctx.fillStyle = innerColor;
          } else if (cursor >= i) {
            ctx.fillStyle = cursorColor;
          } else {
            ctx.fillStyle = innerColor;
          }
        } else if (cursor >= i) {
          ctx.fillStyle = cursorColor;
        } else {
          ctx.fillStyle = outerColor;
        }

        var h = useMiddle ? datum * height : -1 * datum * height;
        var w = step;
        var y = useMiddle ? (height - h) / 2 : height;
        var x = i;

        ctx.fillRect(x, y, w, Math.max(h, 1));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement("canvas", {
        ref: function ref(c) {
          _this2.canvas = c;
        },
        width: this.props.width,
        height: this.props.height,
        onMouseMove: this.onMouseMove,
        onMouseLeave: this.onMouseLeave,
        onClick: this.onClick
      });
    }
  }]);

  return Wavy;
}(_react2.default.Component);

Wavy.defaultProps = {
  data: [],
  width: 900,
  height: 70,
  gap: 1,
  step: 2,
  progress: 0,
  useMiddle: false,
  useCursor: false,
  onClick: function onClick() {},
  outerColor: "#ecf0f1",
  innerColor: "#29272c",
  cursorColor: "#5bcaff"
};
Wavy.propTypes = {
  data: _react2.default.PropTypes.array.isRequired,
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  gap: _react2.default.PropTypes.number,
  step: _react2.default.PropTypes.number,
  progress: _react2.default.PropTypes.number,
  useMiddle: _react2.default.PropTypes.bool,
  useCursor: _react2.default.PropTypes.bool,
  onClick: _react2.default.PropTypes.func,
  innerColor: _react2.default.PropTypes.string,
  outerColor: _react2.default.PropTypes.string,
  cursorColor: _react2.default.PropTypes.string
};
exports.default = Wavy;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);