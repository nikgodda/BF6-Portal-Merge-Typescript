import { BasePlayer } from './BasePlayer'

export class HumanPlayer extends BasePlayer {
    makeMove() {
        console.log(`(human) is making a move`)
    }
}