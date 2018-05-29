const { pool } = require('../utils/dbpool')

const findForumpost = async (forumpostid) => {
    const text = 'SELECT'
        + ' p.forumpostid, p.title, p.creatorid AS postcreator, p.categoryid, '
        + ' c.commentid, c.content AS commentcontent, c.creatorid AS commentcreator, c.posttime, '
        + ' cat.name AS categoryname,'
        + ' d.username AS commentcreatorname'

        + ' FROM Forumpost p '
        + ' LEFT JOIN Comment c ON p.forumpostid = c.forumpostid'
        + ' LEFT JOIN Category cat ON p.categoryid = cat.categoryid'
        + ' LEFT JOIN Dude d ON c.creatorid = d.dudeid'
        + ' WHERE p.forumpostid = $1'
        + ' ORDER BY c.posttime ASC;'

    const query = {
        text: text,
        values: [forumpostid]
    };
    const { rows } = await pool.query(query)

    let post = {
        forumpostid: rows[0].forumpostid,
        title: rows[0].title,
        creatorid: rows[0].postcreator,
        categoryid: rows[0].categoryid,
        categoryname: rows[0].categoryname,
        comments: []
    }
    if (rows[0].commentid === null) {
        return post
    }
    rows.forEach(row => {
        post.comments = post.comments.concat({
            commentid: row.commentid,
            content: row.commentcontent,
            creatorid: row.commentcreator,
            creatorname: row.commentcreatorname,
            posttime: row.posttime

        })
    })
    return post
}

//must have at least 1 comment to work
const findByCategoryId = async (categoryid) => {
    const text = 'SELECT f.forumpostid, f.title, f.creatorid, f.categoryid FROM Forumpost f '
    + 'JOIN Comment c ON f.forumpostid=c.forumpostid' 
    +' WHERE f.categoryid = $1'
    +' GROUP BY f.forumpostid'
    +' ORDER BY max(c.posttime) DESC '
    
    const { rows } = await pool.query(text, [categoryid])
    console.log(rows)
    return rows
}
const findByDudeId = async (dudeId) => {
    const text = 'SELECT * FROM Forumpost WHERE creatorid = $1;'
    const { rows } = await pool.query(text, [dudeId])
    return rows
}

const insertForumpost = async (forumpost) => {
    const text = 'INSERT INTO Forumpost(title, creatorid, categoryid) VALUES($1, $2, $3) RETURNING * ;'
    const values = [forumpost.title, forumpost.creatorid, forumpost.categoryid]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    findForumpost,
    insertForumpost,
    findByDudeId,
    findByCategoryId
}