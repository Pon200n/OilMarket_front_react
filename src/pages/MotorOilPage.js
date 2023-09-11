import { items } from "../components/products";
import { Card } from "../components/Card"
import { Context } from "../context";
import React, { useContext } from "react"



export function MotorOilPage(){
    const [context, setContext] = useContext(Context);
    
    function add(product){
        let findProd = context.find(item=>item.id===product.id)
        if(product.id===findProd?.id){alert('Этот товар уже добавлен, увеличить колличество экземпляров можно в корзине')}
        else{context.push({...product})
            setContext([...context])
        }
    }
    
    let motorOilItem = items.filter(item => item.category==='Масло моторное')
    console.log(motorOilItem)

    return (
        <>
        <h3>Моторные масла {motorOilItem.length} ед.</h3>
        {motorOilItem.map(xProd => <Card key={xProd.id} item={xProd} addOnBasket={()=>add(xProd)} /> )}

        </>
    )
}