const exceptionLog = (exception, response, error, msg) => {
    console.log(exception)
    return response.status(error ? 500: error).json({ error: msg ? msg : 'uh oh server shat'})
}

module.exports = exceptionLog;