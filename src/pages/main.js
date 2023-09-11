import React, { useContext } from "react"
import { Card } from "../components/Card"
import { items } from "../components/products"
import { Context } from "../context"
import { useState } from "react"

let counter =1;

export function Main () {

    
    const [context, setContext] = useContext(Context);
    let [itemsPage, setItems] = useState(items);
    
    

    function add(product){
        // context.push(product)
        let findProd = context.find(item=>item.id===product.id)
        // console.log(a.id)
        // console.log(product.id)
        if(product.id===findProd?.id){alert('Этот товар уже есть в корзине')}
        else{context.push({...product})
            // console.log(product)

            
            setContext([...context])
            // setContext(context)
            
        }
    }
    
    

    function sort (){
        itemsPage = 
        itemsPage.sort((a, b)=> {
            return (a.price-b.price)*counter
        })
        counter*=-1
        setItems([...itemsPage])
        console.log(counter)
    }
    function sortHi (){
        itemsPage = 
        itemsPage.sort((a, b)=> {
            return b.price-a.price
        })
        setItems([...itemsPage])
        console.log([...itemsPage])
    }
    function sortLow (){
        itemsPage = 
        itemsPage.sort((a, b)=> {
            return a.price-b.price
        })
        setItems([...itemsPage])
        console.log([...itemsPage])
    }
    
    function sortLH(){
        let a = itemsPage[1]
        let b = itemsPage[2]
        let c = a.price-b.price
        console.log(a.price)
        if(c>0){sortLow()}else{sortHi()}
    }
    


    return (
    
        <React.Fragment>
            <div>
                <button className="c-button" onClick={sort}>сортировать low</button>
                <button className="c-button" onClick={sortHi}>сортировать hi</button>
                <button className="c-button" onClick={sortLH}>сортировать по цене</button>
            </div>
            
            
        {itemsPage.map(xProd => <Card key={xProd.id} item={xProd} addOnBasket={()=>add(xProd)} /> )}
        </React.Fragment>
    
    
    )
}


