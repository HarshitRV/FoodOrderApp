const delay = (req, res, next) => {
    setTimeout(next, 3000);
    console.log("Delaying for 3 seconds");
}

module.exports = delay;