const formatCategory = (body, dudeId) => {
    return {
        name: body.name.trim(),
        description: body.description.trim(),
        creatorid: dudeId
    };
}

module.exports = formatCategory