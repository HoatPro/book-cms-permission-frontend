import styled from 'styled-components';

const HeaderWrapper = styled.div`
  .avatar-header {
    float: right;
    cursor: pointer;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #e3e7ff;
    }
  }
`;

const LayoutWrapper = styled.div`
  .wrapper {
    position: relative;
    top: 0;
    height: 100vh;
    display: grid;
    grid-template-columns: ${props => (props.collapse ? 0 : '260px')} auto;
    grid-template-rows: 50px auto 50px;
    /* grid-gap: 15px 10px; */
    grid-template-areas: 
      "side-bar header header"
      "side-bar content content"
      "side-bar footer footer";
  }
  
  .sidebar {
    grid-area: side-bar;
    background: #fff;
    border-right: 1px solid #E7E7E7;
    display: ${props => (props.collapse ? 'none' : 'block')}
  }
  .header {
    grid-area: header;
    height: 50px;
    .menu-unfold {
      position: fixed;
      top: 15px;
      left: 15px;
      cursor: pointer;
      font-size: 1.2rem;
    }
    .menu-fold {
      position: fixed;
      top: 15px;
      left: 275px;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }
  .content {
    grid-area: content;
    background-color: #f0f2f5;
    min-height: calc(100vh - 100px);
    padding: 15px;
    overflow: auto;
    display: block !important;
  }
  .footer {
    grid-area: footer;
    height: 50px;
  }
  .sidebar .caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid\9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent; }
  .sidebar[data-background-color="black"] {
    background-color: #191919; }
  .sidebar .sidebar-wrapper {
    position: relative;
    height: calc(100vh - 75px);
    overflow: auto;
    width: 260px;
    z-index: 4;
    padding-bottom: 30px;
  }
  .sidebar .sidebar-wrapper .dropdown .dropdown-backdrop {
    display: none !important; }
  .sidebar .sidebar-wrapper .navbar-form {
    border: none;
    box-shadow: none; }
  .sidebar .sidebar-wrapper .navbar-form .input-group {
    font-size: 1.7em;
    height: 36px;
    width: 78%;
    padding-left: 17px;
  }
  .nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    user-select: none;
  }
  .nav-link {
    display: block;
    padding: 0.5rem 1rem;
  }
  .nav-link:hover, .nav-link:focus {
    text-decoration: none; }
  .nav-link.disabled {
    color: #6c757d;
  }

  .subtitle {
    padding-left: 15px;
    font-size: 0.9rem !important;
  }
  .sidebar .sidebar-wrapper > .nav [data-toggle="collapse"] ~ div > ul > li > a span,
  .sidebar .sidebar-wrapper .user .user-info [data-toggle="collapse"] ~ div > ul > li > a span {
    display: inline-block; }
  .sidebar .sidebar-wrapper > .nav [data-toggle="collapse"] ~ div > ul > li > a .sidebar-normal,
  .sidebar .sidebar-wrapper .user .user-info [data-toggle="collapse"] ~ div > ul > li > a .sidebar-normal {
    margin: 0;
    position: relative;
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
    white-space: nowrap;
    display: block; }
  .sidebar .sidebar-wrapper > .nav [data-toggle="collapse"] ~ div > ul > li > a .sidebar-mini,
  .sidebar .sidebar-wrapper .user .user-info [data-toggle="collapse"] ~ div > ul > li > a .sidebar-mini {
    text-transform: uppercase;
    width: 30px;
    margin-right: 15px;
    text-align: center;
    letter-spacing: 1px;
    position: relative;
    float: left;
    display: inherit; }
  .sidebar .sidebar-wrapper > .nav [data-toggle="collapse"] ~ div > ul > li > a i,
  .sidebar .sidebar-wrapper .user .user-info [data-toggle="collapse"] ~ div > ul > li > a i {
    font-size: 17px;
    line-height: 20px;
    width: 26px; }
  .sidebar .logo-tim {
    border-radius: 50%;
    border: 1px solid #333;
    display: block;
    height: 61px;
    width: 61px;
    float: left;
    overflow: hidden; }
  .sidebar .logo-tim img {
    width: 60px;
    height: 60px; }
  .sidebar .nav {
    margin-top: 20px;
    display: block;
  }
  .sidebar .nav .caret {
    margin-top: -26px;
    position: absolute;
    right: 32px;
    transform: rotate(0deg);
    
    transition: all .25s ease-out;
  }
  .sidebar .nav .caret.caret-reversed {
    transform: rotate(180deg);
    transition: all .25s ease-in;
  }
  .sidebar .nav li > a:hover, .sidebar .nav li > a:focus {
    background-color: transparent;
    outline: none; 
  }
  .sidebar .nav li:first-child > a {
    margin: 0 15px; }
  .sidebar .nav li:hover > a,
  .sidebar .nav li .dropdown-menu a:hover,
  .sidebar .nav li .dropdown-menu a:focus,
  .sidebar .nav li.active > [data-toggle="collapse"] {
    background-color: rgba(200, 200, 200, 0.2);
    color: #3C4858;
    box-shadow: none; }
  .sidebar .nav li.active > [data-toggle="collapse"] i {
    color: #a9afbb; }
  .sidebar .nav li.active > a,
  .sidebar .nav li.active > a i {
    color: #fff; }
  .sidebar .nav li.separator {
    margin: 15px 0; }
  .sidebar .nav li.separator:after {
    width: calc(100% - 30px);
    content: "";
    position: absolute;
    height: 1px;
    left: 15px;
    background-color: rgba(180, 180, 180, 0.3); }
  .sidebar .nav li.separator + li {
    margin-top: 31px; }
  .sidebar .nav p {
    margin: 0;
    line-height: 30px;
    font-size: 14px;
    position: relative;
    display: block;
    height: auto;
    white-space: nowrap; }
  .sidebar .nav i {
    font-size: 24px;
    float: left;
    margin-right: 15px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    color: #a9afbb; }
  .sidebar .nav li a,
  .sidebar .nav li .dropdown-menu a {
    margin: 10px 15px 0;
    border-radius: 3px;
    color: #3C4858;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 13px;
    padding: 10px 15px;
  }
  .sidebar .sidebar-background {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: block;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center center; }
  .sidebar .sidebar-background:after {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    content: "";
    display: block;
    background: #FFFFFF;
    opacity: .93; }
  .sidebar .logo {
    padding: 15px 0px;
    margin: 0;
    display: block;
    position: relative;
    z-index: 4; }
  .sidebar .logo:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 15px;
    height: 1px;
    width: calc(100% - 30px);
    background-color: rgba(180, 180, 180, 0.3); }
  .sidebar .logo p {
    float: left;
    font-size: 20px;
    margin: 10px 10px;
    color: #fff;
    line-height: 20px; }
  .sidebar .logo .simple-text {
    text-transform: uppercase;
    padding: 5px 0px;
    display: inline-block;
    font-size: 18px;
    color: #3C4858;
    white-space: nowrap;
    font-weight: 400;
    line-height: 30px;
    overflow: hidden;
    text-align: center;
    display: block; }
  .sidebar[data-color="azure"] li.active > a {
    background-color: #00bcd4;
    box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 188, 212, 0.4);
  }

  .display {
    display: block;
  }
  .hidden {
    display: none;
  }
`;

const FooterWrapper = styled.div`
  text-align: center;
  margin-top: 15px;
  width: 100%;
  @media only screen and (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 10px;
  }
`;

export { LayoutWrapper, HeaderWrapper, FooterWrapper };
