import "./HomePage.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routes from '../../constants/routes';
import getHomePage from "../../services/getHomePage";
import Heading from "../../components/Heading/Heading";

const HomePage = ({ token }) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate(routes.loginPage);
        }
    }, [token]);

    useEffect(() => {
        const receiveData = async () => {
            setLoading(true);
            try {
                const data = await getHomePage();
                setUserInfo(data);
                setError()
            } catch (_) {
                setError("Could not load Home Page. Please reload the page.");
            }
            setLoading(false);
        }

        receiveData();
    }, []);


    useEffect(() => {
        if (!error) {
            return;
        }

        setTimeout(error, 10 * 1000);
    }, [error]);


    return (
        <>
            {loading ? ("Loading...") : (
                <div className="home-container">
                    {error && <h2>{error}</h2>}
                    <Heading title="Your information:" />
                    {userInfo.email && <p className="font"><span className="information">Email: </span>{userInfo.email}</p>}
                    {userInfo.firstName && <p className="font"><span className="information">First Name: </span>{userInfo.firstName}</p>}
                    {userInfo.lastName && <p className="font"><span className="information">Last Name: </span>{userInfo.lastName}</p>}
                    {userInfo.adress && <p className="font"><span className="information">Adress: </span>{userInfo.adress}</p>}
                    {userInfo.gender && <p className="font"><span className="information">Gender: </span>{userInfo.gender}</p>}
                    {userInfo.subscribe && <p className="font"><span className="information">Subscribe: </span>{userInfo.subscribe}</p>}
                </div>)}
        </>
    )
}

export default HomePage;