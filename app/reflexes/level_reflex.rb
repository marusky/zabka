class LevelReflex < ApplicationReflex
  # after_reflex :show_level_error, only: :change_block_type

  def change_block_type
    id, row, block = element.data_level_id, element.data_layout_row.to_i, element.data_layout_block.to_i

    level = Level.find(id)

    return if level.frog[0].to_i == row && level.frog[1].to_i == block

    if level.layout[row][block] == 'r'
      level.layout[row][block] = 'w'
    else
      level.layout[row][block] = 'r'
    end

    level.save!
  end

  def change_frog_position(dataset)
    row, block = dataset['layoutRow'].to_i, dataset['layoutBlock'].to_i

    level = Level.find(element.data_level_id)
    level.frog = [row, block]

    level.save!
  end

  def zmen_meno
    morph "#zmen_meno", 'nove meno'
  end

  def update_layout
    id, type = element.data_level_id, element.data_type

    level = Level.find(element.data_level_id)

    case type
    when 'row+'
      level.layout << level.default_row if level.can_add_row?
    when 'row-'
      level.layout.pop if level.can_subtract_row?
    when 'col+'
      return unless level.can_add_col?

      level.layout.each do |row|
        row << Level.random_block
      end
    when 'col-'
      return unless level.can_subtract_col?

      level.layout.each do |row|
        row.pop
      end
    end

    level.save!
  end

  def show_level_error
    level = Level.find(element.data_level_id)

    morph "#error_field", 'Neda sa prejst ten level...' unless level.passable?
  end

  def sort(levels)
    levels.each do |data|
      Level.find(data['id']).update({ position: data['position'] })
    end

    morph :nothing
  end
end