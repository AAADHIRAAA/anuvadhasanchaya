"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSortBy, useTable} from "react-table";
import {BiChevronDown, BiChevronUp, BiSearch,BiX} from "react-icons/bi";
// import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import Link from 'next/link';

export default function bookForm(){

return(
    <>
  <div className="container mt-20">
    <div className="row justify-content-center">
      <div className="col-md-6">
    <form className="p-4 border">
      <div className='mb-3'>
  <div class="form-group row" >
    <label for="title" class="col-sm-2 col-form-label">Book Title</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="title" placeholder="Enter title"/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="author" class="col-sm-2 col-form-label">Author</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="author" placeholder="Enter Author Name"/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="publisher" class="col-sm-2 col-form-label">Publisher</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="publisher" placeholder="Enter Publisher Name"/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="language" class="col-sm-2 col-form-label">Language</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="author" placeholder="Enter Original Language"/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="book" class="col-sm-2 col-form-label">Original Book</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="book" placeholder="Enter Original Book Name"/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="year" class="col-sm-2 col-form-label">Year</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="author" placeholder="Year of Publication"/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <label for="url" class="col-sm-2 col-form-label">URL</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="author" placeholder="Enter Book URL"/>
    </div>
  </div>
  </div>
  <div className='mb-3'>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary">Submit</button>
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