import db from "../config/database.js";

const profileDetailsById = async (req,res)=>{
    const { id } = req.params;
    const { name, bio, social, profilePhoto, phone, email } = req.body;
    try {
        const profilePhotoArray = [profilePhoto];
        const result = await db.query("INSERT INTO user_profile (user_id, name, bio, social_media_link, photos,phone,email) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *", [id, name, bio, social, profilePhotoArray, phone, email]);

        // The user's session is already established and you want to update or save something specific after this operation
        req.session.userProfile = result.rows[0]; // Example: Save the user profile in the session

        // Save the session before sending the response
        req.session.save(err => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error saving session" });
            }

            res.json(result.rows[0]);
        });
    } catch (err) {
        console.log(err);
        res.json({ message: "error" });
    }
}

const updateProfileDetailsById = async(req,res)=>{
    const { id } = req.params;
    const { name, bio, social, profilePhoto, phone, email } = req.body;

    console.log("Received ID:", id);
    console.log("Received name:", name);
    console.log("Received bio:", bio);
    console.log("Received social:", social);
    console.log("Received profilePhoto:", profilePhoto);
    try {
        const profilePhotoArray = [profilePhoto];

        const result = await db.query("UPDATE user_profile SET name = $1, bio = $2, social_media_link = $3, photos = $4 , phone = $5, email = $6 WHERE user_id = $7 RETURNING *", [name, bio, social, profilePhotoArray, phone, email, id]);

        req.session.userProfile = result.rows[0]; // Example: Save the user profile in the session

        // Save the session before sending the response
        req.session.save(err => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error saving session" });
            }

            res.json(result.rows[0]);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error" });
    }
}

const profile_detailByID = async(req,res)=>{
    const { id } = req.params;

    try {
        const result = await db.query("SELECT * FROM user_profile WHERE user_id = $1", [id]);
        res.json(result.rows[0]);
        console.log(result.rows);
    } catch (error) {
        res.json({ message: "error" })
        console.log(error);
    }
}

export { profileDetailsById,updateProfileDetailsById,profile_detailByID };