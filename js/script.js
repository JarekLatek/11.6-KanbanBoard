$(function() {
	function randomString() {
		var chars = '0123456789abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var str = '';
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			// COLUMNS COMPONENTS
			var $column = $('<div>').addClass('column col-lg-4 col-md-12');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete btn-delete-style').text('Delete column');
			var $columnAddCard = $('<button>').addClass('add-card btn btn-success').text('Add a card...');
			// EVENTS
			$columnDelete.click(function() {
				self.removeColumn();
			});
			// Add a note after clicking on the button
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});
			// CONSTRUCTION COLUMN ELEMENTS
			$column.append($columnTitle)
					.append($columnAddCard)
					.append($columnDelete)
					.append($columnCardList);
			// RETURN OF CREATED COLUMN
			return $column;
		}
	}
		
	// COLUMN CLASS METHOD
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			// CARD COMPONENTS
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');
			// EVENT
			$cardDelete.click(function() {
				self.removeCard();
			});
			// CONSTRUCTION CARD ELEMENTS
			$card.append($cardDelete)
					.append($cardDescription);
			// RETURN OF CREATED CARD
			return $card;
		}
	}

	// CARD CLASS METHOD
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
	$('.create-column').click(function() {
		var name = prompt('Enter column name');
		var column = new Column(name);
		board.addColumn(column);
	});

	// COLUMNS CREATION
	var todoColumn = new Column('To Do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE TABLE
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// NEW CARDS SPECIMEN CREATION
	var card1 = new Card('New Task');
	var card2 = new Card('Create Kanban boards');

	// ADDING CARDS TO THE COLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});