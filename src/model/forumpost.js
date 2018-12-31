const { pool } = require('../config/dbpool');
const CONSTANTS = require('../utils/constants');
const LIMIT = CONSTANTS.FORUMPOST.DEFAULT_LIMIT_PER_PAGE;

const findForumpost = async (forumpost_id) => {
    const text = 'SELECT'
        + ' p.forumpost_id, p.title, p.creator_id AS postcreator, p.category_id, p.disabled, '
        + ' c.comment_id, c.content AS commentcontent, c.creator_id AS commentcreator, c.posttime, c.deleted, c.edited,'
        + ' cat.name AS categoryname,'
        + ' d.username AS commentcreatorname'

        + ' FROM Forumpost p '
        + ' LEFT JOIN Comment c ON p.forumpost_id = c.forumpost_id'
        + ' LEFT JOIN Category cat ON p.category_id = cat.category_id'
        + ' LEFT JOIN Dude d ON c.creator_id = d.dude_id'
        + ' WHERE p.forumpost_id = $1'
        + ' ORDER BY c.posttime ASC;';

    const query = {
        text: text,
        values: [forumpost_id]
    };
    const { rows } = await pool.query(query);

    let post = {
        forumpost_id: rows[0].forumpost_id,
        title: rows[0].title,
        creator_id: rows[0].postcreator,
        category_id: rows[0].category_id,
        categoryname: rows[0].categoryname,
        disabled: rows[0].disabled,
        comments: []
    };
    if (rows[0].comment_id === null) {
        return post;
    }
    rows.forEach(row => {
        post.comments.push({
            comment_id: row.comment_id,
            content: row.commentcontent,
            creator_id: row.commentcreator,
            creatorname: row.commentcreatorname,
            posttime: row.posttime,
            edited: row.edited,
            deleted: row.deleted
        })
    });
    return post;
}

const findPureForumpost = async (forumpost_id) => {
    const text = 'SELECT * from Forumpost f WHERE f.forumpost_id = $1;' ;
    const { rows } = await pool.query(text, [forumpost_id]);
    return rows[0];
}

//must have at least 1 comment to work
const findByCategoryId = async (category_id, limit = LIMIT, offset = 0) => {
    const text = 'SELECT f.forumpost_id, f.title, f.creator_id, f.category_id, f.disabled'
    +' FROM Forumpost f '
    +' JOIN Comment c ON f.forumpost_id=c.forumpost_id' 
    +' WHERE f.category_id = $1'
    +' GROUP BY f.forumpost_id'
    +' ORDER BY max(c.posttime) DESC '
    +' LIMIT $2'
    +' OFFSET $3';
    
    const { rows } = await pool.query(text, [category_id, limit, offset]);
    return rows;
}
const findByDudeId = async (dude_id, limit = LIMIT, offset = 0) => {
    const text = 'SELECT f.forumpost_id, f.title, f.creator_id, f.category_id, f.disabled'
    +' FROM Forumpost f '
    +' JOIN Comment c ON f.forumpost_id=c.forumpost_id' 
    +' WHERE f.creator_id = $1'
    +' GROUP BY f.forumpost_id'
    +' ORDER BY max(c.posttime) DESC '
    +' LIMIT $2'
    +' OFFSET $3';
    const { rows } = await pool.query(text, [dude_id, limit, offset]);
    return rows;
}

const insertForumpost = async (forumpost) => {
    const text = 'INSERT INTO Forumpost(title, creator_id, category_id) VALUES($1, $2, $3) RETURNING * ;';
    const values = [forumpost.title, forumpost.creator_id, forumpost.category_id];
    const { rows } = await pool.query(text, values);
    return rows[0];
}

const getForumpostCountByCategory = async (category_id) => {
    const text = 'SELECT count(1) FROM Forumpost WHERE category_id = $1;';
    const { rows } = await pool.query(text, [category_id]);
    return rows[0].count;
}
const getForumpostCountByDude = async (dude_id) => {
    const text = 'SELECT COUNT(1) FROM Forumpost where creator_id = $1;';
    const { rows } = await pool.query(text,[dude_id]);
    return rows[0].count;
}

const editForumpost = async (forumpost) => {
    const text = 'UPDATE Forumpost SET'
    + ' disabled = $2,'
    + ' title = $3,'
    + ' category_id = $4'
    + ' WHERE forumpost_id = $1;';
    const values = [
        forumpost.forumpost_id,
        forumpost.disabled,
        forumpost.title,
        forumpost.category_id];
    const { rows } = await pool.query(text, values);
    return rows[0]
}

module.exports = {
    getForumpostCountByCategory,
    getForumpostCountByDude,
    findPureForumpost,
    findForumpost,
    insertForumpost,
    editForumpost,
    findByDudeId,
    findByCategoryId
}