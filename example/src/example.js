import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactAutoHeaderList from 'react-auto-header-list';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'Jon Snow', house: 'Stark', age: '23' },
				{ name: 'Daenerys', house: 'Targeryen', age: '21' },
				{ name: 'Benjen', house: 'Stark', age: '50' },
				{ name: 'Tyrion', house: 'Lannister', age: '40' },
				{ name: 'Eddard', house: 'Stark', age: '60' },
				{ name: 'Hodor', house: 'Stark', age: '34' },
				{ name: 'Khal Drogo', house: 'Dothraki', age: '45' },
				{ name: 'Daario Naharis', house: 'Second Sons', age: '25' },
				{ name: 'Jamie', house: 'Lannister', age: '43' },
				{ name: 'Arya', house: 'Stark', age: '40' },
				{ name: 'Sansa', house: 'Stark', age: '40' },
				{ name: 'Cersei', house: 'Lannister', age: '40' },
				{ name: 'Jorah', house: 'Mormont', age: '40' },
			]
		};
	}

	onLoadMoreClicked() {
		// you can handle 'load more' logic here
		console.log('load more is clicked');
	}

	getSectionHeaderTitle(item) {
		return item.house;
	}

	renderHeader(headerKey, key) {
		return (
			<div key={key} style={{ backgroundColor: '#D3D3D3', color: '#0000FF' }}>
				House: {headerKey}
			</div>
		);
	}

	renderItem(item, key) {
		return (
			<div key={key}>
				<h3>Name: {item.name}<br/>Age: {item.age}</h3>
			</div>
		);
	}

	render() {
		const items = this.state.data;
		return (
			<div>
				<ReactAutoHeaderList
					items={items}
					totalItemCount={items.length}
					onLoadMore={this.onLoadMoreClicked}
					isFetching={false}
					getSectionHeaderTitle={this.getSectionHeaderTitle}
					renderItem={this.renderItem}
					renderHeader={this.renderHeader}
				/>
			</div>
		);
	}
};

ReactDOM.render(<App />, document.getElementById('app'));
