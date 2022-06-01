class TodoReflex < ApplicationReflex
  def pokus
    todo = Todo.find(element.data_todo_id)
    todo.toggle!(:done)
  end
end