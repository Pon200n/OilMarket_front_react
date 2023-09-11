




export default class BasketStore {
    constructor() {
        this._product = [{
            id: 1,
            name: '8100 Eco Lite',
            category:'Масло моторное',
            img: '/oil_img/motul-eco-lite-5w-30-4l.jpg',
            imgCard:'/oil_img/CARDmotul-eco-lite-5w-30-4l (1).jpg',
            price: 4940,          
            manufact: 'MOTUL',
            countryManufact: 'France',
            baseOilType: 'Синтетическое',
            engineType: 'Бензиновый',
            SAE: '5w30',
            API: 'SP-RC',
            ILSAC: 'GF-6A',
            tolerances: 'GM Dexos1',
            volume: '4л',
            reccomend: '	Chrysler MS 6395, Ford WSS-M2C929-A, Ford WSS-M2C946-A, Ford WSS-M2C946-B1, General Motors GM 4718 M, General Motors GM 6094 M, Fiat 9.55535-CR1, Acura, Dodge, Genesis, Honda, Hyundai, Infiniti, Kia, Lexus, Mazda, Mitsubishi, Nissan, Subaru, Toyota',
            discr: ['100% синтетическое моторное масло с энергосберегающими свойствами специально разработано для современных мощных бензиновых двигателей легковых автомобилей, в т.ч. с турбонаддувом и непосредственным впрыском, где предполагается использование масел с низким коэффициентом трения и низкой (≥ 2.9 мПа.с) HTHS вязкостью (вязкость при высокой температуре и высокой скорости сдвига).','Предназначено для современных двигателей, требующих масел с классом вязкости SAE 5W-30 и энергосберегающими свойствами (соответствие стандартам API SP-RC, API SP и/ или ILSAC GF-6a).','Одобрено GM dexos1™ GEN2 для всех новых бензиновых двигателей GM: BUICK, CADILLAC, CHEVROLET, GM, GMC, OPEL и VAUXHALL.','Совместимо с каталитическими нейтрализаторами.','Данный тип масла может быть не предназначен для использования в некоторых двигателях. В случае сомнений, обратитесь к инструкции по эксплуатации транспортного средства.'],
            characterArr:[{name:'Страна производитель',value:'Франция'},{name:'Тип базового масла',value:'синтетическое'}]
        
        },
        {
            id: 2,
            name: 'HIGHTEC SYNT RS D1',
            category:'Масло моторное',
            img: '/oil_img/rowe-hightec-synt-rs-d1-5w30-4l-new.jpg',
            price: 4850,        
            manufact: 'ROWE',
            countryManufact: 'Германия',
            baseOilType: 'Синтетическое',
            engineType: 'Бензиновый',
            SAE: '5w30',
            API: 'RC,SN',
            ILSAC: 'GF-5',
            tolerances: 'GM Dexos1',
            volume: '4л',
            reccomend:'	Chrysler MS-6395 (T), Ford WSS-M2C929-A/946-A, Ford WSS-M2C945-A, GM 6094M/4718M, Honda/Acura HTO-06',
            discr: ['100% синтетическое моторное масло с энергосберегающими свойствами специально разработано для современных мощных бензиновых двигателей легковых автомобилей, в т.ч. с турбонаддувом и непосредственным впрыском, где предполагается использование масел с низким коэффициентом трения и низкой (≥ 2.9 мПа.с) HTHS вязкостью (вязкость при высокой температуре и высокой скорости сдвига).','Предназначено для современных двигателей, требующих масел с классом вязкости SAE 5W-30 и энергосберегающими свойствами (соответствие стандартам API SP-RC, API SP и/ или ILSAC GF-6a).','1'],
            
        }]

        
    }


    
}