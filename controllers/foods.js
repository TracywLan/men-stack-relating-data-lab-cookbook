const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user')


// Index - GET /users/:userId/foods
router.get('/', async (req,res)=>{
    try{
        const currentUser = await User.findById(req.session.user._id).populate('pantry');
        const validPantry = currentUser.pantry.filter(item => item != null);
        res.render('foods/index.ejs', { pantry: validPantry }); 
    } catch (error) {
        console.log('Index error', error);
        res.redirect('/');
    }
});

// New - GET /users/:userId/foods/new
router.get('/new', (req, res)=> {
    res.render('foods/new.ejs', {
        food:{},
        userId: req.session.user._id
    })
});

// Create - POST /users/:userId/foods
router.post('/', async(req, res)=> {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        req.session.message = error.message;
        req.session.save(()=>{
            res.redirect(`/users/${currentUser._id}/foods`);
        })
    }
})
// Show - GET /users/:userId/foods/:itemId
router.get('/:itemId', async(req, res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.itemId)
        res.render('foods/show.ejs', { food:food})
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
    
})

// Update - PUT /users/:userId/foods/:itemId
router.put('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.itemId)
    food.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/foods/${req.params.itemId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


// Delete - DELETE /users/:userId/foods/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.itemId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', {
      food: food,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;