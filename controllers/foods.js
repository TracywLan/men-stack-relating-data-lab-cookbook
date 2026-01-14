const express = require('express');
const router = express.Router();
const User = require('../models/user')


// Index - GET /users/:userId/foods
router.get('/', async (req,res)=>{
    try{
       res.render('foods/index.ejs') 
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// New - GET /users/:userId/foods/new
router.get('/new', async(req, res)=> {
    res.render('foods/new.ejs', {
        food:{},
        userId: req.session.user._id
    })
});

// Create - POST /users/:userId/foods
router.post('/', async(req, res)=> {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body.food);
        await currentUser.save();
        
        res.redirect(`users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})
// Show - GET /users/:userId/foods/:itemId

// Update - PUT /users/:userId/foods/:itemId

// Delete - DELETE /users/:userId/foods/:itemId

module.exports = router;