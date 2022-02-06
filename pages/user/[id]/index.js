import { server } from '../../../config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Meta from '../../../components/Meta'

const user = ({ user }) => {
  // const router = useRouter()
  // const { id } = router.query

  return (
    <>
      <Meta title={user.title} description={user.excerpt} />
      <h1>{user.title}</h1>
      <p>{user.body}</p>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/users/${context.params.id}`)

  const user = await res.json()

  return {
    props: {
      user,
    },
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/users`)

  const users = await res.json()

  const ids = users.map((user) => user.id)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }))

  return {
    paths,
    fallback: false,
  }
}

export default user
