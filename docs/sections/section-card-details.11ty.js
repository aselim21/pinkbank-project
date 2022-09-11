
module.exports = `
<form id="card-details-form" onsubmit="return validateForm()" action="/sections/section-done">
    <div class="form-multiple-rows">
        <label for="c-name">Cardholder Name</label>
        <input type="text" id="c-name" name="c-name" placeholder="Jane Appleseed" mandatory>
        <label for="c-number">Card Number</label>
        <input type="text" id="c-number" name="c-number" placeholder="1234 5678 9123 0000" maxlength="19"  mandatory onlyNumbers>
    </div>
    <div class="form-flex-box">
        <div class="form-flex-el">
            <label for="c-exp-date">Exp. Date (MM/YY)</label>
            <div class="form-grid-2x2" >
                <div>
                    <input type="text" id="c-exp-m" name="c-exp-date" placeholder="MM" maxlength="2" mandatory onlyNumbers>
                </div>
                <div>
                    <input type="text" id="c-exp-y" name="c-exp-date" placeholder="YY" maxlength="2" mandatory onlyNumbers>
                </div>
            </div>
        </div>
        <div class="form-flex-el">
            <label for="c-cvc">CVC</label>
            <input type="text" id="c-cvc" name="c-cvc" placeholder="123" maxlength="3" mandatory onlyNumbers>
        </div>
    </div>
    <input type="submit" value="Confirm" class="button-large">
</form>
<script src="/assets/scripts/card-details.js"></script>
`;



