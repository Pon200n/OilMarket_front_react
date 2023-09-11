import { items } from '../components/products';
import {useHistory, useParams} from 'react-router-dom';

export function DiscriptionOil (props) {
    const router = useParams();
    // console.log(router);
    let item = items.find(item => item.id==router.id);
    // console.log(item.discr);
    
    for(let i=0; i<item.discr.length; i++)
    // console.log(item.discr[i])
    return (
        <div>
        <h2>Описание</h2>
            {item.discr?.map(d=>(<p>{d}</p>))}
        </div>
    )
}