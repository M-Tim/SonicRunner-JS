import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

// Run lorsqu'on appelle une scene
export default function mainMenu() {
    // S'il n'y a pas encore de record, initialiser à 0
    if (!k.getData("best-score"))
        k.setData("best-score", 0);

    // Lorsque la touche du saut est pressé, run la fonction k.go("game")
    k.onButtonPress("jump", () => k.go("game"));

    const bgPieceWidth = 1920;
    const bgPieces = [
        // Creation d'un gameobject en ajoutant des components
        k.add([
            k.sprite("chemical-bg"),
            k.pos(0, 0),
            k.scale(2), // Pour le rendre 2 fois plus grand car la taille de l'image initiale est 2 fois trop petite 
            k.opacity(0.8),
            k.area() // Pour voir où est notre gameobject (à retirer si pas nécessaire, est surtout utile pour debug)
        ]),
        k.add([
            k.sprite("chemical-bg"),
            k.pos(bgPieceWidth * 2, 0),
            k.scale(2),
            k.opacity(0.8),
            k.area()
        ]), // deuxieme ligne pour placer une autre image juste à droite de la premiere (d'où la position x à la taille de l'image et *2 car on a augmenté le scale de l'image de 2)
    ];

    const platformWidth = 1280;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(platformWidth * 4, 450), k.scale(4)]),
    ];

    k.add([
        k.text("SONIC RING RUN", { font: "mania", size: 96 }),
        k.pos(k.center().x, 200), // Pour centrer le texte en x et le placer en haut de l'écran en y
        k.anchor("center") // Pour centrer le point anchor (point d'ancrage du sprite / zone de texte)
    ]);

    k.add([
        k.text("Press Space / Click / Touch to Play", { font: "mania", size: 32 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 200),
    ]);

    makeSonic(k.vec2(200, 745));

    // Boucle qui va run tout le long du jeu
    k.onUpdate(() => {
        // Si la deuxieme image commence à sortie de l'arriere plan, on déplace la première image (celle à gauche) à droite de la seconde pour créer un effet de scroll
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        // Simule un mouvement de scroll (la premiere image se déplace à -100 en coordonnées, la seconde image se replace juste à droite de la première)
        bgPieces[0].move(-100, 0)
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0)


        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
            platforms.push(platforms.shift());
        }
        platforms[0].move(-4000, 0)
        platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450)
    });
}