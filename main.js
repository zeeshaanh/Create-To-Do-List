var list = {
    todos: [],
    addList: function(toDoText) {
        this.todos.push({
            toDoText: toDoText,
            completed: false
        })
    },
    changeList: function(position, toDoText) {
        this.todos[position].toDoText = toDoText
    },
    deleteList: function(position) {
        this.todos.splice(position, 1)
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed
    },
    toggleAll: function() {
        var totalTodo = this.todos.length;
        var completedTodo = 0;
    
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodo++;
            }
        });

        this.todos.forEach(function(todo) {
            if(completedTodo === totalTodo) {
                todo.completed = false;
            } else {
                todo.completed = true; 
            }
        }); 
    }
};   


var handlers = {
    addList: function() {
        var addText = document.getElementById('addText');
        list.addList(addText.value);
        addText.value = ''; 
        view.displayList();
    },
    changeList: function() {
        var changeListPosition = document.getElementById('changeListPosition');
        var changeListText = document.getElementById('changeListText');
        list.changeList(changeListPosition.valueAsNumber, changeListText.value);
        changeListPosition.value = '';
        changeListText.value = '';
        view.displayList();
    },
    deleteList: function(position) {
        list.deleteList(position);
        view.displayList();
    },
    toggleCompleted: function() {
        var toggleListPosition = document.getElementById('toggleListPosition');
        list.toggleCompleted(toggleListPosition.valueAsNumber)
        toggleListPosition.value = '';
        view.displayList();
    },
    toggleAll: function() {
        list.toggleAll();
        view.displayList(); 
},
}


var view = {
    displayList: function() {
        var listUl = document.querySelector('ul');
        listUl.innerHTML = '';

        




        for (var i = 0; i < list.todos.length; i++) {
            var listLi = document.createElement('li');
            var todoTextWithCompletion = ' '; 
            var todoo = list.todos[i];

            if(todoo.completed === true) {
                todoTextWithCompletion = '(x) ' +  todoo.toDoText;
            } else {
                todoTextWithCompletion = '( ) ' +  todoo.toDoText;
            }

            listLi.id = i;
            listLi.textContent = todoTextWithCompletion
            listLi.appendChild(this.createDeleteButton());
            listUl.appendChild(listLi); 
        }
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = ' Delete ';
        deleteButton.className = ' deleteButton ';
        return deleteButton;
    },
    setUpEventListeners: function() {

        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) { 

        var elementClicked = event.target;
    
            if(elementClicked.className === ' deleteButton ') {
                handlers.deleteList(parseInt(elementClicked.parentNode.id));  
            }
        });
    }
};

view.setUpEventListeners();