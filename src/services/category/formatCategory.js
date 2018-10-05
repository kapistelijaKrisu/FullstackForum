const formatCategory = (body, dude_id) => {
    return {
        name: body.name.trim(),
        description: body.description.trim(),
        creator_id: dude_id
    };
}

module.exports = formatCategory