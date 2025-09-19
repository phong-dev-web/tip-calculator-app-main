// select html
const inputBill = document.querySelector('#bill-amount')
const tipButtons = document.querySelectorAll('.tip-btn')
const numberOfPeople = document.querySelector('#people-count')
const customTip = document.querySelector('#custom-tip')
const valueTipAmount = document.querySelector('#tip-amount-value')
const valueTipTotal = document.querySelector('#total-value')
const reset = document.querySelector('#reset-btn')
// biến toàn cục 
let tipAmount = 0
let tipTotal = 0
let btnPercent = 0
let originalBill = 0 
let numberPeople = 1 
//  lấy bill  
inputBill.addEventListener('input', () => {
    originalBill = parseFloat(Number(inputBill.value));
    if (isNaN(originalBill))  {
        alert('vui lòng điền số');
        inputBill.value = ''
    };
});
// lấy people
numberOfPeople.addEventListener('input', () => { 
    numberPeople = parseInt(Number(numberOfPeople.value))
    if (isNaN(numberPeople) || numberPeople < 0) {
        alert('vui lòng điền số')
        numberOfPeople.value = '1'

    }
    calculator(originalBill, btnPercent, numberPeople)
    // thay tip and total
    if (tipAmount > 0 && numberOfPeople.value > 0) {
        valueTipAmount.textContent = "$" + Math.round(tipAmount)
        valueTipTotal.textContent = "$" + (originalBill + Math.round(tipAmount))
    }
})
// lấy text content của button và tính bill 
tipButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        // lấy số phần trăm phải tip
        let btnText = btn.textContent
        btnPercent = parseFloat(btnText)
        //tính tiền tip
        calculator(originalBill, btnPercent, numberPeople)
        //thay tip and total
        if (tipAmount > 0 && numberOfPeople.value > 0) {
            valueTipAmount.textContent = "$" + Math.round(tipAmount)
            valueTipTotal.textContent = "$" + (originalBill + Math.round(tipAmount))
        }
    })
})

customTip.addEventListener('input', () =>{
    if (isNaN(Number(customTip.value))) {
        alert('vui lòng viết số')
        customTip.value = ''
    } if (Number(customTip.value) > 0) {
        let customTipValue = customTip.value
        btnPercent = parseInt(customTipValue.replace('%', ''))
    }
    if (tipAmount > 0 && numberOfPeople.value > 0) {
        valueTipAmount.textContent = "$" + Math.round(tipAmount)
        valueTipTotal.textContent = "$" + (originalBill + Math.round(tipAmount))
    }
})
//  hàm tính toán 
function calculator(originalBill, btnPercent) {
    tipAmount = (originalBill * (btnPercent/100)) / numberPeople
}
// reset button
reset.addEventListener('click', () => {
    inputBill.value = ''
    numberOfPeople.value = '1'
    customTip.value = ''
    valueTipAmount.textContent = '$0.00'
    valueTipTotal.textContent = '$0.00'

    originalBill = 0
    btnPercent = 0
    tipAmount = 0
    numberPeople = 1
})