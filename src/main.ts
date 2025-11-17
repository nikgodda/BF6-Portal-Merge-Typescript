import * as modlib from 'modlib'

import { PlayerManager } from './PlayerManager'

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
