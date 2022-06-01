class LevelReflex < ApplicationReflex
   def change_block_type
    id, row, block = element.dataset.level_id, element.dataset.layout_row.to_i, element.dataset.layout_block.to_i

    level = Level.find(id)

    if level.layout[row][block] == 'r'
      level.layout[row][block] = 'w'
    else
      level.layout[row][block] = 'r'
    end

    level.save!
   end

   def zmen_meno
     morph "#zmen_meno", 'nove meno'
   end
end