import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import logoCompass from "../../images/logo_pequeno_compass.png"
import "./dashboard.css"
import LogoutIcon from "../../images/icons/icon_logout.svg"

export default function Dashboard() {

    const { logout } = useContext(AuthContext)

    async function handleLogout() {
        await logout()
    }

    return (
        <div className="bodyFull">
            <header className="cabecalho">

                <div className="blockPreto">
                    <h2 className="blockTitulo">Weekly Planner</h2>
                    <p className="blockParag">Use this planner to organize your daily issues.</p>
                </div>

                <div>api do tempo</div>

                <div>api do clima</div>

                <div className="blockLinks">
                    <img className="positionLogo" src={logoCompass} />
                    <a className="positionLogout" onClick={handleLogout}><img src={LogoutIcon} /></a>
                </div>

            </header>


        </div>
    )
}