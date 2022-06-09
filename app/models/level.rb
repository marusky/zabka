class Level < ApplicationRecord
  belongs_to :library

  enum control: {
    programming: 'programming',
    direct: 'direct',
  }

  def self.random_block
    %w[w r].shuffle.first
  end

  def default_row
    row = []

    layout[0]&.size&.times do
      row << Level.random_block
    end

    row
  end

  def can_add_row?
    layout.size < 5
  end

  def can_subtract_row?
    layout.size > 3 && layout.size > frog[0].to_i + 1
  end

  def can_add_col?
    layout[0]&.size < 7
  end

  def can_subtract_col?
    layout[0]&.size > 4 && layout[0]&.size > frog[1].to_i + 1
  end

  def self.default_layout

    [
      ['r', 'r', 'r', 'r',],
      ['r', 'r', 'r', 'r',],
      ['r', 'r', 'r', 'r',]
    ]
  end

  def self.default_frog
    [0, 0]
  end

  def self.default_attributes
    {
      layout: default_layout,
      frog: default_frog
    }
  end

  def next_position
    Library.find(library_id).levels.count + 1
  end

  def frog_here?(row, block)
    row == frog[0].to_i && block == frog[1].to_i
  end

  def passable?
    layout.each_with_index do |row, row_index|
      row.each_with_index do |block, block_index|
        next if block == 'w'

        water_count = 0
        rock_count = 0

        [block_index - 1, block_index, block_index + 1].each do |block_i|
          [row_index - 1, row_index, row_index + 1].each do |row_i|
            next if (row_i == row_index && block_i == block_index) || block_i < 0 || row_i < 0

            rock_count += 1 if layout[row_i][block_i] == 'r'
            water_count += 1 if layout[row_i][block_i] == 'w'

          end
        end

        return rock_count > 0
      end
    end

    true
  end
end
