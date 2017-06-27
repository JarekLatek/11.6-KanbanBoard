var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '1942',
	'X-Auth-Token': 'e48603c5667a2c6b1c9aabc12ffe2d70'
};
// requests
$.ajaxSetup({
	headers: myHeaders
});
$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});
// columns creation
function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
	});
}
function setupCards(col, cards) {
	cards.forEach(function (card) {
		var currentCard = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(currentCard);
	});
}