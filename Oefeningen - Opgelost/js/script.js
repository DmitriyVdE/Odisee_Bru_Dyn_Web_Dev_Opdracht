(function () {
    "use strict";

    window.addEventListener("load", function () {
        console.log("Ready");

        // LOCAL STORAGE SECTION
        // Default state if no saved state is found
        let defaultGameData = {
            username: "No name found",
            score: "No score found",
        };

        // Current active state
        let gameData = {
            username: "No name found",
            score: "No score found",
        };

        const usernameField = document.getElementById("localstorage__username");
        usernameField.style.backgroundColor = "red";

        const localStorageElements = {
            textField: document.getElementById("localstorage__textinput"),
            saveButton: document.getElementById("localstorage__save"),
            resetButton: document.getElementById("localstorage__reset"),
            username: document.getElementById("localstorage__username"),
            score: document.getElementById("localstorage__score"),
        };

        loadGameData();
        saveGameData();

        // Loads save data from local storage into state
        // If no data is found default state is used
        function loadGameData() {
            gameData = localStorage.getItem("gameData")
                ? JSON.parse(localStorage.getItem("gameData"))
                : defaultGameData;
            localStorageElements.username.innerHTML = gameData.username;
            localStorageElements.score.innerHTML = gameData.score;
        }

        // Saves the current state to local storage
        function saveGameData() {
            localStorage.setItem("gameData", JSON.stringify(gameData));
            console.log("Data saved");
        }

        function setUsername() {
            let username = localStorageElements.textField.value;
            if (username != "") {
                gameData.username = username;
            }
        }

        localStorageElements.saveButton.addEventListener("click", function () {
            setUsername();
            saveGameData();
            loadGameData();
        });

        localStorageElements.textField.addEventListener(
            "keydown",
            function (e) {
                if (e.key === "Enter") {
                    setUsername();
                    saveGameData();
                    loadGameData();
                }
            }
        );

        // Resets the local storage - Dev only
        function resetGameData() {
            localStorage.removeItem("gameData");
            gameData = defaultGameData;
            saveGameData();
            console.log("Game data reset");
            loadGameData();
        }

        localStorageElements.resetButton.addEventListener(
            "click",
            resetGameData
        );

        // TIMER SECTION
        let timer = {
            animationFrameId: "",
            countdown: {
                startTime: "",
                lastTime: "",
                timeLeft: "",
                duration: "10",
            },
            elements: {
                start: document.getElementById("requestanimationframe__start"),
                stop: document.getElementById("requestanimationframe__stop"),
                timer: document.getElementById("requestanimationframe__timer"),
                bar: document.getElementById("requestanimationframe__bar"),
                sprite: document.getElementById("requestanimationframe_sprite"),
            },
            sprite: {
                lastTime: 0,
                currentStep: 0,
                totalSteps: 6,
                width: 256,
            },
        };

        timer.elements.start.addEventListener("click", startCountdown);
        timer.elements.stop.addEventListener("click", stopCountdown);

        // Sets up and starts countdown
        function startCountdown() {
            timer.countdown.startTime = Date.now();
            timer.countdown.lastTime = timer.countdown.startTime;
            timer.countdown.timeLeft = timer.countdown.duration;

            timer.elements.timer.innerHTML = timer.countdown.duration;
            timer.elements.bar.style.width = "100%";

            timer.animationFrameId = requestAnimationFrame(updateCountdown);
        }

        // Update the countdown
        function updateCountdown() {
            if (timer.countdown.timeLeft > 0) {
                const timestamp = Date.now();
                if (timestamp - timer.countdown.lastTime >= 1000) {
                    timer.countdown.lastTime = timestamp;
                    timer.countdown.timeLeft--;
                    timer.elements.timer.innerHTML = timer.countdown.timeLeft;
                }

                if (timestamp - timer.sprite.lastTime >= 100) {
                    timer.sprite.lastTime = timestamp;
                    timer.elements.sprite.style.backgroundPosition =
                        timer.sprite.currentStep * timer.sprite.width + "px";

                    timer.sprite.currentStep--;
                    if (timer.sprite.currentStep == 0) {
                        timer.sprite.currentStep = timer.sprite.totalSteps;
                    }
                }

                let timeLeftPercentage =
                    100 -
                    ((timestamp - timer.countdown.startTime) /
                        (timer.countdown.duration * 1000)) *
                        100;
                timer.elements.bar.style.width = timeLeftPercentage + "%";

                timer.animationFrameId = requestAnimationFrame(updateCountdown);
            } else {
                timer.elements.bar.style.width = "0%";
            }
        }

        function stopCountdown() {
            cancelAnimationFrame(timer.animationFrameId);
        }
    });
})();
