import { Controller } from 'stimulus'
import StimulusReflex from 'stimulus_reflex'

/* This is your ApplicationController.
 * All StimulusReflex controllers should inherit from this class.
 *
 * Example:
 *
 *   import ApplicationController from './application_controller'
 *
 *   export default class extends ApplicationController { ... }
 *
 * Learn more at: https://docs.stimulusreflex.com
 */
export default class extends Controller {
  static targets = [ "code", "error" ]
  connect () {
    StimulusReflex.register(this)
  }

  openLibrary () {
    const value = this.codeTarget.value
    if (value.length === 6) {
      this.stimulate('application#aco', value)
    } else {
      this.errorTarget.innerText = 'Kód musí byť dĺžky 6-znakov.'
    }
  }



  /* Application-wide lifecycle methods
   *
   * Use these methods to handle lifecycle concerns for the entire application.
   * Using the lifecycle is optional, so feel free to delete these stubs if you don't need them.
   *
   * Arguments:
   *
   *   element - the element that triggered the reflex
   *             may be different than the Stimulus controller's this.element
   *
   *   reflex - the name of the reflex e.g. "Example#demo"
   *
   *   error/noop - the error message (for reflexError), otherwise null
   *
   *   reflexId - a UUID4 or developer-provided unique identifier for each Reflex
   */

  beforeReflex (element, reflex, noop, reflexId) {
    // document.body.classList.add('wait')
  }

  reflexSuccess (element, reflex, noop, reflexId) {
    // show success message
  }

  reflexError (element, reflex, error, reflexId) {
    // show error message
  }

  reflexHalted (element, reflex, error, reflexId) {
    // handle aborted Reflex action
  }

  afterReflex (element, reflex, noop, reflexId) {
    const id = element.dataset.levelId
    if (id === undefined) return

    window.location.replace(`${window.location.href}levels/${id}`);

    // document.body.classList.remove('wait')
  }

  finalizeReflex (element, reflex, noop, reflexId) {
    // all operations have completed, animation etc is now safe
  }
}
