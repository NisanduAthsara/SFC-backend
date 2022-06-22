exports.checkProductType = (item)=>{
    const fuel = ['IOC','Ceypetco']
    const gas = ['Litro','Laughs']
    const milk_powder = ['Anchor','Highland','Raththi','Pelawatta']

    if(fuel.includes(item)){
        return 'fuel'
    }

    if(gas.includes(item)){
        return 'gas'
    }

    if(milk_powder.includes(item)){
        return 'milk_powder'
    }
}