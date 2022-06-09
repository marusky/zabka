# frozen_string_literal: true

class ApplicationReflex < StimulusReflex::Reflex

  def aco(value)
    library = Library.find_by(code: value)

    return @error = 'Knižnica s daným kódom neexistuje' unless library

    @level_id = library.levels.order(:position).first.id
  end
  # Put application-wide Reflex behavior and callbacks in this file. 
  #
  # Example:
  #
  #   # If your ActionCable connection is: `identified_by :current_user`
  #   delegate :current_user, to: :connection
  #
  # Learn more at: https://docs.stimulusreflex.com/reflexes#reflex-classes
end
