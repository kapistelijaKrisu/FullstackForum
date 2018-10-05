const formatDude = (request) => {
    return {
        content: request.body.content.trim(),
        title: request.body.title.trim(),
        creator_id: request.securityContext.dude_id,
        category_id: request.body.category_id,
    }
}

module.exports = formatDude