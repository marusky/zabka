import ApplicationController from './application_controller.js'
import Sortable from 'sortablejs';

export default class extends ApplicationController {
    static targets = [ "form", "layout", "levelsList" ]

    connect() {
        super.connect();
        var el = document.getElementById('items');
        var sortable = Sortable.create(el);
    }

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

    pokus(e){
        console.log('hoifd')
    }

    sort(e) {
        let levels = Array.from(document.getElementsByClassName('level-row')).map((level, index) => {
            return {id: level.dataset.specificLevelId, position: index + 1}
        })

        this.stimulate('level#sort', levels)
    }
}