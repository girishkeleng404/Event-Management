import db from "../config/database.js";

const sortIndex = async(req,res)=>{
    const { page = 1, limit = 12, sort = 'id' } = req.query;  
    let order = 'ASC';
    let sortColumn = 'id';

     
    if (sort === 'newest') {
        sortColumn = 'id';
        order = 'DESC';
    } else if (sort === 'oldest') {
        sortColumn = 'id';
        order = 'ASC';
    } else if (sort === 'high_to_low') {
        sortColumn = 'price'; 
        order = 'DESC';
    } else if (sort === 'low_to_high') {
        sortColumn = 'price';
        order = 'ASC';
    }

    try {
        const offset = (page - 1) * limit;  
        const listingsQuery = `
            SELECT *
            FROM listings
            ORDER BY ${sortColumn} ${order}
            LIMIT $1 OFFSET $2
        `;

        const { rows } = await db.query(listingsQuery, [limit, offset]);
        const countQuery = `SELECT COUNT(*) FROM listings`;
        const { rows: countRows } = await db.query(countQuery);

        const totalListings = parseInt(countRows[0].count, 10);
        const totalPages = Math.ceil(totalListings / limit);

        res.json({
            listings: rows,
            totalPages,
            currentPage: parseInt(page, 10),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const searchPlaceBySearchText = async (req,res)=>{
    
    const { searchText } = req.params;
    const { page = 1, limit = 6,sort="id" } = req.query;

    let order = 'ASC';
    let sortColumn = 'id';

     
    if (sort === 'newest') {
        sortColumn = 'id';
        order = 'DESC';
    } else if (sort === 'oldest') {
        sortColumn = 'id';
        order = 'ASC';
    } else if (sort === 'high_to_low') {
        sortColumn = 'price'; 
        order = 'DESC';
    } else if (sort === 'low_to_high') {
        sortColumn = 'price';
        order = 'ASC';
    }

    try {
        console.log(searchText);
        const normalizedSearchText = searchText.replace(/ /g, ' & ');

        const result = await db.query(
            `SELECT * FROM listings 
             WHERE to_tsvector(title || ' ' || description || ' ' || address) @@ to_tsquery($1) 
             ORDER BY ${sortColumn} ${order} LIMIT $2 OFFSET $3`,
            [normalizedSearchText, limit, (page - 1) * limit]
        );

        const countQuery = `
        SELECT COUNT(*) FROM listings
        WHERE to_tsvector(title || ' ' || description || ' ' || address) @@ to_tsquery($1)
    `;

        const { rows: countRows } = await db.query(countQuery, [normalizedSearchText]);
        const totalListings = parseInt(countRows[0].count, 10);
        const totalPages = Math.ceil(totalListings / limit);

        res.json({
            listings: result.rows,
            totalPages,
            currentPage: parseInt(page, 10),
        });


    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while searching for listings.");
    }
}


export {sortIndex,searchPlaceBySearchText}