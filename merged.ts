import * as modlib from 'modlib'

// -------- FILE: src\Player\APlayerBase.ts --------
abstract class APlayerBase {

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


// -------- FILE: src\Player\PlayerHuman.ts --------
class PlayerHuman extends APlayerBase {

    makeMove() {
        
        console.log(`(human) is making a move`)
    }
}

// -------- FILE: src\Player\PlayerAI.ts --------
class PlayerAI extends APlayerBase {

    makeMove() {
        
        console.log(`(AI) is making a move`)
    }
}

// -------- FILE: src\PlayerManager.ts --------
class PlayerManager {
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
    const player = playerManager.createPlayer(eventPlayer)

    console.log('PLAYER JOINED. ID: ', player.playerId)
}

// Triggered when player selects their class and deploys into game. Useful for any spawn/start logic.
export function OnPlayerDeployed(eventPlayer: mod.Player): void {
    const player = playerManager.getPlayer(mod.GetObjId(eventPlayer))

    if (player)
        mod.DisplayHighlightedWorldLogMessage(mod.Message(player.playerId))
}

// Triggered when a player is damaged, returns same variables as OnPlayerDied. Useful for custom on damage logic and updating custom UI.
export function OnPlayerDamaged(
    eventPlayer: mod.Player,
    eventOtherPlayer: mod.Player,
    eventDamageType: mod.DamageType,
    eventWeaponUnlock: mod.WeaponUnlock
): void {}

// Triggered on player death/kill, returns dying player, the killer, etc. Useful for updating scores, updating progression, handling any death/kill related logic.
export function OnPlayerDied(
    eventPlayer: mod.Player,
    eventOtherPlayer: mod.Player,
    eventDeathType: mod.DeathType,
    eventWeaponUnlock: mod.WeaponUnlock
): void {}

// Triggered when player leaves the game. Useful for clean up logic, team management, etc.
export function OnPlayerLeaveGame(eventNumber: number): void {}

export function OnGameModeEnding(): void {}

