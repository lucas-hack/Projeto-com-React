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
    getDocs,
    writeBatch,
    sort
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
    const [tarefaHora, setTarefaHora] = useState("");
    const [tarefaDia, setTarefaDia] = useState("");
    const [filtroDia, setFiltroDia] = useState("");

    const [hora, setHora] = useState("");
    const [data, setData] = useState("");
    const [tarefasFiltradas, setTarefasFiltradas] = useState([]);

    const [diaSelecionado, setDiaSelecionado] = useState("");

    useEffect(() => {
        const relogio = setInterval(() => {
            const meses = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            const dataAtual = new Date();
            const horas = dataAtual.getHours().toString().padStart(2, '0');
            const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
            const dia = new Date().getDate()
            const mes = meses[dataAtual.getMonth()]
            const ano = new Date().getFullYear()
            setHora(`${horas}:${minutos}`);
            setData(`${mes} ${dia}th, ${ano}`);
        }, 1000);

        return () => {
            clearInterval(relogio);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tarefas"), (snapshot) => {
            setTarefas(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

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
                        const tarefa = {
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                            tarefaHora: doc.data().tarefaHora, // Adicione a propriedade tarefaHora ao objeto tarefa
                        };
                        lista.push(tarefa);
                    });

                    setTarefas(lista);
                });
            }
        }

        loadTarefas();
    }, []);

    useEffect(() => {
        const filteredTarefas = tarefas.filter((tarefa) => tarefa.tarefaDia === diaSelecionado);
        setTarefasFiltradas(filteredTarefas);
    }, [diaSelecionado, tarefas]);


    async function handleLogout() {
        await logout();
    }

    async function deleteTarefa(id) {

        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);

        setTarefasFiltradas(tarefasFiltradas.filter((tarefa) => tarefa.id !== id));
    }

    async function DeleteAll() {

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

        if (tarefaInput === "" || tarefaDia === "") {
            return;
        }

        const novaTarefa = {
            tarefa: tarefaInput,
            userUid: user?.uid,
            tarefaHora: tarefaHora,
            tarefaDia: tarefaDia,
        };

        await addDoc(collection(db, "tarefas"), novaTarefa)
            .then(() => {
                setTarefaInput("");
                setTarefasFiltradas([...tarefasFiltradas, novaTarefa]);
            })
            .catch((error) => {
                console.log("Algo deu errado");
            });
    }


    return (
        <div className="bodyFull">
            <header className="cabecalho">

                <div className="blockPreto">
                    <h2 className="blockTitulo">Weekly Planner</h2>
                    <p className="blockParag">Use this planner to organize your daily issues.</p>
                </div>

                <div className="relogioContainer">
                    <div className="relogioHora">{hora}</div>
                    <div className="relogioData">{data}</div>
                </div>


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
                <select className="tarefaDia" value={tarefaDia}
                    onChange={(e) => setTarefaDia(e.target.value)}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>

                <select className="tarefaHora" value={tarefaHora} onChange={(e) => setTarefaHora(e.target.value)}>
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
                    <button className="btnMonday" onClick={() => setDiaSelecionado("Monday")}>
                        Monday
                    </button>
                    <button className="btnTuesday" onClick={() => setDiaSelecionado("Tuesday")}>
                        Tuesday
                    </button>
                    <button className="btnWednesday" onClick={() => setDiaSelecionado("Wednesday")}>
                        Wednesday
                    </button>
                    <button className="btnThursday" onClick={() => setDiaSelecionado("Thursday")}>
                        Thursday
                    </button>
                    <button className="btnFriday" onClick={() => setDiaSelecionado("Friday")}>
                        Friday
                    </button>
                    <button className="btnSaturday" onClick={() => setDiaSelecionado("Saturday")}>
                        Saturday
                    </button>
                    <button className="btnSunday" onClick={() => setDiaSelecionado("Sunday")}>
                        Sunday
                    </button>
                </div>

                <button className="addTarefa" type="submit">+ Add to calendar</button>
                <button className="deleteTarefa" onClick={DeleteAll}>- Delete All</button>

            </form>

            <div className="Tempo">
                <div className="boxMenor">Time</div>
            </div>

            <ul className="containerTarefas">
                {tarefasFiltradas.map((tarefa) => (

                    <li key={tarefa.id} >
                        <div className="tarefasCadastrada">
                            <div className="boxTime">{tarefa.tarefaHora}</div>
                            <div>
                                <div className="tarefaTitulo">
                                    <button onClick={() => deleteTarefa(tarefa.id, tarefa.tarefaDia)}>Delete</button>
                                    <p>{tarefa.tarefa}</p>
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