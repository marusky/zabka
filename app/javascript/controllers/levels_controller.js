import { Controller } from "stimulus"

export default class extends Controller {
    static targets = [ "form", "layout" ]

    hello(){
        this.formTarget.classList.toggle('hide')
    }
}