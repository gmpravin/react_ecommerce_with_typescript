import React, { useState, useEffect, use } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './nav.css';
import { Baseket } from '../action/cartActions';
export const Nav = () => {
  const [names, setnames] = useState([]);

  const count = useSelector(state => state.baseketState.cart);

  const fetchcatagoryName = async () => {
    fetch('http://localhost:8000/api/getcatagoryName')
      .then(response => response.json())
      .then(async json => {
        console.log(json);
        await setnames(json);
      });
  };
  useEffect(() => {
    fetchcatagoryName();
  }, []);

  function myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  const shownav = () => {
    let nav = document.querySelector('.nav-links');
    let navLinks = document.querySelectorAll('.nav-links li');
    nav.classList.toggle('nav-active');
    let menu = document.getElementById('menu');
    navLinks.forEach((link, index) => {
      console.log(index / 7);
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkfade 0.5s ease ${index / 5 + 0.3}s`;
      }
    });
    menu.classList.toggle('toggle');
  };

  return (
    <div>
      <nav>
        <div class="logo">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
            React Ecommerce
          </Link>
        </div>
        <ul class="nav-links">
          <div class="dropdown">
            <button onClick={myFunction} class="dropbtn">
              catagory
            </button>
            <div id="myDropdown" class="dropdown-content">
              {Object.values(names).map((i, index) => {
                return (
                  <Link to={`/catagory/${i}`} key={index}>
                    {i}
                  </Link>
                );
              })}
            </div>
          </div>

          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/register">signup</Link>
          </li>
          <li>
            <Link to={`/cart`}>
              Cart <span className="span">{count.length}</span>
            </Link>
          </li>
        </ul>
        <div class="menu" id="menu" onClick={shownav}>
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
      </nav>
    </div>
  );
};
