class CreateLevels < ActiveRecord::Migration[6.1]
  def change
    create_table :levels do |t|
      t.string :title, null: false
      t.string :control, null: false
      t.text :frog, array: true, default: []
      t.text :layout, array: true, default: []
      t.integer :position
      t.integer :library_id, foreign_key: true

      t.timestamps
    end
  end
end
