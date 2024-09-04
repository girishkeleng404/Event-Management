import db from "../config/database.js";

const user_profile = async(req,res)=>{
    const userId = req.query.id;
    try {
        const result = await db.query("SELECT * FROM user_profile WHERE user_id = $1", [userId])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export {user_profile};