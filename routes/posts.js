const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//CREATE POST
router.post("/:id", async (req, res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = newPost.save();
        res.status(200).json(savedPost);
        
    }catch (err) {
        res.status(500).json(err)
    }
});

//UPDATE
router.put("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(res.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },
                {new:true}
            );
            res.status(200).json(updatedPost);
            }catch(err) {
                res.status(500).json(err);
            }
        }else {
            res.status(401).json("You can only update your post!")
        }
    } catch (err){
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(res.params.id);
        if(post.username === req.body.username){
            try{
                await post.delete();
            res.status(200).json("Post has been deleted!");
            }catch (err) {
                res.status(500).json(err);
            }
        }else {
            res.status(401).json("You can only delete your post!")
        }
    } catch (err){
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res)=>{
    try{
        const user = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err){
        res.status(500). json(err);
    }

});

module.exports = router;