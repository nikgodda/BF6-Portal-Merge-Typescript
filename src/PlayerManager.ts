import { ABasePlayer } from './Player/ABasePlayer'
import { HumanPlayer } from './Player/HumanPlayer'
import { AiPlayer } from './Player/AiPlayer'

export class PlayerManager {
    private players: Map<number, ABasePlayer> = new Map()

    createPlayer(player: mod.Player): ABasePlayer {
        const basePlayer: ABasePlayer = mod.GetSoldierState(
            player,
            mod.SoldierStateBool.IsAISoldier
        )
            ? new HumanPlayer(player)
            : new AiPlayer(player)

        this.players.set(basePlayer.playerId, basePlayer)
        return basePlayer
    }

    getPlayer(playerId: number): ABasePlayer | undefined {
        return this.players.get(playerId)
    }

    getAllPlayers(): ABasePlayer[] {
        return Array.from(this.players.values())
    }
}
