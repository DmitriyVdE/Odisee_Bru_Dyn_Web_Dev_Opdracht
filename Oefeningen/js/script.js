(function() { 
	'use strict'

    window.addEventListener('load', function() {
        console.log('Ready')

        // LOCAL STORAGE SECTION
        let defaultGameData = {
            username: 'No name found',
            score: 'No score found'
        }

        let gameData = {
            username: 'No name found',
            score: 'No score found'
        }

        const localStorageElements = {
            textField: document.getElementById('localstorage__textinput'),
            saveButton: document.getElementById('localstorage__save'),
            resetButton: document.getElementById('localstorage__reset'),
            username: document.getElementById('localstorage__username'),
            score: document.getElementById('localstorage__score'),
        }

        loadGameData()
        saveGameData()

        // 1. Vul deze functie aan zodat de 'gameData'-variabele wordt opgevuld met de opgeslagen data in local storage.
        // 2. Indien er geen data kan worden gevonden vul je de 'gameData'-variabele op met de data uit de 'defaultGameData'-variabele.
        // 3. Geef ook de corresponderende data weer op de webpagina. De te gebruiken HTML-elementen kan je terugvinden in de 'localStorageElements'-variabele hierboven.
        function loadGameData() {
            
        }

        // 4. Sla de gegevens in de 'gameData'-variabele op in local storage.
        function saveGameData() {
            
        }

        function setUsername() {
            let username = localStorageElements.textField.value
            if (username != '') {
                gameData.username = username
            }
        }

        localStorageElements.saveButton.addEventListener('click', function() {
            setUsername()
            saveGameData()
            loadGameData()
        })

        localStorageElements.textField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                setUsername()
                saveGameData()
                loadGameData()
            }
        })

        // 5. Verwijder de data in de local storage.
        function resetGameData() {
            
            // Plaats je code hier.


            gameData = defaultGameData
            saveGameData()
            console.log('Game data reset')
            loadGameData()
        }

        localStorageElements.resetButton.addEventListener('click', resetGameData)


        // TIMER SECTION
        let timer = {
            animationFrameId: '',
            countdown: {
                startTime: '',
                lastTime: '',
                timeLeft: '',
                duration: '10'
            },
            elements: {
                start: document.getElementById('requestanimationframe__start'),
                stop: document.getElementById('requestanimationframe__stop'),
                timer: document.getElementById('requestanimationframe__timer'),
                bar: document.getElementById('requestanimationframe__bar'),
            },
            sprite: {
                lastTime: 0,
                currentStep: 0,
                totalSteps: 6,
                width: 256,
            }
        }

        timer.elements.start.addEventListener('click', startCountdown)
        timer.elements.stop.addEventListener('click', stopCountdown)

        // 6. Zet de variabelen in timer.countdown naar de correcte waarden.
        // 7. Geef de resterende tijd weer op de webpagina.
        // 8. Stel de breedte van de timer bar naar 100%.
        // 9. Start de 'updateCountdown'-functie met requestAnimationFrame en sla de animationFrameId op in timer.animationFrameId.
        function startCountdown() {
            timer.countdown.startTime = Date.now()
            timer.countdown.lastTime = timer.countdown.startTime
            timer.countdown.timeLeft = timer.countdown.duration
            
            timer.elements.timer.innerHTML = timer.countdown.duration
            timer.elements.bar.style.width = '100%'

            timer.animationFrameId = requestAnimationFrame(updateCountdown)
        }

        // 10. Indien de timer nog loopt update je iedere seconde de resterende tijd op de webpagina.
        // 11. Iedere frame update je wel de breedte van de timer bar.
        //     TIP: Bereken hoeveel procent van de timer nog resteerd en stel het correcte percentage voor de breedte in.
        // 12. Roep opnieuw de 'updateCountdown'-functie op indien er nog tijd resteerd in de timer.
        //     Vergeet ook hier niet de animationFrameId op te slaan.
        // 13. Indien er geen resterende tijd meer is in de timer, zet je de breedte van de timer bar naar 0%.
        // 14. Voeg nu ook code toe die om de 100 milliseconden de sprite animeert.
        //     TIP: Maak hier gebruik van backgroundPosition en schuif op met de width die hierboven staat gedefinieerd in timer.sprite.width.
        //     Ieder deel van de sprite is 256px bij 256px.
        function updateCountdown() {
            const timestamp = Date.now()
            
        }

        // 15. Stop de timer met cancelAnimationFrame.
        function stopCountdown() {
            
        }
    })
})()

