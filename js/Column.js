function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createColumn();

	function createColumn() {
		// COLUMNS COMPONENTS
		var column = $('<div class="column col-lg-4 col-md-12"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete btn-delete-style">Usuń kolumnę</button>');
		var columnAddCard = $('<button class="add-card btn btn-success">Dodaj kartę</button>');
		// EVENTS
		columnDelete.click(function() {
			self.deleteColumn();
		});
		// Add a note after clicking on the button
		columnAddCard.click(function(event) {
			var cardName = prompt("Wpisz nazwę karty");
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});
		// CONSTRUCTION COLUMN ELEMENTS
		column.append(columnTitle)
				.append(columnAddCard)
				.append(columnDelete)
				.append(columnCardList);
		// RETURN OF CREATED COLUMN
		return column;
	}
}
	
// COLUMN CLASS METHOD
Column.prototype = {
	createCard: function(card) {
		this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response) {
				self.element.remove();
			}
		});
	}
};