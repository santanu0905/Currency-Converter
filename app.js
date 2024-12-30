const baseUrl='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/'
const dropdowns=document.querySelectorAll('.dropdown select');
const btn=document.querySelector('form button');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==='from' && currCode==='USD'){
            newOption.selected='selected';
        }else if(select.name==='to' && currCode==='INR'){
            newOption.selected='selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(ele)=>{
    let currCode=ele.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=ele.parentElement.querySelector('img');
    img.src=newSrc;
}

btn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if(amtVal ==='' || amtVal<1){
        amtVal=1;
        amount.value='1';
    }
    exchangeRate(amtVal,fromCurr,toCurr);
})

const exchangeRate=async (amt,fromCurrency,toCurrency) =>{
    const url=`${baseUrl}${fromCurrency.value.toLowerCase()}.json`
    const response=await fetch(url);
    const data= await response.json();

    const rate=data[fromCurrency.value.toLowerCase()]
    const exchangeRate=rate[toCurrency.value.toLowerCase()]

    let finalAmount= amt*exchangeRate;
    let finalAmtInput=document.querySelector('.final-amount input');
    finalAmtInput.value=finalAmount;
}

//Using promise chaining--
// function exchangeRate(amount,fromCurrency,toCurrency){
//     const url=`${baseUrl}${fromCurrency.toLowerCase()}.json`
//     fetch(url).then((response)=>{
//         return response.json();
//     }).then((data)=>{
//         const rate=data[fromCurrency.toLowerCase()]

//         const exchangeRate=rate[toCurrency.toLowerCase()]

//         console.log(`From currency:-\n${rate}`)
//         console.log(`To currency:-\n${exchangeRate}`)
//         const exchangeAmount=amount*exchangeRate
//         console.log(`Exchange amount rate:-${exchangeAmount}`)
//     })
// }

// exchangeRate(80,'usd','inr')