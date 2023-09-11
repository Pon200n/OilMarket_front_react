import { useContext } from "react"
import { Context } from "../context"


export function CardFooter(){
    const[context, setContext] = useContext(Context);
    let totalBasketCount = context.reduce((sum,item)=>sum+item.count,0);
    let totalBasketPrice = context.reduce((sum,item)=>sum+item.priceTotal,0);
    console.log('context',context);

    const priceForm = new Intl.NumberFormat();
    
    let display;
    if (totalBasketCount>0){display='block'}
    else{display='none'};
    return (
        <div style={{display:display}}>
        <div className="cardFooter" >
            <div className="cardFooter_totalCount"><h4>В корзине сейчас товаров {totalBasketCount} ед.</h4></div>
            <div className="cardFooter_totalBasketPrice"><h4>на сумму {priceForm.format(totalBasketPrice)} ₽</h4></div>
        </div>
        </div>
    )
}