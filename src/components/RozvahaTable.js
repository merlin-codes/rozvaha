import React,{useEffect,useState} from 'react';
import Item from './Item';

const RozvahaTable = ({setItem, item}) => {
    const [aktiv, setAktiv] = useState(0);
    const [pasiv, setPasiv] = useState(0);

    useEffect(()=>{
        var aktiva = 0;
        item.filter(element => element.type === "dm" || element.type === "km").forEach(element => {
            aktiva += element.cash;
        });
        setAktiv(aktiva)
    }, [item])
    useEffect(()=>{
        var pasiva = 0;
        item.filter(element => element.type === "vz" || element.type === "cz").forEach(element => {
            pasiva += element.cash;
        });
        setPasiv(pasiva)
    }, [item])

    return (
        <div>
            <div className="row pl-5 pr-5 pt-5">
                <div className="col">
                    <div className="pb-1 pt-3 mb-3 bg-secondary rounded text-white">
                        <span className="text-white">
                            <p>Dlouhodobý majetek</p>
                        </span>
                        <div className="col flex-fill">
                            {item.filter(element => element.subtype === "hmotne").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                            {item.filter(element => element.subtype === "nehmotne").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                            {item.filter(element => element.subtype === "financni").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                        </div>
                    </div>
                    <div className="pb-1 pt-3 mt-3 rounded bg-success">
                        <span className="text-white">
                            <p>Oběžný majetek</p>
                        </span>
                        <div className="col flex-fill">
                            {item.filter(element => element.subtype === "penize").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                            {item.filter(element => element.subtype === "pohledavky").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                            {item.filter(element => element.subtype === "financni").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="pb-1 pt-3 mb-3 rounded bg-white text-dark">
                        <span className="">
                            <p>Vlastní zdroje</p>
                        </span>
                        <div className="col flex-fill">
                            {item.filter(element => element.subtype === "hv").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                        </div>
                    </div>
                    <div className="pb-1 pt-3 mt-3 rounded text-white bg-danger">
                        <span className="text-white">
                            <p>Cizí zdroje</p>
                        </span>
                        <div className="col flex-fill">
                            {item.filter(element => element.subtype === "zavazky").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                            {item.filter(element => element.subtype === "uvery").map(element => {
                                return <Item item={item} element={element} setItem={setItem} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pl-5 pr-5">
                <div className="col">
                    <hr/>
                    <span className="justify-content-between d-flex">
                        <p>Aktiva</p><p>{aktiv.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')},-</p>
                    </span>
                </div>
                <div className="col">
                    <hr/>
                    <span className="justify-content-between d-flex">
                        <p>Pasiva</p><p>{pasiv.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')},-</p>
                    </span>
                </div>
            </div>
            <hr/>
            <div className="row pl-5 pr 5 pb-5">
                <div className="col">
                    <span className="justify-content-around d-flex">
                        <p>Zakladni kapital: ......................... {(aktiv - pasiv).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')},-</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default RozvahaTable;