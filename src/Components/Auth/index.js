import { useEffect, useState } from 'react';

const parseUser = (username, discriminator) => {
    if (discriminator === '0') {
        return username;
    } else return `${username}#${discriminator}`;
}
const Auth = ({ token, type, state }) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (token) {
                    const response = await fetch('https://discord.com/api/users/@me', {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else {
                        console.error('Error fetching user data');
                    }
                }
            } catch (error) {
                console.error('Error in fetch operation:', error);
            }
        }

        fetchUserData();
    }, [token])

    return (
        user? (
            <div>
                {
                    parseUser(user.username,user.discriminator)
                }
            </div>
        ): (
            <a href={'https://discord.com/api/oauth2/authorize?client_id=1091452641218920448&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=identify+guilds'}>
                <div className={'app--header--login'}>
                    <div className={'app--header--login--logo'} />
                    <h6>Login</h6>
                </div>
            </a>
        )
    )
}

export default Auth;