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
                game: ''
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
                settingsButton: document.getElementById('menu__settings')
                // instructionsButton: document.getElementById('menu__title')
            },
            game: {
                title: document.getElementById('game__title'),
                quizContainer: document.getElementById('game__quiz'),
                question: document.getElementById('quiz__question'),
                image: document.getElementById('quiz__image'),
                answers: document.getElementById('quiz__answers'),
            }
        }

        // Set the active window
        function setActiveWindow(windowName) {
            if (windowName === 'welcomeWindow') {
                allElements.welcome.nicknameText.value = ''
            } else if (windowName === 'menuWindow') {
                allElements.menu.title.innerHTML = `Hi ${state.gameData.nickname}!`
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
            console.log('play clicked')
        })

        allElements.menu.settingsButton.addEventListener('click', function() {
            console.log('settings clicked')
        })


        // GAME SECTION
        // All possible questions and their options
        // Addition functions with 2 random numbers and their sum - check later function
        const quiz = {
            settings: {
                questionsPerGame: 5,
                rewardCorrect: 100,
                streakBonus: 50
            },
            current: {
                startTime: '',
                correct: [],
                questionNr: 0,
                score: 0
            },
            categories: {
                addition: {
                    questionText: "What is the sum of these numbers?"
                },
                colors: {
                    questionText: "what is the name of this color?",
                    options: {
                        red: {
                            hexValue: "#f23030"
                        },
                        blue: {
                            hexValue: "#3050f2"
                        },
                        green: {
                            hexValue: "#30f243"
                        },
                        yellow: {
                            hexValue: "#f2f230"
                        },
                        purple: {
                            hexValue: "#c530f2"
                        }
                    }
                },
                animals: {
                    questionText: "What's this animal called?",
                    options: {
                        cat: {
                            src: "../images/animals/cat.jpg"
                        },
                        cow: {
                            src: "../images/animals/cow.jpg"
                        },
                        dog: {
                            src: "../images/animals/dog.jpg"
                        },
                        hamster: {
                            src: "../images/animals/hamster.jpg"
                        },
                        horse: {
                            src: "../images/animals/horse.jpg"
                        }
                    }
                }
            }
        }


    })
})()

