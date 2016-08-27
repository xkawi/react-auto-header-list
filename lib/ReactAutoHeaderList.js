'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ReactAutoHeaderList = (function (_Component) {
    _inherits(ReactAutoHeaderList, _Component);

    function ReactAutoHeaderList(props) {
        _classCallCheck(this, ReactAutoHeaderList);

        _get(Object.getPrototypeOf(ReactAutoHeaderList.prototype), 'constructor', this).call(this, props);
        this.state = {
            transformedData: {}
        };
        this.transformItems = this.transformItems.bind(this);
        this.renderSection = this.renderSection.bind(this);
        this.arraysEqual = this.arraysEqual.bind(this);
        this.arraysDifference = this.arraysDifference.bind(this);
        this.countProps = this.countProps.bind(this);
        this.objectEquals = this.objectEquals.bind(this);
    }

    _createClass(ReactAutoHeaderList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (Array.isArray(this.props.items)) {
                this.transformItems(this.props.items);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this = this;

            if (!this.arraysEqual(nextProps.items, this.props.items)) {
                var newItems = this.arraysDifference(nextProps.items, this.props.items, function (a, b) {
                    return _this.objectEquals(a, b);
                });
                var isNewList = nextProps.totalItemCount !== this.props.totalItemCount;
                this.transformItems(newItems, isNewList);
            }
        }
    }, {
        key: 'arraysEqual',
        value: function arraysEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) {
                return false;
            }
            for (var i = arr1.length; i--;) {
                if (!this.objectEquals(arr1[i], arr2[i])) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'arraysDifference',
        value: function arraysDifference(a, b, pred) {
            var contains = function contains(pred, a, list) {
                var idx = -1,
                    len = list.length;
                while (++idx < len) {
                    if (pred(a, list[idx])) {
                        return true;
                    }
                }
                return false;
            };
            var complement = function complement(pred, a, b) {
                return a.filter(function (elem) {
                    return !contains(pred, elem, b);
                });
            };
            return complement(pred, a, b).concat(complement(pred, b, a));
        }
    }, {
        key: 'countProps',
        value: function countProps(obj) {
            var count = 0;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    count++;
                }
            }
            return count;
        }
    }, {
        key: 'objectEquals',
        value: function objectEquals(v1, v2) {
            if (typeof v1 !== typeof v2) {
                return false;
            }
            if (typeof v1 === 'function') {
                return v1.toString() === v2.toString();
            }
            if (v1 instanceof Object && v2 instanceof Object) {
                if (this.countProps(v1) !== this.countProps(v2)) {
                    return false;
                }
                var r = true;
                for (k in v1) {
                    r = this.objectEquals(v1[k], v2[k]);
                    if (!r) {
                        return false;
                    }
                }
                return true;
            } else {
                return v1 === v2;
            }
        }
    }, {
        key: 'transformItems',
        value: function transformItems(items, isNewList) {
            var _this2 = this;

            var transformed = isNewList ? {} : this.state.transformedData;
            items.forEach(function (item) {
                var sectionHeaderTitle = _this2.props.getSectionHeaderTitle(item);
                if (!transformed[sectionHeaderTitle]) {
                    transformed[sectionHeaderTitle] = [];
                }
                transformed[sectionHeaderTitle].push(item);
            });
            this.setState({
                transformedData: transformed
            });
        }
    }, {
        key: 'renderSection',
        value: function renderSection(sectionHeaderTitle, items, reactUniqueKey) {
            var _props = this.props;
            var renderHeader = _props.renderHeader;
            var renderItem = _props.renderItem;

            return _react2['default'].createElement(
                'div',
                { key: reactUniqueKey },
                renderHeader(sectionHeaderTitle),
                items.map(renderItem)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props;
            var totalItemCount = _props2.totalItemCount;
            var items = _props2.items;
            var isFetching = _props2.isFetching;
            var onLoadMore = _props2.onLoadMore;
            var loadingLabel = _props2.loadingLabel;
            var transformedData = this.state.transformedData;

            var isEmpty = items.length === 0;
            if (isEmpty && isFetching) {
                return this.props.renderLoadingView(loadingLabel);
            }

            var isLastPage = items.length === totalItemCount;
            if (isEmpty && isLastPage) {
                return this.props.renderEmptyView();
            }

            var listContent = Object.keys(transformedData).map(function (sectionHeaderTitle, key) {
                var sectionItems = transformedData[sectionHeaderTitle];
                return _this3.renderSection(sectionHeaderTitle, sectionItems, key);
            });

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    null,
                    listContent
                ),
                _react2['default'].createElement(
                    'div',
                    null,
                    totalItemCount > 0 && !isLastPage && this.props.renderLoadMoreButton(onLoadMore, isFetching)
                )
            );
        }
    }]);

    return ReactAutoHeaderList;
})(_react.Component);

ReactAutoHeaderList.propTypes = {
    getSectionHeaderTitle: _react.PropTypes.func.isRequired,
    isFetching: _react.PropTypes.bool.isRequired,
    items: _react.PropTypes.array.isRequired,
    loadingLabel: _react.PropTypes.string,
    onLoadMore: _react.PropTypes.func,
    totalItemCount: _react.PropTypes.number.isRequired,
    renderEmptyView: _react.PropTypes.func,
    renderHeader: _react.PropTypes.func,
    renderItem: _react.PropTypes.func.isRequired,
    renderLoadingView: _react.PropTypes.func,
    renderLoadMoreButton: _react.PropTypes.func
};

ReactAutoHeaderList.defaultProps = {
    isFetching: false,
    loadingLabel: 'Loading...',
    totalItemCount: 0,
    items: [],
    onLoadMore: function onLoadMore() {
        return null;
    },
    renderItem: function renderItem(item, key) {
        return _react2['default'].createElement(
            'div',
            { key: key },
            _react2['default'].createElement(
                'pre',
                null,
                JSON.stringify(item, null, 2)
            )
        );
    },
    renderHeader: function renderHeader(sectionHeaderTitle, key) {
        return _react2['default'].createElement(
            'div',
            { key: key },
            _react2['default'].createElement(
                'h1',
                null,
                sectionHeaderTitle
            )
        );
    },
    getSectionHeaderTitle: function getSectionHeaderTitle(item) {
        return '#';
    },
    renderLoadingView: function renderLoadingView(loadingLabel) {
        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'h3',
                null,
                loadingLabel || 'Loading...'
            )
        );
    },
    renderLoadMoreButton: function renderLoadMoreButton(onLoadMore, isFetching) {
        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'button',
                { onClick: onLoadMore },
                isFetching ? 'Load More' : 'Loading...'
            )
        );
    },
    renderEmptyView: function renderEmptyView() {
        return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
                'h3',
                null,
                'no data available'
            )
        );
    }
};

exports['default'] = ReactAutoHeaderList;
module.exports = exports['default'];