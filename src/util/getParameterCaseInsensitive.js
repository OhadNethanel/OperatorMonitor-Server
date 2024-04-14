module.exports = (object, key = "") => {
    const asLowerCase = key.toLowerCase()
    return object[Object.keys(object).find(k => k.toLowerCase() === asLowerCase)]
}