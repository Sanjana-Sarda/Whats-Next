import * as React from 'react'
import { Link } from 'gatsby'
import * as containerStyles from './layout.module.css'

const Layout = (props) => {
  return (
    <main>
      <title>{props.pageTitle}</title>
      <nav>
        <ul>
          <li><Link to="/" className={containerStyles.linkText}>Home</Link></li>
          <li><Link to="/about" className={containerStyles.linkText}>About</Link></li>
        </ul>
      </nav>
      <h1>{props.pageTitle}</h1>
      {props.children}
    </main>
  )
}

export default Layout