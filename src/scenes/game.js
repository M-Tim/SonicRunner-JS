import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";

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

    let score = 0;
    let scoreMultiplier = 0;

    const scoreText = k.add([
        k.text("SCORE : 0", { font: "mania", size: 72 }),
        k.pos(20, 20)
    ]);

    // Création d'un sonic dans la scene game
    const sonic = makeSonic(k.vec2(200, 745)); // Position de sonic
    sonic.setControls();
    sonic.setEvents();
    sonic.onCollide("enemy", (enemy) => { // Si sonic touche un enemy, on execute le bloc suivant (soit appel à cette fonction) avec en parametre le tag entré (le parametre et le tag peuvent avoir des libelés différents)
        if (!sonic.isGrounded()) // Si sonic ne touche pas le sol
        {
            k.play("destroy", { volume: 0.5 }); // On play le destroy sound à 50%
            k.play("hyper-ring", { volume: 0.5 });
            k.destroy(enemy); // L'ennemi est détruit
            sonic.play("jump"); // Sonic ressaute automatiquement sur l'ennemi (extra-jump)
            sonic.jump(); // On remet le son du saut
            scoreMultiplier += 1; // Si sonic saute sur un ennemie, le scoreMultiplier est incrémenté tant que sonic ne retouche pas le sol
            score += 5 * scoreMultiplier; // On ajoute au score, 5*le nombre de fois que sonic saute sur un ennemie sans retoucher le sol
            scoreText.text = `SCORE : ${score}`; // On affiche le score recalculé à chaque fois
            if (scoreMultiplier === 1) // Si un premier ennemi est battu
                sonic.ringCollectUI.text = "+5";
            if (scoreMultiplier > 1) // Si on détruit plus d'un ennemi avant de retomber
                sonic.ringCollectUI.text = `x${scoreMultiplier}`;
            k.wait(1, () => sonic.ringCollectUI.text = "");
            return;
        }

        // Sinon
        k.play("hurt", { volume: 0.5 }); // play hurt sound
        // TODO (selon vidéo)
        k.go("gameover"); // On va sur la scene gameover
    });


    sonic.onCollide("ring", (ring) => {
        k.play("ring", { volume: 0.5 });
        k.destroy(ring);
        score++;
        scoreText.text = `SCORE : ${score}`; // Modifie le contenu du texte de scoreText en utilisant la variable score
        sonic.ringCollectUI.text = "+1"; // On change le texte de ringCollectUI
        k.wait(1, () => sonic.ringCollectUI.text = "") // On laisse le texte pendant 1 seconde avant de le mettre à vide
    });

    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });

    // Fonction de création d'un motobug dans la scene game
    const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773));
        motobug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0) // Tant que la gameSpeed est en dessous de 3000, le motobug se déplace à la vitesse du jeu +300 en x (- pour qu'il aille à gauche car les x avancent vers la droite de l'écran), et 0 en y pour ne pas qu'il monte ou descende
                return; // On renvoi ce motobug donc la suite n'est pas executé (comme un break)
            }
            motobug.move(-gameSpeed, 0); // Sinon le motobug ne bouge pas
        });
        // Lorsque le motobug quitte l'écran
        motobug.onExitScreen(() => {
            if (motobug.pos.x < 0)
                k.destroy(motobug); // On détruit le motobug
        });

        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnMotoBug); // Récursif : on attend un temps random (défini à la ligne du dessus) avant de recréer un motobug
    };
    spawnMotoBug();

    const spawnRing = () => {
        const ring = makeRing(k.vec2(1950, 745));
        ring.onUpdate(() => {
            ring.move(-gameSpeed, 0);
        });
        ring.onExitScreen(() => {
            if (ring.pos.x < 0)
                k.destroy(ring);
        });

        const waitTime = k.rand(0.5, 3);
        k.wait(waitTime, spawnRing);
    };
    spawnRing();

    k.add([
        k.rect(1920, 300),
        k.opacity(0), // Le rend invisible
        k.area(), // k.area() correspond ici à une hitbox
        k.pos(0, 832),
        k.body({ isStatic: true }), // La gravité ne l'affectera pas car isStatic: true
    ]);

    k.onUpdate(() => {
        // Si sonic touche le sol, on réinitialise le combo à 0
        if (sonic.isGrounded())
            scoreMultiplier = 0;

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