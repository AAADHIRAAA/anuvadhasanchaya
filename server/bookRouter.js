
const express = require('express');
const router =express.Router();
const Book=require("./models/bookModel");

router.post('/create',async(req,res)=>{
    try{
        const{
            formData
        }=req.body
       
        const book = await Book.create({
            bookTitle:formData.bookTitle,
            author:formData.author,
            publisher:formData.publisher,
            language:formData.language,
            editor:formData.editor,
            subject:formData.subject,
            originalBook:formData.originalBook,
            originalAuthor:formData.originalAuthor,
            originalPublisher:formData.originalPublisher,
            originalLanguage:formData.originalLanguage,
            originalYear:formData.originalYear,
            originalUrl:formData.originalUrl,
            year:formData.year,
            url:formData.url,
            isTranslation:formData.isTranslation=="yes"?true:false,
        });
   
        return res.status(200).json({message:"Book created successfully"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
})

router.get('/viewbooks',async(req,res)=>{

        const page = parseInt(req.query.page) || 1; // Current page number, default to 1
        const pageSize = parseInt(req.query.pageSize) || 50; // Number of items per page, default to 50
    try{
        const totalCount = await Book.countDocuments();
        const totalPages = Math.ceil(totalCount / pageSize);
        const skip = (page - 1) * pageSize;

        // Fetch data with pagination
        const data = await Book.find()
            .skip(skip)
            .limit(pageSize);

        res.json({
            data,
            currentPage: page,
            totalPages,
            totalCount
        });

    }
    catch(e){
        console.error(e);
        return res.status(500).json({message:'Internal Server Error'});
    }
})

router.get('/find/:search',async(req,res)=>{
    try{
       
        const search = req.params.search;
        const data = await Book.findOne({bookTitle:search});
        if(!data){
            return res.status(200).json([]);
        }
        return res.status(200).json(data);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal Error"});
    }
})

router.get('/count',async(req,res)=>{

    try{
            const count = await Book.countDocuments();
            return res.status(200).json(count);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal Error"});
    }
})

module.exports=router;