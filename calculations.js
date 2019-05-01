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

    const INPUT_FORM_IDS = ["#wf-form-Mortgage-Calculator",
                            "#wf-form-Credit-Card-Calculator",
                            "#wf-form-Interest-Calculator"];

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
                                '#mtg-interestRate',
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
    // simple interest calculation
    function getSimpleInterestCalc(inputParams)
    {
        const input_loanAmount = Number(inputParams[0]);
        const input_loanLengthInMonths = Number(inputParams[1]);
        const input_interestRate = Number(inputParams[2]) / 100;
        // console.log("simple interest calculator!");
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
        const input_interestRate = Number(inputParams[2]) / 100;

        const result_creditCardBalance = input_creditCardBalance;
        const result_monthyPaymentAmount = input_monthyPaymentAmount;
        let result_numberOfMonthlyPayments;
        const result_interestRate = input_interestRate;
        let result_totalPayments;
        let result_totalInterest;

        if(input_monthyPaymentAmount == 0)
        {
			result_numberOfMonthlyPayments = "-";
        }
        else
        {
			result_numberOfMonthlyPayments = NPER(input_interestRate / 12, 
				input_monthyPaymentAmount,
				-input_creditCardBalance);
            // result_numberOfMonthlyPayments = result_numberOfMonthlyPayments.toFixed(2);
        }

        // console.log("result_numberOfMonthlyPayments:", result_numberOfMonthlyPayments);

        if(result_numberOfMonthlyPayments == "-" || result_numberOfMonthlyPayments == 0)
        {
			result_totalInterest = "-";
			result_totalPayments = input_creditCardBalance;
        }
        else
        {
			result_totalInterest = input_monthyPaymentAmount * result_numberOfMonthlyPayments - input_creditCardBalance;
			result_totalPayments = result_totalInterest + input_creditCardBalance;
        }

        // console.log("result_totalInterest:", result_totalInterest);
		// console.log("result_totalPayments:", result_totalPayments);

		// reformat variables
		if(result_numberOfMonthlyPayments != "-")
		{
			result_numberOfMonthlyPayments = result_numberOfMonthlyPayments.toFixed(2);
			//result_numberOfMonthlyPayments = Math.round(result_numberOfMonthlyPayments);

		}
		if(result_totalInterest != "-")
		{
			result_totalInterest = numeral(result_totalInterest).format('0,0.00');
		}

        return [numeral(result_creditCardBalance).format('0,0.00'),
            result_monthyPaymentAmount, 
            result_numberOfMonthlyPayments,
            numeral(result_interestRate).format('0.00%'),
            numeral(result_totalPayments).format('0,0.00'), 
            result_totalInterest];
    }

    // mortgage calculation
    function getMortgageCalc(inputParams)
    {
        const input_loanValue = Number(inputParams[0]);
        const input_downPayment = Number(inputParams[1]);
        const input_interestRate = Number(inputParams[2]);
        const input_loanTerm = Number(inputParams[3]);
        const input_propertyTax = Number(inputParams[4]);
        const input_homeInsurance = Number(inputParams[5]);
        const input_HOAFees = Number(inputParams[6]);

        // console.log("input_loanValue", input_loanValue);
        // console.log("input_downPayment", input_downPayment);
        // console.log("input_interestRate", input_interestRate);
        // console.log("input_loanTerm", input_loanTerm);
        // console.log("input_propertyTax", input_propertyTax);
        // console.log("input_homeInsurance", input_homeInsurance);
        // console.log("input_HOAFees", input_HOAFees);
        
        // const input_loanValue = Number(170000);
        // const input_downPayment = Number(12000);
        // const input_interestRate = Number(4.25);
        // const input_loanTerm = Number(30);
        // const input_propertyTax = Number(1200);
        // const input_homeInsurance = Number(1000);
        // const input_HOAFees = Number(50);

        const B4 = input_loanValue;
        const B5 = input_downPayment;
        const B6 = input_interestRate;
        const B7 = input_loanTerm;
        const B8 = input_propertyTax;
        const B9 = input_homeInsurance;
        const B10 = input_HOAFees;

        const B13 = B6/1200;
        const C13 = Math.pow((1+B13), (B7*12));
        const D13 = ((B13*C13)/(C13-1))*(B4-B5);
        const E13 = D13+(B8/12)+(B9/12)+B10;
        
        const B14 = E13;//((((B6/1200)*(1+(B6/1200))^(B7*12))/((1+(B6/1200))^(B7*12)-1))*(B4-B5))+(B8/12)+(B9/12)+B10;
        const B15 = B5;
        const B16 = B5/B4;
        const B17 = B8/12;
        const B18 = (B6/1200)*12;
        const B19 = D13*12;
        const B20 = B8*B7;
        const B21 = B9*B7;
        const B22 = (D13*(B7*12))-(B4-B5);
        const B23 = B22+(B4-B5);
        
        const output_paymentMonthly =       B14
        const output_downPayment =          B15;
        const output_downPaymentPercent =   B16 * 100;
        const output_monthlyTaxPaid =       B17;
        const output_interestRate =         B18 * 100;
        const output_annualPaymentAmount =  B19;
        const output_totalTaxPaid =         B20;
        const output_totalHomeInsurance =   B21;
        const output_totalInterestPaid =    B22;
        const output_totalPayment =         B23;


        return [numeral(output_paymentMonthly).format('0,0.00'), 
            numeral(output_downPayment).format('0,0.00'), 
            numeral(output_downPaymentPercent).format('0.00'), 
            numeral(output_monthlyTaxPaid).format('0,0.00'), 
            numeral(output_interestRate).format('0.00'),
            numeral(output_annualPaymentAmount).format('0,0.00'), 
            numeral(output_totalTaxPaid).format('0,0.00'),
            numeral(output_totalHomeInsurance).format('0,0.00'), 
            numeral(output_totalInterestPaid).format('0,0.00'), 
            numeral(output_totalPayment).format('0,0.00')]
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
            // console.log("SimpleInterest");
        }
        else if(calcType == 1)
        {
            setVariablesForCreditCard();
            // console.log("Credit Card");
        }
        else if(calcType == 2)
        {
            setVariablesForMortgage();
            // console.log("Mortgage");
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
        // console.log(resultArray);
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

    ///////////////////////////////////////////////////////////////
    // Financial calculations

    //////////////////Credit Card calculations/////////////////////
    function NPER(rate, payment, present, future, type) {
        // Initialize type
        var type = (typeof type === 'undefined') ? 0 : type;
      
        // Initialize future value
        var future = (typeof future === 'undefined') ? 0 : future;
      
        // Evaluate rate and periods (TODO: replace with secure expression evaluator)
        rate = eval(rate);
      
        // Return number of periods
        var num = payment * (1 + rate * type) - future * rate;
        var den = (present * rate + payment * (1 + rate * type));
        return Math.log(num / den) / Math.log(1 + rate);
      }



    //////////////////Mortgage calculations///////////////////////


});
