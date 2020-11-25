import React,{useState,useEffect} from 'react';
import './Add.css';

const Add = ({item, setItem}) => {
    const [selectType, setSelectType] = useState("dm.hmotne");
    const [amout, setAmout] = useState(0);
    const [detail, setDetail] = useState("");
    const [error, setError] = useState("no problem");
    const [info, setInfo] = useState("");
    const [showHelp, setShowHelp] = useState(false);
    const [autoComplete, setAutoComplete] = useState(false);

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
    useEffect(()=>{
        document.getElementById("typeSelector").disabled = autoComplete;
        if(autoComplete){
            if(detail.includes("akci") || detail.includes("dluh") || detail.includes("cenn") || detail.includes("pap")){
                setSelectType("")
            }else if(detail.includes("pohl")){
                setSelectType("km.pohledavky");
            }else if(detail.includes("soft") || detail.includes("lice")){
                setSelectType("dm.nehmotne");
            }else if(detail.includes("mate") || detail.includes("zaso") || detail.includes("vyro") || detail.includes("výro")){
                setSelectType("km.zasoby");
            }else if(detail.includes("pokladna") || detail.includes("ucty") || detail.includes("bankovni")){
                setSelectType("km.financi");
            }else if(detail.includes("vysledek") || detail.includes("hospodareni") || detail.includes("výsledek") || detail.includes("hospodařeni")){
                setSelectType("vz.hv");
            }else if(detail.includes("fond")){
                setSelectType("vz.fond");
            }else if(detail.includes("zava") || detail.includes("záva")){
                setSelectType("cz.zavazky");
            }else if(detail.includes("uver") || detail.includes("úvěr")){
                setSelectType("cz.zavazky");
            }else if(detail.includes("budo") || detail.includes("poze") || amout >= 40000){
                setSelectType("dm.hmotne");
            }else if(amout < 40000){
                setSelectType("km.zasoby");
            }
        }
    }, [detail, amout, autoComplete])
    const addItem = (e) => {
        e.preventDefault();
        if (error === "no problem") {
            var types = "";
            types = selectType.split(".");
            setItem([
                ...item, {id: Math.random()*1000, type: types[0], subtype: types[1], detail: detail, cash: parseInt(amout)}
            ])
        }
    }
    return (
        <div>
            <div className="row">
                <form className="pl-5 col d-flex flex-column">
                    {/* pridat moznost generovani listu pomoci pole */}
                    <select className="p-1 mb-3 rounded" value={selectType} onChange={(e)=>{setSelectType(e.target.value)}} id="typeSelector">
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
                        <option value="vz.hv">vysledek</option>
                        <option value="vz.fond">Fondy</option>
                        {/* cizi zdroje = cz */}
                        <option className="bg-danger" value="cz.zavazky">závazky</option>
                        <option className="bg-danger" value="cz.uvery">Uvěry</option>
                    </select>
                    {/* input display information */}
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">Nazev zauctovani:</span>
                        </div>
                        <input className="form-control" type="text" placeholder="Nazev, který se zobrazí" value={detail} onChange={(e)=>(setDetail(e.target.value))} />
                    </div>
                    {/* input numeric */}
                    <div class="input-group mb-3 d-flex">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input min='0' className="rounded flex-fill" type="number" placeholder="Enter amout" value={amout} onChange={(e)=>{setAmout(e.target.value)}} />
                        <div class="input-group-append">
                            <span class="input-group-text">.00</span>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={addItem}>přidat</button>
                </form>
                <div className="toggle col">
                    <span className="btn text-white-50">
                        <label className="switch">
                            <input type="checkbox" id="showHelp" onChange={(e)=>{setShowHelp(!showHelp)}} value={showHelp} ></input>
                            <span className="slider round"></span>
                        </label>
                        <p>Napoveda</p>
                    </span>
                    <span className="btn text-white-50">
                        <label className="switch">
                            <input type="checkbox" id="showHelp" onChange={(e)=>{setAutoComplete(!autoComplete)}} value={autoComplete} ></input>
                            <span className="slider round"></span>
                        </label>
                        <p>Automaticky vyplnit</p>
                    </span>
                </div>
            </div>
            <div className="preview pt-3">
                <div className="text-center">
                    <span className="text-danger">
                        {error !== "no problem"? "chyba: "+error: "" }
                    </span>
                </div>
                <p>{info}</p>
            </div>
        </div>
    );
}

export default Add;
