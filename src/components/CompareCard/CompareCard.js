import {Link} from 'react-router-dom';
import './CompareCard.css'



export default function  (props) {
    
    const priceForm = new Intl.NumberFormat();
    
    return (
    
        <div className="cart">
                <div className="cart_img"><Link to={`/product/${props.p.id}`}> <img src={props.p.img} alt=""/></Link></div>
                <div className="icon_cart">
                    <div className="ic_cart_comp"><div className="cart_href_copm"><img src="/icon/business-and-finance.png"
                                alt="" className="img_cr_copm"/></div></div>
                    <div className="ic_cart_fav"><div className="cart_href_fav" ><img src="/icon/add-to-favorites--v1.png"
                                alt="" className="img_cr_fav"/></div></div>
                </div>
                <div className="discr">
                    <div className="oil_category">{props.p.category}</div>
                    <div className="name_char"><Link to={`/product/${props.p.id}`} className="name_char_href"> {props.p.manufact} {props.p.name} {props.p.SAE}, {props.p.volume}</Link></div>
                    <div className="price">{priceForm.format(props.p.price)} ₽</div>
                    {/* <div className="but_bask"><button onClick={props.addOnBasket}>В корзину</button></div> */}
                
                
                </div>
        
        </div>    
    )
}