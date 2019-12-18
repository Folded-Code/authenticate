import Link from 'next/link'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  width: 550,
}

const linkStyle = {
  marginRight: 15,
}

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/login">
          <a style={linkStyle}>Login</a>
        </Link>
      </div>
      {props.children}
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}
