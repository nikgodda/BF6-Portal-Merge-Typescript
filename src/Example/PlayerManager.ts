import { APlayerBase } from './Player/APlayerBase'
import { PlayerHuman } from './Player/PlayerHuman'
import { PlayerAI } from './Player/PlayerAI'

export class PlayerManager {
    private players: Map<number, APlayerBase> = new Map()

    createPlayer(player: mod.Player): APlayerBase {
        const basePlayer: APlayerBase = mod.GetSoldierState(
            player,
            mod.SoldierStateBool.IsAISoldier
        )
            ? new PlayerHuman(player)
            : new PlayerAI(player)

        this.players.set(basePlayer.playerId, basePlayer)
        return basePlayer
    }

    getPlayer(playerId: number): APlayerBase | undefined {
        return this.players.get(playerId)
    }

    getAllPlayers(): APlayerBase[] {
        return Array.from(this.players.values())
    }
}
