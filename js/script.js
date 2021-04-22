(function() { 
	'use strict'

    window.addEventListener('load', function() {
        console.log('Ready')

        let defaultState = {
            startupWindow: 'welcomeWindow',
            activeWindow: '',
            firstLoad: true,
            gameData: {
                nickname: '',
                scoreTotal: 0
            }
        }

        let state = {
            startupWindow: 'welcomeWindow',
            activeWindow: '',
            firstLoad: true,
            gameData: {
                nickname: '',
                scoreTotal: 0
            }
        }

        const devElements = {
            devWelcome: document.getElementById('dev__welcome'),
            devMenu: document.getElementById('dev__menu'),
            devGame: document.getElementById('dev__game'),
            devReset: document.getElementById('dev__reset')
        }

        const windows = {
            welcomeWindow: document.getElementById('main__welcome'),
            menuWindow: document.getElementById('main__menu'),
            gameWindow: document.getElementById('main__game')
        }

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

        function setActiveWindow(windowName) {
            windows.welcomeWindow.style.display = 'none'
            windows.menuWindow.style.display = 'none'
            windows.gameWindow.style.display = 'none'
            windows[windowName].style.display = 'flex'
            state.activeWindow = windowName
        }

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

        console.log(state)

        function resetLocalStorage() {
            localStorage.removeItem('savedState')
            setActiveWindow('welcomeWindow')
            state = defaultState
            saveState()
            console.log('State reset')
        }
        
        devElements.devReset.addEventListener('click', resetLocalStorage)

        setActiveWindow(state.startupWindow)

        devElements.devWelcome.addEventListener('click', function() {setActiveWindow('welcomeWindow')})
        devElements.devMenu.addEventListener('click', function() {setActiveWindow('menuWindow')})
        devElements.devGame.addEventListener('click', function() {setActiveWindow('gameWindow')})

        function saveNickname() {
            state.gameData.nickname = allElements.welcome.nicknameText.value
            state.firstLoad = false
            saveState()
            setActiveWindow('menuWindow')
        }

        allElements.welcome.confirmButton.addEventListener('click', saveNickname)

        if (state.firstLoad) {
            setActiveWindow('welcomeWindow')
        } else {
            setActiveWindow('menuWindow')
            state.startupWindow = 'menuWindow'
            saveState()
        }
    })
})()

