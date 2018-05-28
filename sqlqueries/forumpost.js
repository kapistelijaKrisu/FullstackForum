const { pool } = require('../utils/dbpool')

const findForumpost = async (forumpostid) => {
    const text = 'SELECT post, c FROM Forumpost post  LEFT JOIN Comment c ON post.forumpostid = c.forumpostid WHERE post.forumpostid = $1;'
   
           //       SELECT (vg.id,name) FROM v_groups vg  inner join people2v_groups p2vg on vg.id = p2vg.v_group_id where p2vg.people_id =0;
           const query = {
            text: text,
            values: [forumpostid]
          };
    const { rows } = await pool.query(query)
   console.log(rows)
    return rows[0]
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