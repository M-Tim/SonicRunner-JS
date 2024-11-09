import k from "../kaplayCtx";

export default function gameover(citySfx) {
    citySfx.paused = true; // Met le son en pause
    let bestScore = k.getData("best-score"); // On déclare un attribut bestScore
    const currentScore = k.getData("current-score");

    const rankGrades = ["F", "E", "D", "C", "B", "A", "S"];
    const rankValues = [10, 25, 50, 75, 100, 150, 300];

    let currentRank = "F";
    let bestRank = "F";

    for (let i = 0; i < rankValues.length; i++) {
        if (rankValues[i] < currentScore) // Si le score est plus grand que le score du rang, on attribue ce rang
        {
            currentRank = rankGrades[i];
        }

        if (rankValues[i] < bestScore) // Si le meilleur score est au dessus du score minimal rang, on met le meilleur rang à ce rang
        {
            bestRank = rankGrades[i];
        }
    }

    if (bestScore < currentScore) // Si le record est en dessous du score
    {
        k.setData("best-score", currentScore); // On met le score actuel dans le score du record
        bestScore = currentScore; // On attribue le score actuel au record
        bestRank = currentRank; // On attribue le rang actuel au record
    }

    // Copié collé à partir du github : 
    k.add([
        k.text("GAME OVER", { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 300),
    ]);
    k.add([
        k.text(`BEST SCORE : ${bestScore}`, {
            font: "mania",
            size: 64,
        }),
        k.anchor("center"),
        k.pos(k.center().x - 400, k.center().y - 200),
    ]);
    k.add([
        k.text(`CURRENT SCORE : ${currentScore}`, {
            font: "mania",
            size: 64,
        }),
        k.anchor("center"),
        k.pos(k.center().x + 400, k.center().y - 200),
    ]);

    const bestRankBox = k.add([
        k.rect(400, 400, { radius: 4 }), // On donne au rectangle une taille et un radius pour l'arondir
        k.color(0, 0, 0), // On donne une couleur (ici blanc) au rectangle (le fond du rectangle sera alors blanc)
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])), // On met la bordure à epaisseur 6 et on lui donne une couleur en rgb
        k.pos(k.center().x - 400, k.center().y + 50) // Ne pas oublier de mettre une position dès la création d'un nouveau gameobject
    ]);

    bestRankBox.add([ // On fait un enfant de bestRankBox
        k.text(bestRank, { font: "mania", size: 100 }), // On place un texte
        k.anchor("center"), // On le met au centre du rectangle (soit au centre de bestRankBox)
    ]);

    const currentRankBox = k.add([
        k.rect(400, 400, { radius: 4 }),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x + 400, k.center().y + 50)
    ]);

    currentRankBox.add([
        k.text(currentRank, { font: "mania", size: 100 }),
        k.anchor("center"),
    ]);

    k.wait(1, () => {
        k.add([
            k.text("Press Spae/Click/Touch to Play Again", {
                font: "mania",
                size: 64
            }),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y + 350)
        ]);
        k.onButtonPress("jump", () => k.go("game"));
    });
}