import Link from 'next/link'

import '../styles.css'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  width: 550,
}

const linkStyle = {
  marginRight: 15,
}

export default function Post(props) {
  return (
    <div style={layoutStyle}>
      <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/login">
          <a style={linkStyle}>Login</a>
        </Link>
        <Link href="/account">
          <a style={linkStyle}>Account</a>
        </Link>
      </div>
      {props.children}
    </div>
  )
}
