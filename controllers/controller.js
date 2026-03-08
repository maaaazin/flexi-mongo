const UserModel = require("../model/user");

exports.create = async (req, res) => {
    if (
        !req.body.email &&
        !req.body.firstName &&
        !req.body.lastName &&
        !req.body.phone
    ) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
    });

    await user
        .save()
        .then((data) => {
            res.send({
                message: "User created Successfully!",
                user: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured",
            });
        });
};

exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await UserModel.findOneAndUpdate(
            { email: req.body.email },
            req.body,
            { new: true },
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findOneAndDelete({
            email: req.body.email,
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
