import * as modlib from 'modlib'

import { APlayerBase } from './APlayerBase'

export class PlayerAI extends APlayerBase {
    makeMove() {
        console.log(`(AI) is making a move`)

        // modlib test
        modlib.ParseUI()
    }
}
