import kaplay from "kaplay";

const k = kaplay({
    // Résolution : 
    width: 1920,
    height: 1080,
    letterbox: true, // Pour s'assurer que le canva prend la bonne taille sur l'écran
    background: [0, 0, 0],
    global: false,
    touchToMouse: true, // Pour le rendre jouable sur PC ET mobile
    buttons: {
        jump: {
            keyboard: ["space", "up"],
            mouse: "left",
        },
    },
    debugKey: "d", // Touche à entrer pour aller en debug mod
    debug: true, // Le debug mod est activé (true), doit être désactivé (false) si le jeu est publié/terminé
});

export default k;