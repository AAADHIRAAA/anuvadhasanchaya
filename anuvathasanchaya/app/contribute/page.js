"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSortBy, useTable} from "react-table";
import {BiChevronDown, BiChevronUp, BiSearch,BiX} from "react-icons/bi";
// import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import Link from 'next/link';

export default function bookForm(){

  const [translate, setTranslate] = useState(false);

  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    publisher: "",
    language: "",
    editor: "",
    subject: "",
    originalBook: "",
    originalAuthor: "",
    originalPublisher: "",
    originalLanguage: "",
    originalYear: "",
    originalUrl:"",
    year: "",
    url: "",
    isTranslation: "",
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleSubmit = async(e) => {
    e.preventDefault();
    // Validation
    // Check if all mandatory fields are filled
    if (formData.bookTitle.trim() === "" ||
        formData.language.trim() === "" ||
        formData.subject.trim() === "" ||
        formData.author.trim() === "" ||
        // formData.isTranslation.trim()==""||
        (formData.isTranslation === "yes" &&
            (formData.originalBook.trim() === "" ||
                formData.originalLanguage.trim() === "" ||
                formData.originalAuthor.trim() === ""))
    ) {
        alert("Please fill in all mandatory fields.");
        return;
    }

    // Your form submission logic goes here
    console.log(formData);
    
    try{
      const response = await axios.post("http://localhost:8000/translation/create",
      {
        formData
      });
      console.log(response.status);
      if(response.status===200){
        console.log("ok");
        setTranslate(false);
      setFormData({
        bookTitle: "",
        author: "",
        publisher: "",
        language: "",
        editor: "",
        subject: "",
        originalBook: "",
        originalAuthor: "",
        originalPublisher: "",
        originalLanguage: "",
        originalYear: "",
        originalUrl: "",
        year: "",
        url: "",
        isTranslation: "",
    });
   
  }
    }
    catch(error){
      console.error(error);
      
    }
};

const handleTranslationChange = (e) => {
    const value = e.target.value;
    setTranslate(value === "yes");
    setFormData({
      ...formData,
      isTranslation: value
  });
};
useEffect(() => {
  console.log(formData);
}, [formData]); 

return(
    <>
  
  <div className="container mt-20 ">
    <div className="row justify-content-center">
      <div className="col-md-6">
    <form className="p-4 border shadow-lg" onSubmit={handleSubmit}>
    <div className="d-flex justify-content-center align-items-center text-black mt-4">
        <h3>Enter the details</h3>
    </div>
      <div className='mb-3'>
  <div class="form-group row" >
    <label htmlFor="bookTitle" class="col-sm-2 col-form-label">BookTitle<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="bookTitle" name="bookTitle" placeholder="Enter book title" value={formData.bookTitle} onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label htmlFor="author" class="col-sm-2 col-form-label">Author<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="author" name="author" placeholder="Enter Author Name" value={formData.author} onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label htmlFor="publisher" class="col-sm-2 col-form-label">Publisher</label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="publisher" name="publisher" placeholder="Enter Publisher Name" value={formData.publisher} onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label htmlFor="editor" class="col-sm-2 col-form-label">Editor</label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="editor"  name="editor" placeholder="Enter Editor Name" value={formData.editor} onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label htmlFor="subject" class="col-sm-2 col-form-label">Subject<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="subject" name="subject" placeholder="Enter Subject/Genre" value={formData.subject}  onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label htmlFor="language" class="col-sm-2 col-form-label">Language<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="language" name="language" placeholder="Enter translated Language" value={formData.language}  onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label htmlFor="year" class="col-sm-2 col-form-label">Year</label>
    <div class="col-sm-10">
      <input type="number" class="form-control border border-black" id="year" name="year" placeholder="Year of Publication" value={formData.year} onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
      <div class="form-group row">
        <label htmlFor="url" class="col-sm-2 col-form-label">URL</label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="url" name="url" placeholder="Enter Book URL" value={formData.url} onChange={handleInputChange}/>
        </div>
      </div>
      </div>
  <div className='mb-3'>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Is It a translation?</legend>
      <div class="col-sm-10">
        <div class="form-check form-check-inline">
          <input class="form-check-input border border-black" type="radio" name="isTranslation" id="yes" value="yes"  onChange={handleTranslationChange}/>
          <label class="form-check-label" htmlFor="yes">
            Yes
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input border border-black" type="radio" name="isTranslation" id="no" value="No" onChange={handleTranslationChange}/>
          <label class="form-check-label" htmlFor="no">
            No
          </label>
        </div>
        
      </div>
    </div>
  </fieldset>

  </div>
  {translate && (
    <div>
      <div className='mb-3'>
      <div class="form-group row">
        <label htmlFor="originalBook" class="col-sm-2 col-form-label">OriginalBook<span className="text-danger">*</span></label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalBook" name="originalBook" placeholder="Enter Original Book Name" value={formData.originalBook} onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label htmlFor="originalAuthor" class="col-sm-2 col-form-label">Author<span className="text-danger">*</span></label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalAuthor"  name="originalAuthor"placeholder="Enter Author Name" value={formData.originalAuthor} onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label htmlFor="originalPublisher" class="col-sm-2 col-form-label">Publisher</label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalPublisher" name="originalPublisher" placeholder="Enter Publisher Name" value={formData.originalPublisher} onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label htmlFor="originalLanguage" class="col-sm-2 col-form-label">Language<span className="text-danger">*</span></label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalLanguage" name="originalLanguage" placeholder="Enter Original Language" value={formData.originalLanguage}  onChange={handleInputChange}/>
        </div>
      </div>
      </div>
    
      <div className='mb-3'>
      <div class="form-group row">
        <label htmlFor="originalYear" class="col-sm-2 col-form-label">Year</label>
        <div class="col-sm-10">
          <input type="number" class="form-control border border-black" id="originalYear" name="originalYear" placeholder="Year of Publication" value={formData.originalYear}  onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label htmlFor="originalUrl" class="col-sm-2 col-form-label">OriginalURL</label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalUrl" name="originalUrl" placeholder="Enter Original Book URL" value={formData.originalUrl}  onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      </div>
  )}
  
  <div className='mb-3 d-flex justify-content-center '>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary text-white ">Submit</button>
    </div>
  </div>
  </div>
</form>
</div>
</div>
</div>
</>
);
}