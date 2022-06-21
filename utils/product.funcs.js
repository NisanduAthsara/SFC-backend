const Org = require('../models/orginization.model')

async function checkOrgId(id){
    try{
        const orga = await Org.findById(id)
        if(orga){
            return false
        }else{
            return true
        }
    }catch(err){
        return true
    }
    
}

async function checkBrand(id,brand){
    const fuel = ['IOC','Ceypetco']
    const gas = ['Litro','Laughs']
    const milk_powder = ['Anchor','Highland','Raththi','Pelawatta']
    try{
        const org = await Org.findById(id)
        if(org){
            const sellItem = org.sellItem
            if(sellItem == 'fuel'){
                if(fuel.includes(brand)){
                    return false
                }else{
                    return true
                }
            }
            if(sellItem == 'gas'){
                if(gas.includes(brand)){
                    return false
                }else{
                    return true
                }
            }
            if(sellItem == 'milk powder'){
                if(milk_powder.includes(brand)){
                    return false
                }else{
                    return true
                }
            }
        }else{
            return true
        }
    }catch(err){
        return true
    }
}


exports.checkProduct = async(productName, brand, status, organizationId, imgLink, nextComingDate)=>{
    const status_arr = ['Available','Not Available','Final Bit']
    const isIdExcists = await checkOrgId(organizationId)
    const isBrandValid = await checkBrand(organizationId,brand)
    return new Promise((resolve,reject)=>{
        if(!productName || typeof productName != "string"){
            reject("Invalid Product Name");
        }

        if(!status || !status_arr.includes(status)){
            reject("Invalid Status");
        }

        if(!imgLink || typeof imgLink != "string"){
            reject("Invalid Image Link");
        }

        if(imgLink.length < 5){
            reject("Invalid Image Link");
        }

        if(!nextComingDate || typeof nextComingDate != "string"){
            reject("Invalid Date");
        }

        if(!organizationId || isIdExcists){
            reject("Invalid ID");
        }

        if(!brand || isBrandValid){
            reject("Invalid Brand");
        }
    
        resolve()
    })
}