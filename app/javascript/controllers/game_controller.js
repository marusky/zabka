import ApplicationController from './application_controller.js'

export default class extends ApplicationController {
    static targets = [ "frog", "frogMoves", "jumpBtn" ]

    initialize() {
        const { initialRow, initialBlock, levelLayout } = this.frogTarget.dataset

        this.frog_position = [initialRow, initialBlock]
        this.levelLayout = JSON.parse(levelLayout)
        this.is_programming = this.element.dataset.levelType === 'programming'
        this.stamp_jump()
    }

    directKeyboard(e) {
        this.move(e.key)
    }

    directClick({ params: { where } }) {
        this.move(where.toString())
    }

    programmingKeyboard(e) {
        this.add_frog_move(e.key)
    }

    programmingClick({ params: { where } }) {
        this.add_frog_move(where)
    }

    jump() {
        const moves = Array.from(this.frogMovesTarget.childNodes).map((node) => node.innerText)

        this.jumpBtnTarget.disabled = true
        // this.jumpBtnTarget.innerText = 'jumping'

        moves.forEach((move, index) => {
            setTimeout(() => this.move(move), 300 * index)
        })

        setTimeout(() => {
            this.jumpBtnTarget.innerText = 'jump'
        }, 300 * moves.length)
    }

    reset() {
        this.initialize()
        this.resetLayout()
        this.jumpBtnTarget.disabled = false
    }

    removeMove(e) {
        e.target.remove()
    }

    // private

    resetLayout() {
        this.levelLayout.forEach((row, rowNum) => {
            row.forEach((oldBlock, blockNum) => {
                const blockDiv = document.getElementById(`block${rowNum}${blockNum}`)
                blockDiv.className = oldBlock
            })
        })
    }

    move(where) {
        this.handle_frog_move(where)
        if (this.is_level_passed()) this.handle_level_passed()
    }

    handle_frog_move(where) {
        const old_position = [...this.frog_position]

        switch(where) {
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

        this.stamp_jump(where)

    }

    stamp_jump(where) {
        if (this.levelLayout[this.frog_position[0]][this.frog_position[1]] !== 'j') {
            this.levelLayout[this.frog_position[0]][this.frog_position[1]] = 'j'
            const rockNode = document.getElementById(`block${this.frog_position[0]}${this.frog_position[1]}`)
            rockNode.className = 'j'
            rockNode.appendChild(this.frogTarget)

            if (!this.is_programming) this.add_frog_move(where)
        }
    }

    add_frog_move(where) {
        if ('12346789'.includes(where)) this.frogMovesTarget.innerHTML += `<div class="move" ${ this.is_programming ? 'data-action="click->game#removeMove"' : ''} >${where}</div>`;
    }

    is_level_passed() {
        return !this.levelLayout.some(row => row.includes('r'))
    }

    handle_level_passed() {
        // document.getElementById('level-passed').innerText = 'vyhral si'
    //    TODO reset by malo resetnut aj toto.
    }

    can_jump_there() {
        if (this.levelLayout.length <= this.frog_position[0]) return false

        const block = this.levelLayout[parseInt(this.frog_position[0])][parseInt(this.frog_position[1])]
        return block !== 'undefined' && block === 'r'
    }
}