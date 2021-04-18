;(function($) {
	'use strict';

    $(document).ready(function() {
        console.log('Ready')

        let state = {
            startupWindow: 'welcomeWindow',
            activeWindow: '',
            gamedata: {
                username: '',
                currentStep: 0
            }
        }

        const windows = {
            welcomeWindow: {
                name: 'welcome',
                selector: $('#main__welcome')
            },
            menuWindow: {
                name: 'menu',
                selector: $('#main__menu')
            },
            gameWindow: {
                name: 'game',
                selector: $('#main__game')
            }
        }

        let devWelcome = $('#dev__welcome')
        let devMenu = $('#dev__menu')
        let devGame = $('#dev__game')

        function setActiveWindow(event) {
            windows.welcomeWindow.selector.css('display', 'none')
            windows.menuWindow.selector.css('display', 'none')
            windows.gameWindow.selector.css('display', 'none')
            windows[event.data.name].selector.css('display', 'flex')
            state.activeWindow = event.data.name
        }

        // Loads save data from local storage into state
        // If no data is found default state is used
        let savedState = localStorage.getItem('savedState') ? JSON.parse(localStorage.getItem('savedState')) : state;
        localStorage.setItem('savedState', JSON.stringify(savedState));
        state = JSON.parse(localStorage.getItem('savedState'));

        setActiveWindow({ data: { name: state.startupWindow }})

        devWelcome.on('click', { name: 'welcomeWindow' }, setActiveWindow)
        devMenu.on('click', { name: 'menuWindow' }, setActiveWindow)
        devGame.on('click', { name: 'gameWindow' }, setActiveWindow)
    })
})(jQuery)
