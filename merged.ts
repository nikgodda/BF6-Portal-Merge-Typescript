// @ts-ignore
import * as modlib from 'modlib'

// -------- FILE: src\BasePlayer.ts --------
abstract class BasePlayer {

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


// -------- FILE: src\HumanPlayer.ts --------
class HumanPlayer extends BasePlayer {

    makeMove() {
        
        console.log(`(human) is making a move`)
    }
}

// -------- FILE: src\AiPlayer.ts --------
class AiPlayer extends BasePlayer {

    makeMove() {
        
        console.log(`(AI) is making a move`)
    }
}

// -------- FILE: src\PlayerManager.ts --------
class PlayerManager {
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

// -------- FILE: src\main.ts --------

const playerManager = new PlayerManager()

// Triggered on main gamemode start/end. Useful for game start setup and cleanup.
export async function OnGameModeStarted() {

    console.log(Date.now())

    // modlib test
    modlib.ParseUI()
}

// Triggered when player joins the game. Useful for pregame setup, team management, etc.
export function OnPlayerJoinGame(eventPlayer: mod.Player): void {

    const jsPlayer = playerManager.createPlayer(eventPlayer)

    console.log(jsPlayer.playerId)

}

// Triggered when player selects their class and deploys into game. Useful for any spawn/start logic.
export function OnPlayerDeployed(eventPlayer: mod.Player): void {

    const jsPlayer = playerManager.getPlayer(mod.GetObjId(eventPlayer))

    if (jsPlayer)
        mod.DisplayHighlightedWorldLogMessage(mod.Message(jsPlayer.playerId))

}

// Triggered when a player is damaged, returns same variables as OnPlayerDied. Useful for custom on damage logic and updating custom UI.
export function OnPlayerDamaged(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock): void { }

// Triggered on player death/kill, returns dying player, the killer, etc. Useful for updating scores, updating progression, handling any death/kill related logic.
export function OnPlayerDied(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock): void { }

// Triggered when player leaves the game. Useful for clean up logic, team management, etc.
export function OnPlayerLeaveGame(eventNumber: number): void { }

export function OnGameModeEnding(): void { }

