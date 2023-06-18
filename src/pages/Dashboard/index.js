import {useContext} from "react"
import {AuthContext} from "../../contexts/auth"

export default function Dashboard() {

    const {logout} = useContext(AuthContext)

    async function handleLogout(){
        await logout()
    }

    return (
        <div>
            <h1>dashboard</h1>
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse deleniti reiciendis et nobis dolor libero quas accusantium asperiores ut animi mollitia, facere voluptatum possimus magni, quos impedit aliquam reprehenderit enim.</p>

<a onClick={handleLogout}>sair da conta</a>

        </div>
    )
}