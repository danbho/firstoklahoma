$(document).ready(function(){
    // common constants
    const FAIL_FORM = ".w-form-fail";
    const SUCCESS_FORM = ".w-form-done";
    const FAIL_MSG_BOX = ".w-form-fail>div";

    const FLOAT_TYPE_STR = "float";
    const INTEGER_TYPE_STR = "integer";

    const CALC_TYPES = ["simple_interest",
                        "credit_card",
                        "mortgage"];

    const INPUT_FORM_IDS = ["form#wf-form-Mortgage-Calculator:first",
                            "#wf-form-Credit-Card-Calculator",
                            "form#wf-form-Mortgage-Calculator:last"];

    // calculator specific elements
    let INPUT_FORM = "#wf-form-Credit-Card-Calculator";

    let INPUT_ELEMENT_IDS = [ INPUT_FORM + ' #Credit-Card-Balance',
                                INPUT_FORM + ' #Monthly-Payment',
                                INPUT_FORM + ' #Interest-Rate-5' ];

    let OUTPUT_ELEMENT_IDS = [ '#cc-balance',
                                '#cc-monthly',
                                '#cc-payment-number',
                                '#cc-interest-rate',
                                '#cc-total-payment',
                                '#cc-total-interest' ];

    let DATA_TYPES_FOR_INPUTS = [ "float", "float", "float" ];
    let VALIDATION_ERROR_MSGS = [ "Please enter correct credit card balance",
                                    "Please enter correct monthly payment amount",
                                    "Please enter correct interest rate" ];

    let CALC_TYPE = CALC_TYPES[1];

    // setAllVariables for simple interest
    function setVariablesForSimpleInterest(){
        INPUT_FORM = INPUT_FORM_IDS[0];

        INPUT_ELEMENT_IDS = [ INPUT_FORM + ' #Loan-Amount',
                                INPUT_FORM + ' #Payment-Amount-2',
                                INPUT_FORM + ' #Interest-Rate-6' ];
    
        OUTPUT_ELEMENT_IDS = [ '#interest-amount',
                                '#payment-amount',
                                '#payment-number',
                                '#interest-rate',
                                '#total-payment',
                                '#total-interest' ];
    
        DATA_TYPES_FOR_INPUTS = [ "float", "float", "float" ];
        VALIDATION_ERROR_MSGS = [ "Please enter correct loan amount",
                                    "Please enter correct loan length in month",
                                    "Please enter correct interest rate" ];
    
        CALC_TYPE = CALC_TYPES[0];
    }

    // setAllVariables for credit card
    function setVariablesForCreditCard(){
        INPUT_FORM = INPUT_FORM_IDS[1];

        INPUT_ELEMENT_IDS = [ INPUT_FORM + ' #Credit-Card-Balance',
                                    INPUT_FORM + ' #Monthly-Payment',
                                    INPUT_FORM + ' #Interest-Rate-5' ];
    
        OUTPUT_ELEMENT_IDS = [ '#cc-balance',
                                '#cc-monthly',
                                '#cc-payment-number',
                                '#cc-interest-rate',
                                '#cc-total-payment',
                                '#cc-total-interest' ];
    
        DATA_TYPES_FOR_INPUTS = [ "float", "float", "float" ];
        VALIDATION_ERROR_MSGS = [ "Please enter correct credit card balance",
                                    "Please enter correct monthly payment amount",
                                    "Please enter correct interest rate" ];
    
        CALC_TYPE = CALC_TYPES[1];
    }

    // setAllVariables for morgage
    function setVariablesForMortgage(){
        INPUT_FORM = INPUT_FORM_IDS[2];

        INPUT_ELEMENT_IDS = [ INPUT_FORM + ' #Loan-Value-3',
                            INPUT_FORM + ' #Down-Payment-2',
                            INPUT_FORM + ' #Interest-Rate-7',
                            INPUT_FORM + ' #Loan-Term-Years-2',
                            INPUT_FORM + ' #Property-Tax-2', 
                            INPUT_FORM + ' #Home-Insurance-2',
                            INPUT_FORM + ' #HOA-Fees-2'  ];
    
        OUTPUT_ELEMENT_IDS = [ '#mtg-monthly',
                                '#mtg-downPayment-amount',
                                '#mtg-downPayment-percent',
                                '#mtg-moTax',
                                '#interestRate',
                                '#mtg-annualPayment',
                                '#mtg-totalTax',
                                '#mtg-totalInsurance',
                                '#mtg-totalInterest',
                                '#mtg-TotalAmount' ];
    
        DATA_TYPES_FOR_INPUTS = [ "float", "float", "float", "float", "float", "float", "float" ];
        VALIDATION_ERROR_MSGS = [ "Please enter correct loan value",
                                    "Please enter correct down payment",
                                    "Please enter correct interest rate",
                                    "Please enter correct loan term",
                                    "Please enter correct property tax",
                                    "Please enter correct home insurance",
                                    "Please enter correct HOA fees" ];
    
        CALC_TYPE = CALC_TYPES[2];
    }

    // Capture wf-form-Credit-Card-Calculator form action
    $(INPUT_FORM_IDS[0]).submit(function(e){
        // hook submit action and stop it from propagating
        e.preventDefault();
        e.stopPropagation();

        doCalculationProcess(0);
    })

    $(INPUT_FORM_IDS[1]).submit(function(e){
        // hook submit action and stop it from propagating
        e.preventDefault();
        e.stopPropagation();

        doCalculationProcess(1);
    })

    $(INPUT_FORM_IDS[2]).submit(function(e){
        // hook submit action and stop it from propagating
        e.preventDefault();
        e.stopPropagation();

        doCalculationProcess(2);
    })

    // root function for overal calculation process
    function doCalculationProcess(calcType){
        // set variables
        if(calcType == 0)
        {
            setVariablesForSimpleInterest();
        }
        else if(calcType == 1)
        {
            setVariablesForCreditCard();
        }
        else if(calcType == 2)
        {
            setVariablesForMortgage();
        }

        // fetch input values from form
        const inputStrArray = fetchInputs();
        
        // validate and show validation error message or calculation result
        if(!validateInputs(inputStrArray))
        {
            showFailBox();
        }
        else
        {
            //calcuate and show result on success form
            fillResultLabels(getCalculation(inputStrArray));
            showResultBox();
        }
    }

    // show warning box
    function showFailBox()
    {
        $(INPUT_FORM).siblings(SUCCESS_FORM).hide();
        $(INPUT_FORM).siblings(FAIL_FORM).show();
    }

    // show result box
    function showResultBox()
    {
        $(INPUT_FORM).hide();
        $(INPUT_FORM).siblings(SUCCESS_FORM).show();
        $(INPUT_FORM).siblings(FAIL_FORM).hide();
    }

    // fetch input values based on ID constants
    function fetchInputs() {
        let inputsArray = [];

        INPUT_ELEMENT_IDS.forEach((item, index) => {
            inputsArray.push($(item).val());
        })

        return inputsArray;
    }

    // validators
    // check if input values are positive and valid integer or float
    function isPositiveInteger(numStr)
    {
        return /^\d+$/.test(numStr);
    }
    function isPositiveFloat(numStr)
    {
        return /^[\d.]+$/.test(numStr);
    }

    // show results to success box
    function fillResultLabels(resultArray)
    {
        console.log(resultArray);
        resultArray.forEach((item, index) => {
            $(INPUT_FORM).parent().find(SUCCESS_FORM).find(OUTPUT_ELEMENT_IDS[index]).text(resultArray[index]);
        })
    }

    // do calculations
    function getCalculation(inputParams)
    {
        if(CALC_TYPE == CALC_TYPES[0])
        {
            // simple interest calculation
            return getSimpleInterestCalc(inputParams);
        }
        else if(CALC_TYPE == CALC_TYPES[1])
        {
            // credit card card calculation
            return getCreditCardCalc(inputParams);
        }
        else if(CALC_TYPE == CALC_TYPES[2])
        {
            // mortgate calculation
            return getMortgageCalc(inputParams);
        }
    }

    // simple interest calculation
    function getSimpleInterestCalc(inputParams)
    {
        const input_loanAmount = Number(inputParams[0]);
        const input_loanLengthInMonths = Number(inputParams[1]);
        const input_interestRate = Number(inputParams[2]) / 100;

        const result_principalAmount = input_loanAmount;
        // const result_paymentAmount = (result_principalAmount + result_totalInterestRate) / result_numberOfPaymentsToPayOff;
        const result_numberOfPaymentsToPayOff = input_loanLengthInMonths;
        const result_interestRate = input_interestRate;
        const result_totalPayments = input_loanLengthInMonths;
        const result_totalInterestRate = input_loanAmount * (input_loanLengthInMonths / 12) * input_interestRate;

        const result_paymentAmount = (result_principalAmount + result_totalInterestRate) / result_numberOfPaymentsToPayOff;

        return [numeral(result_principalAmount).format('$0,0.00'), 
            numeral(result_paymentAmount).format('$0,0.00'), 
            result_numberOfPaymentsToPayOff,
            numeral(result_interestRate).format('0.00%'), 
            result_totalPayments, 
            numeral(result_totalInterestRate).format('$0,0.00')];
    }

    // credit card calculation
    function getCreditCardCalc(inputParams)
    {
        const input_creditCardBalance = Number(inputParams[0]);
        const input_monthyPaymentAmount = Number(inputParams[1]);
        const input_interestRate = Number(inputParams[2]);

        const result_creditCardBalance = numeral(input_creditCardBalance).format('0,0.00');
        const result_monthyPaymentAmount = input_monthyPaymentAmount;
        const result_numberOfMonthlyPayments = 53;
        const result_interestRate = numeral(input_interestRate).format('0,0.00');
        const result_totalPayments = numeral(2654.44).format('0,0.00');
        const result_totalInterest = numeral(654.44).format('0,0.00');

        return [result_creditCardBalance, 
            result_monthyPaymentAmount, 
            result_numberOfMonthlyPayments, 
            result_interestRate, 
            result_totalPayments, 
            result_totalInterest];
    }

    // mortgage calculation
    function getMortgageCalc(inputParams)
    {
        return ["2aa", '2bb', '2cc', '2dd', '2ee','2tt','2tt','2tt','2tt','2ggg']
    }

    // check validation of all input fields
    function validateInputs(inputsArray)
    {
        return !inputsArray.some((inputItem, index)=>{
            return !validateInput(inputItem, DATA_TYPES_FOR_INPUTS[index], VALIDATION_ERROR_MSGS[index])
        })
    }

    // validate input
    function validateInput(strValue, validateType, errorMsg) {
        if(validateType == FLOAT_TYPE_STR)
        {
            // Validate for float
            if(!isPositiveFloat(strValue))
            {    
                setErrorMessage(errorMsg);
                return false;
            }
        }
        else if(validateType == INTEGER_TYPE_STR) 
        {
            // validate for integer
            if(!isPositiveInteger(strValue))
            {
              popUpErrorMsg(errorMsg);
              return false;
            }
        }

        return true;
    }

    // set proper error message in warning box
    function setErrorMessage(errorMsg)
    {
        $(INPUT_FORM).parent().find(FAIL_MSG_BOX).text(errorMsg);
    }

});
