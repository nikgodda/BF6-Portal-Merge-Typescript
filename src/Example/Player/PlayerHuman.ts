import { APlayerBase } from './APlayerBase'

export class PlayerHuman extends APlayerBase {
    makeMove() {
        console.log(`(human) is making a move`)
    }
}
