// Fait en partie grâce au tutoriel suivant : https://www.youtube.com/watch?v=EmMO0yQ7eeY&list=PL_QnQf5KYHyLqXcOgJL-MrpmodnxPOOkj&index=38
// Imports faits depuis le terminal : 
/* 
node.js doit être installé
npm create vite@latest .
npm install kaplay
npm run dev (pour run sur une page internet locale)
npm install kaplay@3001.0.0-alpha.21 (ou la version la plus récente) (pour le rendre utilisable sur mobile)
 */

import k from "./kaplayCtx";
import mainMenu from "./scenes/mainMenu";
import game from "./scenes/game";
import gameover from "./scenes/gameover";

k.loadSprite("chemical-bg", "graphics/chemical-bg.png"); // Importer des sprites, pas besoin de préciser "public/" pour le chemin grace à vite.svg
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png", { // Ici sonic est une spritesheet (utile pour faire des animations)
    sliceX: 8, // Nombre de frames dans une ligne
    sliceY: 2, // Nombre de frames dans une colonne
    anims: { // Ce qui va animer
        run: { from: 0, to: 7, loop: true, speed: 30 }, // Indices des différentes frames sur la spritesheet
        jump: { from: 8, to: 15, loop: true, speed: 100 },
    },
});
k.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1,
    anims: {
        spin: { from: 0, to: 15, loop: true, speed: 30 },
    },
});
k.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        run: { from: 0, to: 4, loop: true, speed: 30 }, // ligne perso ajoutée
    },
});
k.loadFont("mania", "fonts/mania.ttf");

k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");
k.loadSound("city", "sounds/city.mp3");
k.loadSound("metallic-madness", "sounds/jp_metallic_madness_zone_(present).mp3");

k.scene("main-menu", mainMenu); // N'appelle pas mainMenu mais rend main-menu celui qui est responsable d'appeler la fonction

k.scene("game", game); // On ajoute la scene du jeu (voir fichier game.js)

k.scene("gameover", gameover);

k.go("main-menu"); // Scene par défaut