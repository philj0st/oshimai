//tell the renderer how to draw a player
const drawPlayer = (screen, player) => {
  screen.fillRect(
    player.position[0] - player.size.x / 2,
    player.position[1] - player.size.y / 2,
    player.size.x,
    player.size.y)
}

const drawBullet = (screen, bullet) => {
  screen.fillRect(
    bullet.position[0] - bullet.size.x / 2,
    bullet.position[1] - bullet.size.y / 2,
    bullet.size.x,
    bullet.size.y)
}


const render = (screen, state, size) => {
  screen.clearRect(0, 0, size.x, size.y)
  drawPlayer(screen, state.player)
  state.bullets.forEach(b => drawBullet(screen, b))
}

module.exports = render
