(function() { 
	'use strict'

    window.addEventListener('load', function() {
        console.log('Ready')

        // Default state if no saved state is found
        let defaultState = {
            startupWindow: 'welcomeWindow',
            activeWindow: '',
            firstLoad: true,
            gameData: {
                nickname: '',
                scoreTotal: 0
            },
            animationFrameIds: {
                window: '',
                welcome: '',
                menu: '',
                game: ''
            }
        }

        // Current active state
        let state = {
            startupWindow: 'welcomeWindow',
            activeWindow: '',
            firstLoad: true,
            gameData: {
                nickname: '',
                scoreTotal: 0
            },
            animationFrameIds: {
                window: '',
                welcome: '',
                menu: '',
                game: '',
                countdown: ''
            }
        }

        // All developer elements and their selectors
        const devElements = {
            devWelcome: document.getElementById('dev__welcome'),
            devMenu: document.getElementById('dev__menu'),
            devGame: document.getElementById('dev__game'),
            devReset: document.getElementById('dev__reset')
        }

        // All windows and their selectors
        const windows = {
            welcomeWindow: document.getElementById('main__welcome'),
            menuWindow: document.getElementById('main__menu'),
            gameWindow: document.getElementById('main__game')
        }

        // All elements that should be addressable
        const allElements = {
            welcome: {
                nicknameText: document.getElementById('form__nickname'),
                confirmButton: document.getElementById('form__confirm')
            },
            menu: {
                title: document.getElementById('menu__title'),
                playButton: document.getElementById('menu__play'),
                settingsButton: document.getElementById('menu__settings'),
                // instructionsButton: document.getElementById('menu__title')
                score: document.getElementById('menu__score')
            },
            game: {
                title: document.getElementById('game__title'),
                countdown: document.getElementById('game__countdown'),
                countdownText: document.getElementById('countdown__text'),
                countdownBar: document.getElementById('countdown__bar'),
                gameQuiz: document.getElementById('game__quiz'),
                questionTitle: document.getElementById('quiz__question'),
                questionContent: document.getElementById('quiz__content'),
                questionImage: document.getElementById('quiz__image'),
                questionText: document.getElementById('quiz__text'),
                answer: document.getElementById('quiz__answer'),
                answerText: document.getElementById('quiz__answer__text'),
                answerVoice: document.getElementById('quiz__answer__voice')
            }
        }

        // Set the active window
        function setActiveWindow(windowName) {
            if (windowName === 'welcomeWindow') {
                allElements.welcome.nicknameText.value = ''
            } else if (windowName === 'menuWindow') {
                allElements.menu.title.innerHTML = `Hi ${state.gameData.nickname}!`
                allElements.menu.score.innerHTML = `Score: ${state.gameData.scoreTotal}`
            }

            state.animationFrameIds.window = requestAnimationFrame(function() {
                for (const [key, value] of Object.entries(windows)) {
                    value.style.display = 'none'
                }
                windows[windowName].style.display = 'flex'
                state.activeWindow = windowName
            })
        }

        // Saves the current state to local storage
        function saveState() {
            localStorage.setItem('savedState', JSON.stringify(state))
            console.log('State saved')
        }

        // Loads save data from local storage into state
        // If no data is found default state is used
        let savedState = localStorage.getItem('savedState') ? JSON.parse(localStorage.getItem('savedState')) : state
        localStorage.setItem('savedState', JSON.stringify(savedState))
        state = JSON.parse(localStorage.getItem('savedState'))

        // Resets the local storage - Dev only
        function resetLocalStorage() {
            localStorage.removeItem('savedState')
            state = defaultState
            saveState()
            console.log('State reset')
            setActiveWindow('welcomeWindow')
        }
        

        // Developer functions
        devElements.devReset.addEventListener('click', resetLocalStorage)

        setActiveWindow(state.startupWindow)

        devElements.devWelcome.addEventListener('click', function() {setActiveWindow('welcomeWindow')})
        devElements.devMenu.addEventListener('click', function() {setActiveWindow('menuWindow')})
        devElements.devGame.addEventListener('click', function() {setActiveWindow('gameWindow')})


        // WELCOME SECTION
        // Set nickname on welcome screen
        function saveNickname() {
            var nicknameText = allElements.welcome.nicknameText.value
            if (nicknameText !== '') {
                state.gameData.nickname = nicknameText
                state.firstLoad = false
                saveState()
                setActiveWindow('menuWindow')
            }
        }

        // Save nickname on button click and on 'Enter'-keydown
        allElements.welcome.confirmButton.addEventListener('click', saveNickname)
        allElements.welcome.nicknameText.addEventListener('keydown', function(e) {
            if (e.key === "Enter") {
                saveNickname()
            }
        })

        // Set correct active window based on firstLoad variable
        if (state.firstLoad) {
            setActiveWindow('welcomeWindow')
        } else {
            setActiveWindow('menuWindow')
            state.startupWindow = 'menuWindow'
            saveState()
        }


        // MENU SECTION
        allElements.menu.playButton.addEventListener('click', function() {
            setActiveWindow('gameWindow')
            startGame()
        })

        allElements.menu.settingsButton.addEventListener('click', function() {
            console.log('settings clicked')
        })


        // GAME SECTION
        // All possible questions and their options
        // Addition functions with 2 random numbers and their sum - check later function
        const quiz = {
            settings: {
                questionsPerGame: 3,
                rewardCorrect: 100,
                streakBonus: 50,
                timeTillGame: 3,
                timePerQuestion: 10,
                intermissionTime: 2
            },
            timer: {
                startTime: '',
                lastTime: '',
                initialTime: 0,
                timeLeft: 5,
            },
            current: {
                step: 'countdown',
                questionNr: 0,
                category: '',
                question: '',
                answer: '',
                score: 0,
                answered: true
            },
            categories: ['addition', 'colors', 'animals'],
            questions: {
                addition: {
                    questionText: "What is the sum of these numbers?"
                },
                colors: {
                    questionText: "What is the name of this color?",
                    options: {
                        red: {
                            answer: 'red',
                            hexValue: "#f23030"
                        },
                        blue: {
                            answer: 'blue',
                            hexValue: "#3050f2"
                        },
                        green: {
                            answer: 'green',
                            hexValue: "#30f243"
                        },
                        yellow: {
                            answer: 'yellow',
                            hexValue: "#f2f230"
                        },
                        purple: {
                            answer: 'purple',
                            hexValue: "#c530f2"
                        }
                    }
                },
                animals: {
                    questionText: "What's this animal called?",
                    options: {
                        cat: {
                            answer: 'cat',
                            src: "images/animals/cat.jpg"
                        },
                        cow: {
                            answer: 'cow',
                            src: "images/animals/cow.jpg"
                        },
                        dog: {
                            answer: 'dog',
                            src: "images/animals/dog.jpg"
                        },
                        hamster: {
                            answer: 'hamster',
                            src: "images/animals/hamster.jpg"
                        },
                        horse: {
                            answer: 'horse',
                            src: "images/animals/horse.jpg"
                        }
                    }
                }
            }
        }

        // Fresh game setup
        function startGame() {
            quiz.timer = {
                startTime: Date.now(),
                lastTime: Date.now(),
                initialTime: quiz.settings.timeTillGame,
                timeLeft: quiz.settings.timeTillGame,
            }
            quiz.current = {
                step: 'countdown',
                questionNr: 0,
                category: '',
                question: '',
                answer: '',
                score: 0,
                answered: true
            }
            
            allElements.game.questionTitle.innerHTML = ''
            allElements.game.questionImage.style.display = 'none'
            allElements.game.questionText.style.display = 'block'
            allElements.game.questionText.innerHTML = ''
            allElements.game.questionText.style.backgroundColor = ''

            state.animationFrameIds.countdown = requestAnimationFrame(startCountdown)
        }

        // Sets up and starts countdown
        function startCountdown() {
            if (quiz.current.step === 'quizPlaying') {
                quiz.timer.startTime = Date.now()
                quiz.timer.initialTime = quiz.settings.timePerQuestion
                quiz.timer.timeLeft = quiz.settings.timePerQuestion

            } else if (quiz.current.step === 'quizCheckAnswer') {
                quiz.timer.startTime = Date.now()
                quiz.timer.initialTime = quiz.settings.intermissionTime
                quiz.timer.timeLeft = quiz.settings.intermissionTime
            }
            allElements.game.countdownText.innerHTML = quiz.timer.timeLeft
            allElements.game.countdownBar.style.width = '100%'
            state.animationFrameIds.countdown = requestAnimationFrame(updateCountdown)
        }

        // Update the countdown
        function updateCountdown() {
            if (quiz.timer.timeLeft > 0) {
                const timestamp = Date.now()
                if (timestamp - quiz.timer.lastTime >= 1000) {
                    quiz.timer.lastTime = timestamp
                    quiz.timer.timeLeft--
                    allElements.game.countdownText.innerHTML = quiz.timer.timeLeft
                }
                let timeLeftPercentage = 100 - (((timestamp - quiz.timer.startTime) / (quiz.timer.initialTime * 1000)) * 100)
                allElements.game.countdownBar.style.width = timeLeftPercentage + '%'
                state.animationFrameIds.countdown = requestAnimationFrame(updateCountdown)
            } else {
                allElements.game.countdownBar.style.width = '0%'
                goToNextStep()
            }
        }

        // Goes to the next step in the quiz
        function goToNextStep() {
            if (quiz.current.step === 'countdown') {
                startQuiz()
            } else if (quiz.current.step === 'quizPlaying') {
                quiz.current.questionNr++
                quiz.current.answered = false
                if (quiz.current.questionNr <= quiz.settings.questionsPerGame) {
                    state.animationFrameIds.game = requestAnimationFrame(displayQuestion)
                }
            }else if (quiz.current.step === 'quizCheckAnswer') {
                checkAnswer()
            } else if (quiz.current.step === 'quizEnd') {
                endQuiz()
            }
        }

        // Starts the quiz and sets the required variables
        function startQuiz() {
            allElements.game.gameQuiz.style.display = 'flex'
            quiz.current.step = 'quizPlaying'
            goToNextStep()
        }

        // Returns a random int between min and max (incl. min and max)
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        // Displays a new question and starts the timer
        // If all questions have been asked the quiz ends
        function displayQuestion() {
            const categories = Object.keys(quiz.questions);
            quiz.current.category = categories[Math.floor(Math.random()*categories.length)]
            
            if (quiz.current.category === 'addition') {
                displayAdditionQuestion()
            } else if (quiz.current.category === 'colors') {
                displayColorQuestion()
            } else if (quiz.current.category === 'animals') {
                displayAnimalQuestion()
            }

            startCountdown()
            quiz.current.step = 'quizCheckAnswer'
        }

        function displayAdditionQuestion() {
            const number1 = getRandomInt(1, 9)
            const number2 = getRandomInt(1, 9)
            quiz.current.answer = number1 + number2

            allElements.game.questionTitle.innerHTML = quiz.questions['addition'].questionText
            
            allElements.game.questionImage.style.display = 'none'
            allElements.game.questionText.style.display = 'block'
            allElements.game.questionText.innerHTML = number1 + ' + ' + number2 
            allElements.game.questionText.style.backgroundColor = ''
        }

        function displayColorQuestion() {
            const keys = Object.keys(quiz.questions[quiz.current.category].options)
            const question = keys[Math.floor(Math.random()*keys.length)]
            quiz.current.question = quiz.questions['colors'].options[question]
            quiz.current.answer = quiz.current.question.answer

            allElements.game.questionTitle.innerHTML = quiz.questions['colors'].questionText
            
            allElements.game.questionImage.style.display = 'none'
            allElements.game.questionText.style.display = 'block'
            allElements.game.questionText.innerHTML = ''
            allElements.game.questionText.style.backgroundColor = quiz.current.question.hexValue
        }

        function displayAnimalQuestion() {
            const keys = Object.keys(quiz.questions[quiz.current.category].options)
            const question = keys[Math.floor(Math.random()*keys.length)]
            quiz.current.question = quiz.questions['animals'].options[question]
            quiz.current.answer = quiz.current.question.answer

            allElements.game.questionTitle.innerHTML = quiz.questions['animals'].questionText
            
            allElements.game.questionText.style.display = 'none'
            allElements.game.questionImage.style.display = 'block'
            allElements.game.questionImage.src = quiz.current.question.src
        }

        allElements.game.answerVoice.addEventListener('click', function() {
            let recognition = new (webkitSpeechRecognition || SpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            recognition.start();
            recognition.onresult = function(event) {
                console.log(event.results[0][0].transcript)
                allElements.game.answerText.value = event.results[0][0].transcript;
                submitAnswer()
            };
          });

        // Call submit answer with 'Enter'
        allElements.game.answerText.addEventListener('keydown', function(e) {
            if (e.key === "Enter") {
                submitAnswer()
            }
        })

        // Submits the answer
        function submitAnswer() {
            cancelAnimationFrame(state.animationFrameIds.countdown)
            quiz.current.answered = true
            checkAnswer()
        }

        function checkAnswer() {
            const answer = allElements.game.answerText.value
            allElements.game.answerText.value = ''
            if (quiz.current.answered === true) {
                if (quiz.current.answer == answer.toLowerCase()) {
                    allElements.game.questionTitle.innerHTML = 'Correct!'
                    quiz.current.score += quiz.settings.rewardCorrect
                } else {
                    allElements.game.questionTitle.innerHTML = 'Wrong!'
                }
            } else {
                allElements.game.questionTitle.innerHTML = 'Failed to answer in time!'
            }
            startCountdown()
            if (quiz.current.questionNr >= quiz.settings.questionsPerGame) {
                quiz.current.step = 'quizEnd'
            } else {
                quiz.current.step = 'quizPlaying'
            }
        }

        // Ends the quiz and saves score
        function endQuiz() {
            state.gameData.scoreTotal += quiz.current.score
            saveState()
            setActiveWindow('menuWindow')
        }

    })
})()

