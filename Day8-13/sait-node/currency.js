const canadianDollar = 0.75;

function roundTwo(amount) {
    return Math.round(amount * 100) / 100;
}

exports.canadianToUS = candaian => roundTwo(candaian * canadianDollar);
exports.USToCanadian = us => roundTwo(us / canadianDollar);