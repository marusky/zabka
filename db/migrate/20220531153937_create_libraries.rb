class CreateLibraries < ActiveRecord::Migration[6.1]
  def change
    create_table :libraries do |t|
      t.string :title, null: false
      t.string :code, null: false
      t.integer :teacher_id, foreign_key: true

      t.timestamps
    end
  end
end
