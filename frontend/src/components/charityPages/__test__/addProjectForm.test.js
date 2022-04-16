import React from 'react';
import ReactDOM from 'react-dom';
import addProjectForm from "./../addProjectForm";
import { isTSAnyKeyword } from '@babel/types';

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<addProjectForm/>, div)
})
