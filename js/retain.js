window.onload = function(){

	var model = {
		init: function() {
			if (!localStorage.notes) {
				localStorage.notes = JSON.stringify([]);
			}
		},
		add: function(obj) {
			var data = JSON.parse(localStorage.notes);
			data.push(obj);
			localStorage.notes = JSON.stringify(data);
		},
		getAllNotes: function() {
			return JSON.parse(localStorage.notes);
		}
	};


	var octopus = {
		addNewNote: function(noteStr, num) {
			model.add({
				content: noteStr,
				date: num
			});
			view.render();
		},

		getNotes: function() {
			return model.getAllNotes().reverse();
		},

		init: function() {
			model.init();
			view.init();
		}
	};


	var view = {
		init: function() {
			this.noteList = document.querySelector('#notes');
			var newNoteForm = document.querySelector('#new-note-form');
			var newNoteContent = document.querySelector('#new-note-content');
			newNoteForm.addEventListener('submit', function(e){
				var date = Date.now();
				octopus.addNewNote(newNoteContent.value, date);
				newNoteContent.value = '';
				e.preventDefault();
			});
			view.render();		},
		render: function(){
			var htmlStr = '';
			octopus.getNotes().forEach(function(note){
				htmlStr += `<li class="note">${note.content}
				${note.date}</li>`;
			});
			this.noteList.innerHTML = htmlStr;
		}
	};

	octopus.init();
};