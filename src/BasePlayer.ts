export abstract class BasePlayer {

    playerId: number

    kills: number = 0
    deaths: number = 0
    teamKills: number = 0

    constructor(player: mod.Player) {
        this.playerId = mod.GetObjId(player)
    }

    abstract makeMove(): void

    addKill() {

        this.kills += 1
    }

    addDeath() {

        this.deaths += 1
    }

    addTeamKill() {

        this.teamKills += 1
    }
}
