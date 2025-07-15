const RATE = 0.08262;
const YEARS = [10, 20, 30];

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
});

function fvRecurring(pmt, freq, years, rate) {
    const r = rate / freq;
    const n = freq * years;
    return pmt * (Math.pow(1 + r, n) - 1) / r;
}

document.getElementById("calcForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const pv = parseFloat(document.getElementById("present").value);
    const freq = parseFloat(document.getElementById("multiplierSelect").value);

    if (isNaN(pv) || isNaN(freq) || pv <= 0 || freq <= 0) return;

    const [fv10, fv20, fv30] = YEARS.map(years =>
    fvRecurring(pv, freq, years, RATE)
    );

    document.getElementById("result").innerHTML = `
    <h3>Estimated value if you had invested instead:<h3><br>
    After 10 years: <strong>${formatter.format(fv10)}</strong><br>
    After 20 years: <strong>${formatter.format(fv20)}</strong><br>
    After 30 years: <strong>${formatter.format(fv30)}</strong>
    `;
});