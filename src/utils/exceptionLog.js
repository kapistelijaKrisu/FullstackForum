const exceptionLog = (exception, response) => {
    console.log(exception)
    return response.status(500).json({ error: 'uh oh server shat' })
}

module.exports = exceptionLog;