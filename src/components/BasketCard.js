import {Link} from 'react-router-dom';



export function BasketCard (props) {
    
    const priceForm = new Intl.NumberFormat();
    
    let chengeValue = props.chengeValue;
    return (
        
        
    <div>
    <div className="wrapper_basket">
            
        <div className="basket_img">
            <Link to={`/product/${props.p.id}`}><img  src={props.p.img} alt=""/></Link>
        </div>
        
        <div className="basket_product_name">
            <Link to={`/product/${props.p.id}`}className="name_char_href">
                {props.p.manufact} {props.p.name}, {props.p.volume} 
            </Link>
        </div>
        
        <div className="basket_price">
            {priceForm.format(props.p.price)} ₽
        </div>
        
        <div className="basket_quantity">
                <div className="basket_quantity_inner">
                <button className="decrement" onClick={props.dicr}>-</button>
                        {/* <span>{props.p.count}</span> */}
                        <input type={'number'} value={props.p.count} onChange={event=>chengeValue(props.p.id,event.target.value)} className="quantity_input"></input> 
                <button className="increment" onClick={props.incr}>+</button>
                
            </div>
        </div>
        <div className="basket_sum">
            {priceForm.format(props.p.priceTotal)} ₽
        </div>
        <div className="basket_button_delete">
            <button className="button_delete" onClick={props.deleteFromBasket}>X Удалить</button>
            
        </div> 
    </div>    
    </div>
    
    )
}