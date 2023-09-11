import { format } from 'prettier';
import {Link} from 'react-router-dom';



export function Card (props) {
    
    const priceForm = new Intl.NumberFormat();
    
    return (
    
        <div className="cart">
                <div className="cart_img"><Link to={`/product/${props.item.id}`}> <img src={props.item.img} alt=""/></Link></div>
                <div className="icon_cart">
                    <div className="ic_cart_comp"><div className="cart_href_copm"><img src="/icon/business-and-finance.png"
                                alt="" className="img_cr_copm"/></div></div>
                    <div className="ic_cart_fav"><div className="cart_href_fav" ><img src="/icon/add-to-favorites--v1.png"
                                alt="" className="img_cr_fav"/></div></div>
                </div>
                <div className="discr">
                    <div className="oil_category">{props.item.category}</div>
                    <div className="name_char"><Link to={`/product/${props.item.id}`} className="name_char_href"> {props.item.manufact} {props.item.name} {props.item.SAE}, {props.item.volume}</Link></div>
                    <div className="price">{priceForm.format(props.item.price)} ₽</div>
                    <div className="but_bask"><button onClick={props.addOnBasket}>В корзину</button></div>
                <div className="bay"><a href="" className="bay_oneclick">Купить в один клик</a></div>
                
                </div>
        
        </div>    
    )
}

