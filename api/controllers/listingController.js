import db from "../config/database.js";

const listingPostById = async(req,res)=>{

    const { id } = req.params;
    const { title, type, address, addedPhotos, description, price, isSameDay, eventDate, checkIn, checkOut, time, guests, perks } = req.body;

    try {
        const result = await db.query("INSERT INTO listings (title,type,address, added_photos, description, price, is_same_day, perks, event_date, check_in, check_out, time,user_id,guests) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [title, type, address, addedPhotos, description, price, isSameDay, perks, eventDate, checkIn, checkOut, time, id, guests]);
        const place = result.rows[0];
        console.log(place)
        res.status(201).json({ place });
    } catch (error) {
        console.log(error)
        res.send(error);
    }

}

const listingAddsById = async(req,res)=>{
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM listings WHERE user_id = $1 ORDER BY id ASC", [id]);
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}

const getListingById = async (req,res)=>{
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM listings WHERE id = $1 ORDER BY id ASC", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
}

const putListingById = async (req,res)=>{
    const { id } = req.params;
    const { title, type, address, addedPhotos, description, price, isSameDay, eventDate, checkIn, checkOut, time, guests, perks } = req.body;
    try {
        const result = await db.query("UPDATE listings SET title = $1, type = $2, address = $3, added_photos = $4, description = $5, price = $6, is_same_day = $7, perks = $8, event_date = $9, check_in = $10, check_out = $11, time = $12, guests = $13 WHERE id = $14 RETURNING *", [title, type, address, addedPhotos, description, price, isSameDay, perks, eventDate, checkIn, checkOut, time, guests, id]);
        res.json(result.rows[0])
    } catch (error) {
        console.log(error)
    }
}

const listings = async(req,res)=>{
    try {
        const result = await db.query("SELECT * FROM listings ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        console.log(error)
        res.send(error);
    }

}

export {listingPostById, listingAddsById, getListingById, putListingById,listings};