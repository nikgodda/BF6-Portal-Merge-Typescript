import { BasePlayer } from './BasePlayer'
import { HumanPlayer } from './HumanPlayer'
import { AiPlayer } from './AiPlayer'

export class PlayerManager {
    private players: Map<number, BasePlayer> = new Map()

    createPlayer(player: mod.Player): BasePlayer {
        const basePlayer: BasePlayer = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier) ? new HumanPlayer(player) : new AiPlayer(player)

        this.players.set(basePlayer.playerId, basePlayer)
        return basePlayer
    }

    getPlayer(playerId: number): BasePlayer | undefined {
        return this.players.get(playerId)
    }

    getAllPlayers(): BasePlayer[] {
        return Array.from(this.players.values())
    }
}