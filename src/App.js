import { useEffect, useState } from 'react';
import './App.scss';
import { Auth } from './Components';

function App() {
    const [isLoggedIn, setLoggedIn] = useState({
        accessToken: "",
        tokenType: ""
    });

    useEffect(() => {
        const storedLogin = JSON.parse(sessionStorage.getItem('login'));
        if (storedLogin && storedLogin.accessToken) {
            setLoggedIn(storedLogin);
        } else {
            const fragment = new URLSearchParams(window.location.hash.slice(1));
            const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
            if (accessToken) {
                setLoggedIn({
                    accessToken: accessToken,
                    tokenType: tokenType
                });
            }
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn.accessToken) {
            sessionStorage.setItem('login', JSON.stringify(isLoggedIn));
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [isLoggedIn]);

    return (
        <div className="app">
            <header className="app--header">
                <a href={'#'}>
                    <div className={'app--header--banner'}>
                        <div className="app--logo" alt="logo" />
                        <h1 className={'app--logo--title'}>EnCore</h1>
                    </div>
                </a>
                <Auth
                    token = { isLoggedIn.accessToken }
                    type = { isLoggedIn.tokenType }
                    state = { isLoggedIn.state }
                />
            </header>
            <div className={'app--wrapper'}>
                <div className={'app--wrapper--banner'}>
                    <div className={'app--wrapper--banner--image'} />
                        <h1 className={'app--wrapper--banner--title'}>LEVEL UP YOUR RAIDING</h1>
                </div>
            </div>
        </div>
    );
}

export default App;
