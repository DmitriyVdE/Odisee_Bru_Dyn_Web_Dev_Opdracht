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
                nicknameText: document.getElementById('welcome__nickname'),
                confirmButton: document.getElementById('welcome__confirm')
            },
            menu: {

            },
            game: {

            }
        }

        // Set the active window
        function setActiveWindow(windowName) {
            windows.welcomeWindow.style.display = 'none'
            windows.menuWindow.style.display = 'none'
            windows.gameWindow.style.display = 'none'
            windows[windowName].style.display = 'flex'
            state.activeWindow = windowName
        }

        // Saves the current state to local storage
        function saveState() {
            localStorage.setItem('savedState', JSON.stringify(state))
            console.log('State saved')
            console.log(state)
        }

        // Loads save data from local storage into state
        // If no data is found default state is used
        let savedState = localStorage.getItem('savedState') ? JSON.parse(localStorage.getItem('savedState')) : state
        localStorage.setItem('savedState', JSON.stringify(savedState))
        state = JSON.parse(localStorage.getItem('savedState'))

        // Resets the local storage - Dev only
        function resetLocalStorage() {
            localStorage.removeItem('savedState')
            setActiveWindow('welcomeWindow')
            state = defaultState
            saveState()
            console.log('State reset')
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
            state.gameData.nickname = allElements.welcome.nicknameText.value
            state.firstLoad = false
            saveState()
            setActiveWindow('menuWindow')
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
        


        // GAME SECTION
        // All possible questions and their options
        // Addition functions with 2 random numbers and their sum - check later function
        const quizItems = {
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


    })
})()

