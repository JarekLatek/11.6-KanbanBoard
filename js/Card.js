function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createCard();

	function createCard() {
		// CARD COMPONENTS
		var card = $('<li class="card"></li>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		// EVENT
		cardDeleteBtn.click(function() {
			self.removeCard();
		});
		// CONSTRUCTION CARD ELEMENTS
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		// RETURN OF CREATED CARD
		return card;
	}
}

// CARD CLASS METHOD
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {
				self.element.remove();
			}
		});
	}
};