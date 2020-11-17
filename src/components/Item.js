import React from 'react';

const Item = ({element, setItem, item}) => {
    const deleteItem = (e) => {
        e.preventDefault();
        setItem(
            item.filter(el => el.id !== element.id)
        )
    }
    return (
        <span className="justify-content-between d-flex">
        {/* element {id, type, subtype, detail, cash} */}
            <p className="font-weight-bold">{element.detail.charAt(0).toUpperCase() + element.detail.slice(1)}</p>
            <p>
                <span className="pr-2">{element.cash.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                <button className="btn btn-danger" value={element.id} onClick={deleteItem}>X</button>
            </p>
        </span>
    );
}

export default Item;
