import React, { Component, PropTypes } from 'react';

class ReactAutoHeaderList extends Component {
    constructor(props) {
        super(props);
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

    componentWillMount() {
        if (Array.isArray(this.props.items)) {
            this.transformItems(this.props.items);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.arraysEqual(nextProps.items, this.props.items)) {
            const newItems = this.arraysDifference(nextProps.items, this.props.items, (a, b) => {
                return this.objectEquals(a, b);
            });
            const isNewList = (nextProps.totalItemCount !== this.props.totalItemCount);
            this.transformItems(newItems, isNewList);
        }
    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = arr1.length; i--;) {
            if (!this.objectEquals(arr1[i], arr2[i])) {
                return false;
            }
        }
        return true;
    }

    arraysDifference(a, b, pred) {
        const contains = function (pred, a, list) {
            let idx = -1, len = list.length;
            while (++idx < len) { if (pred(a, list[idx])) { return true; } }
            return false;
        };
        const complement = function (pred, a, b) {
            return a.filter(function (elem) { return !contains(pred, elem, b); });
        };
        return complement(pred, a, b).concat(complement(pred, b, a));
    };

    countProps(obj) {
        let count = 0;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                count++;
            }
        }
        return count;
    }

    objectEquals(v1, v2) {
        if (typeof (v1) !== typeof (v2)) {
            return false;
        }
        if (typeof (v1) === 'function') {
            return v1.toString() === v2.toString();
        }
        if (v1 instanceof Object && v2 instanceof Object) {
            if (this.countProps(v1) !== this.countProps(v2)) {
                return false;
            }
            let r = true;
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

    transformItems(items, isNewList) {
        let transformed = isNewList ? {} : this.state.transformedData;
        items.forEach((item) => {
            const sectionHeaderTitle = this.props.getSectionHeaderTitle(item);
            if (!transformed[sectionHeaderTitle]) {
                transformed[sectionHeaderTitle] = [];
            }
            transformed[sectionHeaderTitle].push(item);
        });
        this.setState({
            transformedData: transformed
        });
    }

    renderSection(sectionHeaderTitle, items, reactUniqueKey) {
        const { renderHeader, renderItem } = this.props;
        return (
            <div className="row" key={reactUniqueKey}>
                {renderHeader(sectionHeaderTitle) }
                {items.map(renderItem) }
            </div>
        );
    }

    render() {
        const { totalItemCount, items, isFetching, onLoadMore, loadingLabel } = this.props;
        const { transformedData } = this.state;

        const isEmpty = items.length === 0;
        if (isEmpty && isFetching) {
            return this.props.renderLoadingView(loadingLabel);
        }

        const isLastPage = items.length === totalItemCount;
        if (isEmpty && isLastPage) {
            return this.props.renderEmptyView();
        }

        const listContent = Object.keys(transformedData).map((sectionHeaderTitle, key) => {
            const sectionItems = transformedData[sectionHeaderTitle];
            return this.renderSection(sectionHeaderTitle, sectionItems, key);
        });

        return (
            <div>
                <div className="row">
                    {listContent}
                </div>
                <div className="row">
                    {totalItemCount > 0 && !isLastPage && this.props.renderLoadMoreButton(onLoadMore, isFetching) }
                </div>
            </div>
        );
    }
}

ReactAutoHeaderList.propTypes = {
    getSectionHeaderTitle: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    loadingLabel: PropTypes.string,
    onLoadMore: PropTypes.func,
    totalItemCount: PropTypes.number.isRequired,
    renderEmptyView: PropTypes.func,
    renderHeader: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    renderLoadingView: PropTypes.func,
    renderLoadMoreButton: PropTypes.func
};

ReactAutoHeaderList.defaultProps = {
    isFetching: false,
    loadingLabel: 'Loading...',
    totalItemCount: 0,
    items: [],
    onLoadMore: () => {
        return null;
    },
    renderItem: (item, key) => {
        return (
            <div key={key}>
                <pre>{JSON.stringify(item, null, 2) }</pre>
            </div>
        );
    },
    renderHeader: (sectionHeaderTitle, key) => {
        return (
            <div key={key}>
                <h1>{sectionHeaderTitle}</h1>
            </div>
        );
    },
    getSectionHeaderTitle(item) {
        return '#';
    },
    renderLoadingView: (loadingLabel) => {
        return (
            <div>
                <h3>{loadingLabel || 'Loading...'}</h3>
            </div>
        );
    },
    renderLoadMoreButton: (onLoadMore, isFetching) => {
        return (
            <div>
                <button onClick={onLoadMore}>{isFetching ? 'Load More' : 'Loading...'}</button>
            </div>
        );
    },
    renderEmptyView: () => {
        return (
            <div>
                <h3>no data available</h3>
            </div>
        );
    }
};

export default ReactAutoHeaderList;
