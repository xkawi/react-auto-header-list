require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAutoHeaderList = require('react-auto-header-list');

var _reactAutoHeaderList2 = _interopRequireDefault(_reactAutoHeaderList);

var App = (function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
		this.state = {
			data: [{ name: 'Jon Snow', house: 'Stark', age: '23' }, { name: 'Daenerys', house: 'Targeryen', age: '21' }, { name: 'Benjen', house: 'Stark', age: '50' }, { name: 'Tyrion', house: 'Lannister', age: '40' }, { name: 'Eddard', house: 'Stark', age: '60' }, { name: 'Hodor', house: 'Stark', age: '34' }, { name: 'Khal Drogo', house: 'Dothraki', age: '45' }, { name: 'Daario Naharis', house: 'Second Sons', age: '25' }, { name: 'Jamie', house: 'Lannister', age: '43' }, { name: 'Arya', house: 'Stark', age: '40' }, { name: 'Sansa', house: 'Stark', age: '40' }, { name: 'Cersei', house: 'Lannister', age: '40' }, { name: 'Jorah', house: 'Mormont', age: '40' }]
		};
	}

	_createClass(App, [{
		key: 'onLoadMoreClicked',
		value: function onLoadMoreClicked() {
			// you can handle 'load more' logic here
			console.log('load more is clicked');
		}
	}, {
		key: 'getSectionHeaderTitle',
		value: function getSectionHeaderTitle(item) {
			return item.house;
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader(headerKey, key) {
			return _react2['default'].createElement(
				'div',
				{ key: key, style: { backgroundColor: '#D3D3D3', color: '#0000FF' } },
				'House: ',
				headerKey
			);
		}
	}, {
		key: 'renderItem',
		value: function renderItem(item, key) {
			return _react2['default'].createElement(
				'div',
				{ key: key },
				_react2['default'].createElement(
					'h3',
					null,
					'Name: ',
					item.name,
					_react2['default'].createElement('br', null),
					'Age: ',
					item.age
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var items = this.state.data;
			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(_reactAutoHeaderList2['default'], {
					items: items,
					totalItemCount: items.length,
					onLoadMore: this.onLoadMoreClicked,
					isFetching: false,
					getSectionHeaderTitle: this.getSectionHeaderTitle,
					renderItem: this.renderItem,
					renderHeader: this.renderHeader
				})
			);
		}
	}]);

	return App;
})(_react.Component);

;

_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-auto-header-list":undefined,"react-dom":undefined}]},{},[1]);
