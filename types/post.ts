type Post = {
  id: string
  title: string
  author: string
  created: number
  name: string
  thumbnail: string
  url: string
  post_hint: 'image' | 'hosted:video'
}

export default Post
