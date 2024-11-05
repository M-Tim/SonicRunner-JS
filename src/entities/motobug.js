import k from "../kaplayCtx";

export function makeMotobug(pos) {
    return k.add([
        k.sprite("motobug", { anim: "run" }), // animation récupéré du motobug du main.js
        k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }), // On redéfini la hitbox (ici, position de la hitbox à -5,0 par rapport au personnage et rectangle de la hitbox à 32*32)
        k.scale(4),
        k.anchor("center"),
        k.pos(pos),
        k.offscreen(), // Pour check si l'ennemi est en dehors de l'écran
        "enemy", // Le tag pour définir le gameobject
    ]);
};