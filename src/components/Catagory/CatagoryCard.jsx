import React from 'react';
import { Link } from 'react-router-dom'; 
import classes from './Catagory.module.css';

function CatagoryCard({ data }) {
  return (
    <div className={classes.catagory}>
      <Link to={`/Catagory/${data?.name}`}>
        <span> 
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
      </Link>
    </div>
  );
}

export default CatagoryCard;