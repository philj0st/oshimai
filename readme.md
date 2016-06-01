# Oshimai :octopus::anchor::boat:
<a href="http://recurse.com"><img src="https://cloud.githubusercontent.com/assets/2883345/11325206/336ea5f4-9150-11e5-9e90-d86ad31993d8.png" alt="made at RC" style="height:20px" /></a>
#### installing
`git clone` and `npm install dev` then run with `npm start`

#### questions to my dearest source-code reader
- what's better: having vector reducer called from player reducer or just importing a vector lib in player reducer?
- what's better: render on store changes or on requestAnimationFrame()? maybe on store's subscribe function?
- position: [15,30] vs position: {x:15, y:30} vs victor.js

#### Roadmap
implement multiplayer with circles on canvas then replace renderer with pixi.js sprites and keep circles as hitboxes.

- [x] revamp player datastructure to support multiple players
- [x] circles on canvas
- [x] decrease momentum over time
- [ ] either fake orientation laggin behind momentum one degree at a frame or implement real angular motion :boat:
- [ ] have player orientation/rotation figured out. (rotate vectors before applying them)
- [x] revamp movement with rotation
- [ ] use rounded values so rotateVecByDeg([1,0], 90) doesn't result in [6.123233995736766e-17, 1]. - or find another datastructure that is more performant.
- [ ] shoot sideways
- [x] local multiplayer
- [ ] WebRTC multiplayer
- [ ] pixi.js sprites

#### ideas for future implementations
- WebRTC (polyfill WebSockets)
- GamepadAPI
- WebWorkers
- victor.js *A JavaScript 2D vector maths library for Node.js and the browser.*
- Pixi.js *2D webGL renderer with canvas fallback*
- current: basically adding a vector the the ships movement if ship is located i a certain area.
- whirlpools: fun thing to implement with vectors
- let 2 players control 1 ship and have their device's rowing gyro/motion as control for one side of the rows

#### used ES6/ES7 Features
- Spread Operator in Arrays and Objects
- Object Destructuring
- Object Literal Property Value Shorthand
- Modules (only import)
- Arrow Functions

#### Performance

##### Path2D objects
As we have seen in the last example, there can be a series of paths and drawing commands to draw objects onto your canvas. To simplify the code and to improve performance, the Path2D object, available in recent versions of browsers, **lets you cache or record these drawing commands**. You are able to play back your paths quickly.
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

##### Collision Performance
While some of these algorithms for collision detection are simple enough to calculate, it can be a waste of cycles to test *every* entity with every other entity. Usually games will split collision into two phases, broad and narrow.

Broad Phase

Broad phase should give you a list of entities that *could* be colliding. This can be implemented with a spacial data structure that will give you a rough idea of where the entity exists and what exist around it. Some examples of spacial data structures are Quad Trees, R-Trees or a Spacial Hashmap.

Narrow Phase

When you have a small list of entities to check you will want to use a narrow phase algorithm (like the ones listed above) to provide a certain answer as to whether there is a collision or not.
[MDN](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)

#### glossary
reducer - returns a new state given a state and an action
