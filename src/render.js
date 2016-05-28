//tell the renderer how to draw a player
const drawPlayer = (screen, player) => {
  screen.fillRect(
    player.position.x - player.size.x / 2,
    player.position.y - player.size.y / 2,
    player.size.x,
    player.size.y)
}

const drawBullet = (screen, bullet) => {
  screen.fillRect(
    bullet.position.x - bullet.size.x / 2,
    bullet.position.y - bullet.size.y / 2,
    bullet.size.x,
    bullet.size.y)
}


const render = (screen, state, size) => {
  screen.clearRect(0, 0, size.x, size.y)
  state.players.forEach(p => drawPlayer(screen, p))
  state.bullets.forEach(b => drawBullet(screen, b))
}

module.exports = render
