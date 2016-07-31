# ReactAutoHeaderList

Automatically create and render a list of items with headers to categorize them into sections/groups. You can think of it like the React version of iOS TableView with section header.
ReactAutoHeaderList has zero dependencies, it only has peerDependencies for react.

## Demo & Examples

Live demo: [xkawi.github.io/react-auto-header-list](http://xkawi.github.io/react-auto-header-list/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-auto-header-list is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-auto-header-list.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-auto-header-list --save
```


## Usage

Simply require them into your React component (or import is you support ES6 syntax). Refer to `example/src` for more details on how to use it.

```
var ReactAutoHeaderList = require('react-auto-header-list');

<ReactAutoHeaderList
    items={items}
    totalItemCount={items.length}
    onLoadMore={this.onLoadMoreClicked}
    isFetching={false}
    getSectionHeaderTitle={this.getSectionHeaderTitle}
    renderItem={this.renderItem}
    renderHeader={this.renderHeader}
/>
```

### Properties

Required Props:

- `items` - array of items (e.g. `[{}, {}, {}]`);
- `totalItemCount` - number of items
- `isFetching` - boolean to indicate if data is being fetched, so it can show loading screen while fetching data asynchronously
- `onLoadMore` - function to load more data if items is fetch asynchronously
- `renderItem` - function to render the view of each item
- `getSectionHeaderTitle` - function to determine the section header title (e.g. first character of item.name), it will transform the items array accordingly

Optional Props:

- `renderHeader(headerTitle)` - function to render view for section header title 
- `renderLoadingView(isFetching)` - function to render loading view when `isFetching===true`
- `renderLoadMoreButton(onLoadMore, isFetching)` - function to render 'load more' button
- `renderEmptyView` - function to render view when `items.length = 0`
- `loadingLabel` - string used in renderLoadingView (can be overwritten by `renderLoadingView` function itself) 

### Notes

ReactAutoHeaderList uses the `totalItemCount` props to determine if it needs to reset the transformed list or append to existing list when new data comes in. You can look at `componentWillReceiveProps` method on this business logic assumption.

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## Roadmap

- replace 'load more' button with load data on scroll mechanism
- optimise rendering by only rendering views within the visible range of the viewport
- allow options to disable header
- replace or remove gulp with webpack or npm script

## License

ISC

Copyright (c) 2016 Kawi Xiao.

