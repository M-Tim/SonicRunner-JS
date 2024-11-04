import k from "../kaplayCtx";

export function makeSonic(pos) {
    const sonic = k.add([
        k.sprite("sonic", { anim: "run" }),
        k.scale(4),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.body({ jumpForce: 1700 }), // à quel point le gameobject (ici sonic) va sauter lors de l'appel à this.jump()
        {
            setControls() {
                k.onButtonPress("jump", () => { // Si le bouton saut est pressé
                    if (this.isGrounded()) // Si sonic est sur une plateforme
                    {
                        // Faire attention, this est relatif au gameobject alors que k est relatif à la librairie kaplay en général
                        this.play("jump"); // play l'animation de saut
                        this.jump(); // Fait réellement sauter le gameobject (ici sauter)
                        k.play("jump", { volume: 0.5 }); // play le jump sound à 0.5/1 (soit 50%)
                    }
                })
            },
            setEvents() {
                this.onGround(() => { // S'execute dès que le sonic touche le sol
                    this.play("run"); // plays run animation
                });
            }
        },
    ]);
    return sonic;
}