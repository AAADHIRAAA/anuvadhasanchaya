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
        formData.isTranslation.trim()==""||
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
    <label for="bookTitle" class="col-sm-2 col-form-label">BookTitle<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="bookTitle" name="bookTitle" placeholder="Enter book title" onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="author" class="col-sm-2 col-form-label">Author<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="author" name="author" placeholder="Enter Author Name" onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="publisher" class="col-sm-2 col-form-label">Publisher</label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="publisher" name="publisher" placeholder="Enter Publisher Name" onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="editor" class="col-sm-2 col-form-label">Editor</label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="editor"  name="editor" placeholder="Enter Editor Name" onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="subject" class="col-sm-2 col-form-label">Subject<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="subject" name="subject" placeholder="Enter Subject/Genre" onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="language" class="col-sm-2 col-form-label">Language<span className="text-danger">*</span></label>
    <div class="col-sm-10">
      <input type="text" class="form-control border border-black" id="language" name="language" placeholder="Enter translated Language" onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="year" class="col-sm-2 col-form-label">Year</label>
    <div class="col-sm-10">
      <input type="number" class="form-control border border-black" id="year" name="year" placeholder="Year of Publication" onChange={handleInputChange}/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
      <div class="form-group row">
        <label for="url" class="col-sm-2 col-form-label">URL</label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="url" name="url" placeholder="Enter Book URL" onChange={handleInputChange}/>
        </div>
      </div>
      </div>
  <div className='mb-3'>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Is It a translation?</legend>
      <div class="col-sm-10">
        <div class="form-check form-check-inline">
          <input class="form-check-input border border-black" type="radio" name="isTranslation" id="yes" value="yes" onChange={handleTranslationChange}/>
          <label class="form-check-label" for="yes">
            Yes
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input border border-black" type="radio" name="isTranslation" id="no" value="No" onChange={handleTranslationChange}/>
          <label class="form-check-label" for="no">
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
        <label for="originalBook" class="col-sm-2 col-form-label">OriginalBook<span className="text-danger">*</span></label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalBook" name="originalBook" placeholder="Enter Original Book Name" onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label for="originalAuthor" class="col-sm-2 col-form-label">Author<span className="text-danger">*</span></label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalAuthor"  name="originalAuthor"placeholder="Enter Author Name" onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label for="originalPublisher" class="col-sm-2 col-form-label">Publisher</label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalPublisher" name="originalPublisher" placeholder="Enter Publisher Name" onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label for="originalLanguage" class="col-sm-2 col-form-label">Language<span className="text-danger">*</span></label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalLanguage" name="originalLanguage" placeholder="Enter Original Language" onChange={handleInputChange}/>
        </div>
      </div>
      </div>
    
      <div className='mb-3'>
      <div class="form-group row">
        <label for="originalYear" class="col-sm-2 col-form-label">Year</label>
        <div class="col-sm-10">
          <input type="number" class="form-control border border-black" id="originalYear" name="originalYear" placeholder="Year of Publication" onChange={handleInputChange}/>
        </div>
      </div>
      </div>
      <div className='mb-3'>
      <div class="form-group row">
        <label for="originalUrl" class="col-sm-2 col-form-label">OriginalURL</label>
        <div class="col-sm-10">
          <input type="text" class="form-control border border-black" id="originalUrl" name="originalUrl" placeholder="Enter Original Book URL" onChange={handleInputChange}/>
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