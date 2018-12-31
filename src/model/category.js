const { pool } = require('../config/dbpool')

const findAll = async () => {
    console.log('a')
    const text = ` SELECT
        c.category_id, c.name,
        c.description, c.creator_id,
        sdd.lastposter_username as creator_name,
        coalesce(fcount, 0) as forumpost_count,
        sdd.last_post_time, 
        sdd.last_post_forumpost_id,
        sdd.lastposter_username,
        sdd.lastposter_dude_id,
        sdd.lastpost_title
    FROM Category c
    LEFT JOIN
        (SELECT f.category_id, count(1) fcount
        FROM Forumpost f
        GROUP BY f.category_id) as sd 
    ON sd.category_id = c.category_id
    LEFT JOIN 
        (SELECT DISTINCT ON (cat_id)  c.category_id as cat_id,
        fresh.forumpost_id as last_post_forumpost_id,
        fresh.title as lastpost_title,
        fresh.posttime last_post_time,
        fresh.username lastposter_username, 
        fresh.dude_id lastposter_dude_id
            FROM Forumpost f, Comment co, Dude d, Category c
            left JOIN
            (SELECT DISTINCT ON (f.category_id) f.category_id, f.forumpost_id, f.title, co.posttime, d.username, d.dude_id
                FROM comment co
                INNER JOIN Dude d ON d.dude_id = co.creator_id
                left JOIN Forumpost f ON f.forumpost_id = co.forumpost_id
                WHERE co.forumpost_id = f.forumpost_id
                ORDER BY f.category_id asc, co.posttime DESC
                ) as fresh
            ON fresh.category_id = c.category_id
            ) as sdd
    ON cat_id = c.category_id
    LEFT JOIN Dude d
    ON sdd.lastposter_dude_id = d.dude_id
    ORDER BY c.name`
    const { rows } = await pool.query(text)
    console.log(rows)
    return rows
}

const findByName = async (name) => {
    const text = ` SELECT
        c.category_id, c.name,
        c.description, c.creator_id,
        d.username as creator_name,
        coalesce(fcount, 0) as forumpost_count,
        last_post_time, 
        last_post_forumpost_id,
        lastposter_username,
        lastposter_dude_id,
        lastpost_title
    FROM Category c
    LEFT JOIN
        (SELECT f.category_id, count(1) fcount
        FROM Forumpost f
        GROUP BY f.category_id) as sd 
    ON sd.category_id = c.category_id
    LEFT JOIN 
        (SELECT f.category_id, f.forumpost_id as last_post_forumpost_id, f.title as lastpost_title, co.posttime last_post_time, d.username lastposter_username, d.dude_id lastposter_dude_id
            FROM Forumpost f, Comment co, Dude d
            WHERE co.forumpost_id = f.forumpost_id
            AND d.dude_id = co.creator_id 
            ORDER BY co.posttime DESC
            LIMIT 1
            ) as sdd
            ON sdd.category_id = c.category_id
    LEFT JOIN Dude d
    ON c.creator_id = d.dude_id
    WHERE c.name = $1
    ORDER BY c.name`
    const { rows } = await pool.query(text, [name])
    return rows
}

const findById = async (name) => {
    const text = ` SELECT
        c.category_id, c.name,
        c.description, c.creator_id,
        d.username as creator_name,
        coalesce(fcount, 0) as forumpost_count,
        last_post_time, 
        last_post_forumpost_id,
        lastposter_username,
        lastposter_dude_id,
        lastpost_title
    FROM Category c
    LEFT JOIN
        (SELECT f.category_id, count(1) fcount
        FROM Forumpost f
        GROUP BY f.category_id) as sd 
    ON sd.category_id = c.category_id
    LEFT JOIN 
        (SELECT f.category_id, f.forumpost_id as last_post_forumpost_id, f.title as lastpost_title, co.posttime last_post_time, d.username lastposter_username, d.dude_id lastposter_dude_id
            FROM Forumpost f, Comment co, Dude d
            WHERE co.forumpost_id = f.forumpost_id
            AND d.dude_id = co.creator_id 
            ORDER BY co.posttime DESC
            LIMIT 1
            ) as sdd
            ON sdd.category_id = c.category_id
    LEFT JOIN Dude d
    ON c.creator_id = d.dude_id
    WHERE c.category_id = $1
    ORDER BY c.name`
    const { rows } = await pool.query(text, [name])
    return rows
}

const insertCategory = async (category) => {
    const text = 'INSERT INTO Category(name, description, creator_id) VALUES($1, $2, $3) RETURNING * ;'
    const values = [category.name, category.description, category.creator_id]
    const { rows } = await pool.query(text, values)
    rows[0].forumpost_count = 0;
    return rows[0]
}

module.exports = {
    insertCategory,
    findById,
    findByName,
    findAll
}