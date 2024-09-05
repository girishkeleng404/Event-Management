import db from "../config/database.js";

const ordersById = async(req,res)=>{
    const { id } = req.params;
    try {
        const response = await db.query("SELECT * FROM booking WHERE user_id = $1", [id]);
        if (response.rows.length > 0) {
            res.json(response.rows);
        } else {
            res.status(404).json({ message: "No orders found for this user" });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: "An error occurred while fetching orders", error });
    }
}


const orders_By_UserId_Place_id = async(req,res)=>{

    const { user_id, place_id } = req.params;
    try {
        const response = await db.query(
            "SELECT * FROM booking WHERE user_id = $1 AND place_id = $2",
            [user_id, place_id]
        );
        if (response.rows.length > 0) {
            res.json(response.rows);
        } else {
            res.status(404).json({ message: "No orders found for this user and place" });
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: "An error occurred while fetching orders", error });
    }

}

export {ordersById,orders_By_UserId_Place_id};