class Level < ApplicationRecord
  belongs_to :library

  def self.default_layout
    [
      ['r', 'r', 'r', 'r', 'r'],
      ['r', 'r', 'r', 'r', 'r'],
      ['r', 'r', 'r', 'r', 'r'],
      ['r', 'r', 'r', 'r', 'r'],
      ['r', 'r', 'r', 'r', 'r']
    ]
  end
end
