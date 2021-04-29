(function () {
    "use strict";

    window.addEventListener("load", function () {
        console.log("Ready");

        // TIMER SECTION
        let animation = {
            animationFrameId: "",
            elements: {
                sprite: document.getElementById("requestanimationframe_sprite"),
            },
            sprite: {
                lastTime: 0,
                currentStep: 0,
                totalSteps: 6,
                width: 256,
            },
        };

        startAnimation();

        function startAnimation() {
            animation.sprite.lastTime = Date.now();
            animation.animationFrameId = requestAnimationFrame(updateAnimation);
        }

        function updateAnimation() {
            const timestamp = Date.now();
            if (timestamp - animation.sprite.lastTime >= 1000) {
                animation.sprite.lastTime = timestamp;
                animation.elements.sprite.style.backgroundPosition =
                    animation.sprite.currentStep * animation.sprite.width +
                    "px";

                animation.sprite.currentStep--;
                if (animation.sprite.currentStep == 0) {
                    animation.sprite.currentStep = animation.sprite.totalSteps;
                }
            }
            requestAnimationFrame(updateAnimation);
        }
    });
})();
