const {User} = require("../models");

const userController = {
    getAllUser(req, res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getUserById(req, res){
        User.findOne({_id: req.params._id})
        .populate({
            path: "thoughts"
        })
        .populate({
            path: "friends"
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createUser(req, res){
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.body}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    removeFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: {friendId: req.params.friendId}}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
};

module.exports = userController;