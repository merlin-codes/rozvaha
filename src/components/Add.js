import React,{useState,useEffect} from 'react';
import nextId from "react-id-generator";

const Add = ({item, setItem}) => {
    const [selectType, setSelectType] = useState("dm.hmotne");
    const [amout, setAmout] = useState(0);
    const [detail, setDetail] = useState("");
    const [error, setError] = useState("no problem");
    const [info, setInfo] = useState("");
    const [showHelp, setShowHelp] = useState(false)

    useEffect(()=>{
        if(detail === "" && (amout === "" || parseInt(amout) === 0 || isNaN(parseInt(amout)))){
            setError("Musíte vyplnit název a zadat vyšší částku.")
        }else if(detail === ""){
            setError("Nezadali jste název.")
        }else if(amout === undefined || parseInt(amout) === 0 || isNaN(parseInt(amout))){
            setError("Boužel zde musí být částka výšší jak nula.")
        }else{
            setError("no problem")
        }
        
    }, [detail, amout])
    useEffect(()=>{
        if(showHelp){
            if(selectType.includes("dm")){
                if(selectType.includes("nehmotne")){
                    setInfo("Sem patří: Patenty, licence, software, delší jak rok a 60k");
                }else if(selectType.includes("hmotne")){
                    setInfo("Sem patří: Budovy, Pozemky, předměty za 40k a využitím více jak rok");
                }else{
                    setInfo("Sem patří: Akcie, dluhopisy nebo cenné papíry rok a více");
                }
            }else if(selectType.includes("km")){
                if(selectType.includes("zasoby")){
                    setInfo("Sem patří: Material, zboží a výrobky");
                }else if(selectType.includes("pohledavky")){
                    setInfo("Sem patří: Odběratelé, poskytnuté zálohy dodavatelům");
                }else{
                    setInfo("Sem patří: Pokladna, ceniny, bankovní účty");
                }
            }else if(selectType.includes("vz")){
                if(selectType.includes("hv")){
                    setInfo("Sem patří: Výsledek hospodaření");
                }else if(selectType.includes("fond")){
                    setInfo("Sem patří: Fondy a tak dále.");
                }
            }else if(selectType.includes("cz")){
                if(selectType.includes("zavazky")){
                    setInfo("Sem patří: Závazky vůči dodavatelům, zaměstnancům nebo (Fin. Úřadu, Socialní a Zdravotní)");
                }else{
                    setInfo("Sem patří: Hypoteka, investiční atd.");
                }
            }
        }else{
            setInfo("");
        }
    }, [selectType, showHelp])
    const addItem = (e) => {
        e.preventDefault();
        if (error === "no problem") {
            const types = selectType.split(".");
            setItem([
                ...item, {id: nextId(), type: types[0], subtype: types[1], detail: detail, cash: parseInt(amout)}
            ])
        }
    }
    return (
        <div>
            <form>
                {/* pridat moznost generovani listu pomoci pole */}
                <select className="p-1 rounded" value={selectType} onChange={(e)=>{setSelectType(e.target.value)}}>
                    {/* podkategorie */}
                    {/* dlouhodoby majetek = dm */}
                    <option className="bg-secondary" value="dm.hmotne">Predmet</option>
                    <option className="bg-secondary" value="dm.nehmotne">Licence</option>
                    <option className="bg-secondary" value="dm.cenniny">Cenniny</option>
                    {/* kratkodoby majetek = km */}
                    <option className="bg-success" value="km.zasoby">Zasoby</option>
                    <option className="bg-success" value="km.pohledavky">Pohledavky</option>
                    <option className="bg-success" value="km.financi">Finanční</option>
                    {/* vlastni zdroje = vz */}
                    <option value="vz.hv">Hospodarsky vysledek</option>
                    <option value="vz.fond">Fondy</option>
                    {/* cizi zdroje = cz */}
                    <option className="bg-danger" value="cz.zavazky">Ostatní závazky</option>
                    <option className="bg-danger" value="cz.uvery">Uvěry</option>
                </select>
                <input className="rounded" type="text" placeholder="Nazev, který se zobrazí" value={detail} onChange={(e)=>(setDetail(e.target.value))} />
                <input min='0' className="rounded" type="number" placeholder="Enter amout" value={amout} onChange={(e)=>{setAmout(e.target.value)}} />
                <button className="rounded" type="submit" onClick={addItem}>přidat</button>
            </form>
            <div className="preview pt-3">
                <p className="text-center">
                    chyba: {error} 
                    <span className="custom-control custom-checkbox btn text-white-50">
                        <input id="showHelp" type="checkbox" className="custom-control-input" onChange={(e)=>{setShowHelp(!showHelp)}} value={showHelp} />
                        <label htmlFor="showHelp" className="custom-control-label">show help</label>
                    </span>
                </p>
                <p>{info}</p>
            </div>
        </div>
    );
}

export default Add;
