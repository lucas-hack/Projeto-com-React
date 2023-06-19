import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { auth, db } from "../../services/firebaseConnection";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    deleteTarefa,
    getDocs,
    writeBatch
} from "firebase/firestore";
import logoCompass from "../../images/logo_pequeno_compass.png";
import "./dashboard.css";
import LogoutIcon from "../../images/icons/icon_logout.svg";
import LogoBG from "../../images/compass_bg.png";

export default function Dashboard() {
    const { logout } = useContext(AuthContext);
    const [tarefaInput, setTarefaInput] = useState("");
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("#local");
            setUser(JSON.parse(userDetail));

            if (userDetail) {
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas");
                const q = query(
                    tarefaRef,
                    orderBy("created", "desc"),
                    where("userUid", "==", data?.uid)
                );
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        });
                    });

                    setTarefas(lista);
                });
            }
        }

        loadTarefas();
    }, []);

    async function handleLogout() {
        await logout();
    }

    async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);
    }

    async function DeleteAll() {
        console.log("clicado");

        const userUid = user?.uid;

        try {
            const collectionRef = collection(db, "tarefas");
            const querySnapshot = await getDocs(
                query(collectionRef, where("userUid", "==", userUid))
            );

            const batch = writeBatch(db);

            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log(
                "Todas as tarefas com o userUid",
                userUid,
                "foram excluídas com sucesso."
            );
        } catch (error) {
            console.error("Erro ao excluir as tarefas:", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (tarefaInput === "") {
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
        })
            .then(() => {
                alert("a tarefa foi registrada");
                setTarefaInput("");
            })
            .catch((error) => {
                console.log("algo deu errado");
            });
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
                    <a href="https://compass.uol/en/home/" target="_blank"><img className="positionLogo" src={logoCompass} /></a>

                    <a className="positionLogout" onClick={handleLogout}><img src={LogoutIcon} /></a>
                </div>

            </header>

            <form onSubmit={handleSubmit}>

                <input className="tarefaNome"
                    type="text"
                    placeholder="Task or issue"
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />
                <select className="tarefaDia">
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>

                <select className="tarefaHora">
                    <option value="00:00">00:00</option>
                    <option value="00:30">00:30</option>
                    <option value="01:00">01:00</option>
                    <option value="01:30">01:30</option>
                    <option value="02:00">02:00</option>
                    <option value="02:30">02:30</option>
                    <option value="03:00">03:00</option>
                    <option value="03:30">03:30</option>
                    <option value="04:00">04:00</option>
                    <option value="04:30">04:30</option>
                    <option value="05:00">05:00</option>
                    <option value="05:30">05:30</option>
                    <option value="06:00">06:00</option>
                    <option value="06:30">06:30</option>
                    <option value="07:00">07:00</option>
                    <option value="07:30">07:30</option>
                    <option value="08:00">08:00</option>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                </select>

                <div className="containerDias">
                    <button className="btnMonday">Monday</button>
                    <button className="btnTuesday">Tuesday</button>
                    <button className="btnWednesday">Wednesday</button>
                    <button className="btnThursday">Thursday</button>
                    <button className="btnFriday">Friday</button>
                    <button className="btnSaturday">Saturday</button>
                    <button className="btnSunday">Sunday</button>
                </div>

                <button className="addTarefa" type="submit">+ Add to calendar</button>
                <button className="deleteTarefa" onClick={DeleteAll}>- Delete All</button>

            </form>

            <div className="Tempo">
                <div className="boxMenor">Time</div>
            </div>

            <ul className="containerTarefas">
                {tarefas && tarefas.map((item) => (

                    <li key={item.id}>
                        <div className="tarefasCadastrada">
                            <div className="boxTime">15h30m</div>
                            <div>
                                <div className="tarefaTitulo">
                                    <button onClick={() => deleteTarefa(item.id)}>Delete</button>
                                    <p>{item.tarefa}</p>
                                </div>
                            </div>
                        </div>
                    </li>

                ))}

            </ul>


            <img src={LogoBG} className="bg" />
        </div>
    )
}