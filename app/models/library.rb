class Library < ApplicationRecord
  has_many :levels

  validates :title, presence: true
  validates :code, length: { is: 6 }
end
