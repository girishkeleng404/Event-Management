import db from "./database.js";

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

export { profileDetailsById };