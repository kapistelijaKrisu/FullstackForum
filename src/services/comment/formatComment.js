const formatComment = (request) => {
    return {
        forumpost_id: request.body.forumpost_id,
        content: request.body.content.trim(),
        creator_id: request.securityContext.dude_id,
        creatorname: request.securityContext.username
    }
}

module.exports = formatComment