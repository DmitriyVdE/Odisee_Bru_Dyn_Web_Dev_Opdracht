;(function($) {
	'use strict'

    $(document).ready(function() {
        console.log('Ready')

        let defaultState = {
            startupWindow: 'welcomeWindow',
            activeWindow: '',
            firstLoad: true,
            gamedata: {
                nickname: '',
                scoreTotal: 0
            }
        }

        let state = {
            startupWindow: 'welcomeWindow',
            activeWindow: '',
            firstLoad: true,
            gamedata: {
                nickname: '',
                scoreTotal: 0
            }
        }

        const windows = {
            welcomeWindow: {
                name: 'welcomeWindow',
                selector: $('#main__welcome')
            },
            menuWindow: {
                name: 'menuWindow',
                selector: $('#main__menu')
            },
            gameWindow: {
                name: 'gameWindow',
                selector: $('#main__game')
            }
        }

        let devWelcome = $('#dev__welcome')
        let devMenu = $('#dev__menu')
        let devGame = $('#dev__game')
        let devReset = $('#dev__reset')

        function setActiveWindow(event) {
            windows.welcomeWindow.selector.css('display', 'none')
            windows.menuWindow.selector.css('display', 'none')
            windows.gameWindow.selector.css('display', 'none')
            windows[event.data.name].selector.css('display', 'flex')
            state.activeWindow = event.data.name
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
            setActiveWindow({ data: { name: 'welcomeWindow' }})
            state = defaultState
            saveState()
            console.log('State reset')
        }
        
        devReset.on('click', resetLocalStorage)

        setActiveWindow({ data: { name: state.startupWindow }})

        devWelcome.on('click', { name: 'welcomeWindow' }, setActiveWindow)
        devMenu.on('click', { name: 'menuWindow' }, setActiveWindow)
        devGame.on('click', { name: 'gameWindow' }, setActiveWindow)

        function saveNickname() {
            state.gamedata.nickname = $('#welcome__nickname').val()
            state.firstLoad = false
            saveState()
            setActiveWindow({ data: { name: 'menuWindow' }})
        }

        $('#welcome__confirm').on('click', saveNickname)

        if (state.firstLoad) {
            setActiveWindow({ data: { name: 'welcomeWindow' }})
        } else {
            setActiveWindow({ data: { name: 'menuWindow' }})
            state.startupWindow = 'menuWindow'
            saveState()
        }
    })
})(jQuery)
