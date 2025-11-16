export abstract class BasePlayer {

    public player: mod.Player
    public playerId: number

    public kills: number = 0
    public deaths: number = 0
    public teamKills: number = 0

    constructor(player: mod.Player) {

        this.player = player
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