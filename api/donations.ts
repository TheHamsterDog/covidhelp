import Post from '../models/post';
import User from '../models/user';
import mongoose = require('mongoose');
import auth from '../middleware/auth';
import { check, validationResult } from 'express-validator';
import express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_wiA2Vg6ffsiNofaZlNiDVwUA00yfWKhjxG');
router.get('/', [auth], async (req: any, res: any) => {
    const user = await User.findById(req.user);
    if (!user) {
        return res.status(400).json({ msg: 'user not found' });
    }
    try {
        return res.json({ msg: user.donations })

    }

    catch {
        return res.status(500).json({ msg: 'server Error' })
    }

})
// router.get('/:id', [auth], async (req, res) => {
//     const user = await User.findById(req.user);
//     if (!user) {
//         return res.status(400).json({ msg: 'User not found' })
//     }
//     const donation = user.donations.map(d => {
//         if (d.Post.toString() === req.params.id) {
//             return d;
//         }

//     })

//     res.json({ msg: donation });

// })
router.post('/',[auth, check('id', 'post can\'t be found').not().isEmpty(), check('amount', 'Amount is required').not().isEmpty()], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
try{
 const post = await Post.findById(req.body.id)
    if(!post){
    return res.status(400).json({errors:['post not found']})
    }
 const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(req.body.amount),
    currency: "usd"
  });

  return res.json({
    clientSecret: paymentIntent.client_secret
  });
}
catch(e){
    console.log(e);
    
    return res.status(500).json({errors:['Server Error']})
}
  
})

module.exports = router;
export default router;
