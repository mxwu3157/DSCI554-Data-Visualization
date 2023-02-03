<template>
    <div id="app">
      <div id="nav">

        
        <router-link to="/Teamperformance1">Performance by Year</router-link> |
        <router-link to="/Teamperformance2">Performance by Team</router-link> |
        <router-link to="/Donut">Team PPG</router-link>  |
        <router-link to="/Bars">Team 2022</router-link> |
        <router-link to="/quarterbacks">Quarterbacks</router-link> |
        <router-link to="/">NFL Teams</router-link>
        
      


      </div>
      <router-view/>
    </div>
  
</template>
  
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  #nav {
    padding: 50px;
  }
  
  #nav a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 20px;
  }

  
  #nav a.router-link-exact-active {
    
    top:50%;
    background-color:lightgreen;
    color: black;
    border:none; 
    border-radius:10px; 
    padding:15px;
    min-height:30px; 
    min-width: 120px;
  }

  #nav a.router-link-exact-active:hover {
      background-color:#8fbc8f;
      transition: 0.7s;
  }


</style>
  