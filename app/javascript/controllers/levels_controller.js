import ApplicationController from './application_controller.js'

export default class extends ApplicationController {
    static targets = [ "form", "layout" ]

    hello(){
        this.formTarget.classList.toggle('hide')
    }

    drag(e){
        e.dataTransfer.setData('text', e.target.id)
    }

    on_drag_over(e){
        e.preventDefault()
    }

    drop(e){
        e.preventDefault()
        const id = e.dataTransfer.getData('text')
        e.target.appendChild(document.getElementById(id))
        this.stimulate('Level#change_frog_position', e.target.dataset)
    }
}