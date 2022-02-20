<template>

</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  height: 56px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

@media (min-width: 667px) {
  .header {
    height: 80px;
    border: none;
  }
}

.header-container {
  position: relative;
  width: 100%;
  max-width: 1024px;
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 24px;
  padding: 0 0 0 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;

  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

@media (min-width: 667px) {
  .header-container {
    padding: 0 1.5rem;
  }
}

.header-right,
.header-nav {
  display: flex;
  align-items: center;
}

@media (min-width: 668px) {
  .header-nav {
    margin-left: 10px;
  }
}

@media (max-width: 667px) {
  .header-right {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
  }

  .header-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding-top: 56px;
    background: #fff;
    box-shadow: 0 10px 24px 0 rgba(96, 125, 139, 0.1);
    z-index: 2;
  }

  .header-nav:hover {
    display: block;
  }

  .nav-toggle-label {
    padding-right: 16px;
  }
}

.header-nav .nav-link {
  position: relative;
  padding: 4px 8px;
  color: #607d8b;
  text-transform: uppercase;
  font-family: "Quicksand", sans-serif;
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  z-index: 3;
}

@media (max-width: 667px) {
  .header-nav .nav-link {
    padding-left: 16px;
    color: #334148;
    font-weight: 400;
  }
}

.header-premium-link {
  display: inline-block;
  color: #ffa000;
  font-size: 14px;
}

.header-premium-link:hover,
.header-premium-link:focus {
  color: #ffa000;
  opacity: 0.8;
}

@media (min-width: 667px) {
  .header-premium-link {
    padding-right: 24px;
  }
}

.header-container .logo {
  margin-bottom: 2px;
  /* height: 28px; */
}

@media (min-width: 667px) {
  .header-container .logo {
    height: 24px;
  }
}

.header-container .login-links {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

@media (max-width: 667px) {
  .header-container .login-links {
    display: none;
    position: absolute;
    top: 48px;
    width: 100%;
    padding: 0 0 0 16px;
    z-index: 2;
  }
}

.clever-link {
  padding-left: 8px;
  margin-left: 8px;
  border-left: 2px solid #607d8b;
  color: #607d8b !important;
}

.header-container .header-link {
  /* display: none; */
  font-size: 16px;
  letter-spacing: 0.6px;
  font-weight: 400;
  color: #349be7;
}

@media (max-width: 667px) and (orientation: landscape) {
  .header-container .header-link {
    display: block;
  }
}

@media (min-width: 667px) {
  .header-container .header-link {
    display: block;
  }
}
</style>
