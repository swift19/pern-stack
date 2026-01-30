const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

// middleware
app.use(cors());
app.use(express.json());

// GET all users
app.get("/getAllUser", (req, res) => {
    const selectSTMT = "SELECT * FROM accounts";
    pool.query(selectSTMT)
        .then((response) => {
            console.log("Fetched all users");
            res.json(response.rows); // return all rows as JSON
        })
        .catch((err) => {
            console.error("err:" + err);
            res.status(500).send("Error fetching users");
        });
});

// GET user by ID
app.get("/getUser/:id", (req, res) => {
    // const userId = req.params.id;
    const userId = req.params.id || req.query.id;
    console.log("here..." , +userId)
    const selectSTMT = "SELECT * FROM accounts WHERE user_id=$1";

    pool.query(selectSTMT, [userId])
        .then((response) => {
            if (response.rows.length === 0) {
                res.status(404).send(`User with ID ${userId} not found`);
            } else {
                console.log("Fetched user:", response.rows[0]);
                res.json(response.rows[0]); // return single user
            }
        })
        .catch((err) => {
            console.error("err:" + err);
            res.status(500).send("Error fetching user");
        });
});


// POST endpoint (Add User)
app.post("/addUser", (req, res) => {
    console.log(req.body);
    const username = req.body["username"];
    const password = req.body["password"];
    const insertSTMT = `INSERT INTO accounts (username, password) VALUES ('${username}', '${password}')`;

    pool.query(insertSTMT)
        .then((response) => {
            console.log("Data saved");
            console.log(response);
            res.send("User added successfully");
        })
        .catch((err) => {
            console.log("err:" + err);
            res.status(500).send("Error saving user");
        });
});

// PUT endpoint (Update User by user_id)
app.put("/updateUser/:id", (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;

    const updateSTMT = `UPDATE accounts SET username='${username}', password='${password}' WHERE user_id=${userId}`;

    pool.query(updateSTMT)
        .then((response) => {
            console.log("Data updated");
            console.log(response);
            res.send(`User with ID ${userId} updated successfully`);
        })
        .catch((err) => {
            console.log("err:" + err);
            res.status(500).send("Error updating user");
        });
});

// DELETE endpoint (Delete User by user_id)
app.delete("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;

    const deleteSTMT = `DELETE FROM accounts WHERE user_id=${userId}`;

    pool.query(deleteSTMT)
        .then((response) => {
            console.log("Data deleted");
            console.log(response);
            res.send(`User with ID ${userId} deleted successfully`);
        })
        .catch((err) => {
            console.log("err:" + err);
            res.status(500).send("Error deleting user");
        });
});

// Start server
app.listen(5000, () => {
    console.log("server has started on port 5000");
});