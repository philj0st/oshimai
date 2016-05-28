//tell the renderer how to draw a player
// const drawPlayer = (screen, player) => {
//   screen.fillRect(
//     player.position.x - player.size.x / 2,
//     player.position.y - player.size.y / 2,
//     player.size.x,
//     player.size.y)
// }
const drawPlayer = (screen, player) => {
      let { radius } = player
      let { x, y } = player.position
      let startAngle = 1.3 * Math.PI;
      let endAngle = 1.7 * Math.PI;
      let counterClockwise = true;

      screen.beginPath();
      screen.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      screen.lineWidth = 4;

      // line color
      screen.strokeStyle = 'red';
      screen.stroke()
      screen.beginPath()
      screen.arc(x, y, radius, 0, Math.PI*2, true)
      screen.fill()
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
