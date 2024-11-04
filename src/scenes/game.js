import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

export default function game() {
    k.setGravity(3100);

    // Voir fichier mainMenu.js
    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([
            k.sprite("chemical-bg"),
            k.pos(0, 0),
            k.scale(2),
            k.opacity(0.8),
            k.area()
        ]),
        k.add([
            k.sprite("chemical-bg"),
            k.pos(bgPieceWidth * 2, 0),
            k.scale(2),
            k.opacity(0.8),
            k.area()
        ]),
    ];

    const platformWidth = 1280;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(platformWidth * 4, 450), k.scale(4)]),
    ];

    const sonic = makeSonic(k.vec2(200, 745)); // Position de sonic
    sonic.setControls();
    sonic.setEvents();

    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });

    k.add([
        k.rect(1920, 300),
        k.opacity(0), // Le rend invisible
        k.area(), // k.area() correspond ici à une hitbox
        k.pos(0, 832),
        k.body({ isStatic: true }), // La gravité ne l'affectera pas car isStatic: true
    ]);

    k.onUpdate(() => {
        // Voir fichier mainMenu.js
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0)
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0)

        // for jump effect - VOIR VIDEO A 1:22:54 POUR UN PEU PLUS D EXPLICATIONS
        bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 65); // ici -sonic car on bouge le fond par rapport à la position de sonic
        bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 65); // on divise par 10 pour moins zoomer mais quand meme avoir une marge de saut pour bouger le fond (j'ai moins compris comment ça marchait, dans le sens pourquoi diviser la position y de sonic) et on enleve 50 pour creer un effet de saut PAS SUR DU TOUT DE CE QUE J ECRIS SUR CETTE LIGNE APRES AVOIR FAIT DES TESTS

        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        }
        platforms[0].move(-gameSpeed, 0)
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450)


    })
}