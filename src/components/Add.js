import React,{useState,useEffect} from 'react';

const Add = ({item, setItem}) => {
    const [selectType, setSelectType] = useState("dm.budova");
    const [amout, setAmout] = useState(0);
    const [detail, setDetail] = useState("budova");
    const [error, setError] = useState("no problem");

    useEffect(()=>{
        if(detail === "" && (amout === "" || parseInt(amout) === 0 || isNaN(parseInt(amout)))){
            setError("Musíte vyplnit detail a zadat vyšší částku.")
        }else if(detail === ""){
            setError("Zadejte detaily.")
        }else if(amout === undefined || parseInt(amout) === 0 || isNaN(parseInt(amout))){
            setError("Boužel zde musí být nějaká částka.")
        }else{
            setError("no problem")
        }
        
    }, [detail, amout])
    
    const addItem = (e) => {
        e.preventDefault();
        if (error === "no problem") {
            const types = selectType.split(".");
            setItem([
                ...item, {id: Math.random()*1000, type: types[0], subtype: types[1], detail: detail, cash: parseInt(amout)}
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
                <option className="bg-secondary" value="dm.budova">Budova</option>
                <option className="bg-secondary" value="dm.stroj">Stroj</option>
                <option className="bg-secondary" value="dm.soft">Software</option>
                {/* kratkodoby majetek = km */}
                <option className="bg-success" value="km.z">Zasoby</option>
                <option className="bg-success" value="km.b-ucet">Bankovni ucet</option>
                <option className="bg-success" value="km.pp">Penize v pokladne</option>
                <option className="bg-success" value="km.o">Zakaznici</option>
                <option className="bg-success" value="km.p">Pohledavky</option>
                {/* vlastni zdroje = vz */}
                <option value="vz.hv">Hospodarsky vysledek</option>

                {/* cizi zdroje = cz */}
                <option className="bg-danger" value="cz.bu">bankovni uver</option>
                <option className="bg-danger" value="cz.dane">Dane - Financi urad</option>
                <option className="bg-danger" value="cz.d">dluzne</option>
            </select>
            <input className="rounded" type="text" placeholder="details" value={detail} onChange={(e)=>(setDetail(e.target.value))} />
            <input min='0' className="rounded" type="number" placeholder="Enter amout" value={amout} onChange={(e)=>{setAmout(e.target.value)}} />
            <button className="rounded" type="submit" onClick={addItem}>přidat</button>
        </form>
        <p>{error}</p>
    </div>
    );
}

export default Add;
