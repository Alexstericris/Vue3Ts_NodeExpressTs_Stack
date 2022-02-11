import Posts from '../components/Posts'
import NewPost from '../components/NewPost'
import EditPost from '../components/EditPost'
import Hello from '../views/Hello'

var routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  }, {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost
  }, {
    path: '/posts/:id',
    name: 'EditPost',
    component: EditPost
  }]
export default routes
