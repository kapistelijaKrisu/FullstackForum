const { pool } = require('../utils/dbpool')

const findForumpost = async (forumpostid) => {
    const text = 'SELECT p.forumpostid, p.title, p.content AS postcontent, p.creatorid AS postcreator, p.categoryid, c.commentid, c.content AS commentcontent, c.creatorid AS commentcreator FROM Forumpost p  LEFT JOIN Comment c ON p.forumpostid = c.forumpostid WHERE p.forumpostid = $1;'
   
           //       SELECT (vg.id,name) FROM v_groups vg  inner join people2v_groups p2vg on vg.id = p2vg.v_group_id where p2vg.people_id =0;
           const query = {
            text: text,
            values: [forumpostid]
          };
    const { rows } = await pool.query(query)
   
    let post = {
        forumpostid: rows[0].forumpostid,
        title: rows[0].title,
        content: rows[0].postcontent,
        creatorid: rows[0].postcreator,
        categoryid: rows[0].categoryid,
        comments: []
    }
    if (rows[0].commentid === null) {
        return post
    }
    rows.forEach(row => {
        post.comments=post.comments.concat({
            commentid:row.commentid,
            content:row.commentcontent,
            creatorid:row.commentcreator

        })
    })
    return post
}

const findByCategoryId = async (categoryid) => {
    const text = 'SELECT * FROM Forumpost WHERE categoryid = $1;'
    const { rows } = await pool.query(text, [categoryid])
    return rows
}
const findByDudeId = async (dudeId) => {
    const text = 'SELECT * FROM Forumpost WHERE creatorid = $1;'
    const { rows } = await pool.query(text, [dudeId])
    return rows
}

const insertForumpost = async (forumpost) => {
    const text = 'INSERT INTO Forumpost(title, content, creatorid, categoryid) VALUES($1, $2, $3, $4) RETURNING * ;'
    const values = [forumpost.title, forumpost.content, forumpost.creatorid, forumpost.categoryid]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    findForumpost,
    insertForumpost,
    findByDudeId,
    findByCategoryId
}