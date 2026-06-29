const billInput = document.getElementById('bill-amount');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people-count');
const tipBtns = document.querySelectorAll('.tip-btn');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');

const billError = document.getElementById('bill-error');
const peopleError = document.getElementById('people-error');

let billValue = 0;
let tipValue = 0;
let peopleValue = 1;

// Format Currency
const formatCurrency = (value) => {
    return '$' + value.toFixed(2);
};

// Calculate and Render
const calculate = () => {
    if (peopleValue >= 1 && billValue >= 0) {
        const tipPerPerson = (billValue * (tipValue / 100)) / peopleValue;
        const totalPerPerson = (billValue / peopleValue) + tipPerPerson;

        tipAmountDisplay.textContent = formatCurrency(tipPerPerson);
        totalAmountDisplay.textContent = formatCurrency(totalPerPerson);
    }
};

// Error handling and active state management
const validateInputs = () => {
    let isValid = true;
    
    // Check Bill
    if (billInput.value !== '' && billValue < 0) {
        billError.textContent = "Can't be negative";
        billError.classList.add('visible');
        billInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        billError.classList.remove('visible');
        billInput.parentElement.classList.remove('error');
    }

    // Check People
    if (peopleInput.value !== '' && peopleValue < 1) {
        peopleError.textContent = "Can't be zero";
        peopleError.classList.add('visible');
        peopleInput.parentElement.classList.add('error');
        isValid = false;
    } else {
        peopleError.classList.remove('visible');
        peopleInput.parentElement.classList.remove('error');
    }

    // Toggle Reset Button
    if (billInput.value !== '' || customTipInput.value !== '' || peopleInput.value !== '1' || tipValue !== 0) {
        resetBtn.disabled = false;
    } else {
        resetBtn.disabled = true;
    }

    if (isValid) calculate();
};

// Event Listeners
billInput.addEventListener('input', (e) => {
    billValue = parseFloat(e.target.value) || 0;
    validateInputs();
});

peopleInput.addEventListener('input', (e) => {
    peopleValue = parseInt(e.target.value) || 0;
    validateInputs();
});

tipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active from all
        tipBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        e.target.classList.add('active');
        // Clear custom tip
        customTipInput.value = '';
        
        tipValue = parseFloat(e.target.dataset.val);
        validateInputs();
    });
});

customTipInput.addEventListener('input', (e) => {
    // Remove active from buttons
    tipBtns.forEach(b => b.classList.remove('active'));
    
    tipValue = parseFloat(e.target.value) || 0;
    validateInputs();
});

resetBtn.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '1';
    
    billValue = 0;
    tipValue = 0;
    peopleValue = 1;
    
    tipBtns.forEach(b => b.classList.remove('active'));
    
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    
    billError.classList.remove('visible');
    peopleError.classList.remove('visible');
    billInput.parentElement.classList.remove('error');
    peopleInput.parentElement.classList.remove('error');
    
    resetBtn.disabled = true;
});

// Set defaults
peopleInput.value = '1';
