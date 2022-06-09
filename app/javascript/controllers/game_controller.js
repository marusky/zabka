import ApplicationController from './application_controller.js'

export default class extends ApplicationController {
    static targets = [ "frog" ]

    connect() {
        super.connect();
        const { initialRow, initialBlock, levelLayout } = this.frogTarget.dataset

        this.frog_position = [initialRow, initialBlock]
        this.levelLayout = JSON.parse(levelLayout)
        this.stamp_jump()
    }

    move(e) {
        this.handle_frog_move(e.key)
        if (this.is_level_passed()) this.handle_level_passed()
    }

    // private

    handle_frog_move(key) {
        const old_position = [...this.frog_position]

        switch(key) {
            case '9':
                if (parseInt(this.frog_position[0]) > 0) {
                    this.frog_position[0] = (parseInt(this.frog_position[0]) - 1).toString()
                    this.frog_position[1] = (parseInt(this.frog_position[1]) + 1).toString()
                    if (!this.can_jump_there()) {
                        this.frog_position = [...old_position]
                    }
                }
                break;
            case '6':
                this.frog_position[1] = (parseInt(this.frog_position[1]) + 1).toString()
                if (!this.can_jump_there()) {
                    this.frog_position = [...old_position]
                }
                break;
            case '3':
                this.frog_position[0] = (parseInt(this.frog_position[0]) + 1).toString()
                this.frog_position[1] = (parseInt(this.frog_position[1]) + 1).toString()
                if (!this.can_jump_there()) {
                    this.frog_position = [...old_position]
                }
                break;
            case '2':
                this.frog_position[0] = (parseInt(this.frog_position[0]) + 1).toString()
                if (!this.can_jump_there()) {
                    this.frog_position = [...old_position]
                }
                break;
            case '1':
                if (parseInt(this.frog_position[1]) > 0) {
                    this.frog_position[0] = (parseInt(this.frog_position[0]) + 1).toString()
                    this.frog_position[1] = (parseInt(this.frog_position[1]) - 1).toString()
                    if (!this.can_jump_there()) {
                        this.frog_position = [...old_position]
                    }
                }
                break;
            case '4':
                if (parseInt(this.frog_position[1]) > 0) {
                    this.frog_position[1] = (parseInt(this.frog_position[1]) - 1).toString()
                    if (!this.can_jump_there()) {
                        this.frog_position = [...old_position]
                    }
                }
                break;
            case '7':
                if (parseInt(this.frog_position[0]) > 0 && parseInt(this.frog_position[1]) > 0) {
                    this.frog_position[0] = (parseInt(this.frog_position[0]) - 1).toString()
                    this.frog_position[1] = (parseInt(this.frog_position[1]) - 1).toString()
                    if (!this.can_jump_there()) {
                        this.frog_position = [...old_position]
                    }
                }
                break;
            case '8':
                if (parseInt(this.frog_position[0]) > 0) {
                    this.frog_position[0] = (parseInt(this.frog_position[0]) - 1).toString()
                    if (!this.can_jump_there()) {
                        this.frog_position = [...old_position]
                    }
                }
                break;

        }

        this.stamp_jump()
    }

    stamp_jump() {
        if (this.levelLayout[this.frog_position[0]][this.frog_position[1]] !== 'j') {
            this.levelLayout[this.frog_position[0]][this.frog_position[1]] = 'j'
            const rockNode = document.getElementById(`block${this.frog_position[0]}${this.frog_position[1]}`)
            rockNode.className = 'j'
            rockNode.appendChild(this.frogTarget)
        }
    }

    is_level_passed() {
        return !this.levelLayout.some(row => /[wr]/.test(row))
    }

    handle_level_passed() {
        document.getElementById('level-passed').innerText = 'vyhral si'
    }

    can_jump_there() {
        if (this.levelLayout.length <= this.frog_position[0]) return false

        const block = this.levelLayout[parseInt(this.frog_position[0])][parseInt(this.frog_position[1])]
        return block !== 'undefined' && block === 'r'
    }
}