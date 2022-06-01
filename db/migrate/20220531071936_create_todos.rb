class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.boolean :done
      t.integer :count

      t.timestamps
    end
  end
end
