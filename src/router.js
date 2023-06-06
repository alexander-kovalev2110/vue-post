import { createRouter, createWebHistory,  } from "vue-router"
import PostsPage from "@/pages/PostsPage.vue"
import MyPostsPage from "@/pages/MyPostsPage.vue"
import UserProfile from "@/pages/UserProfile.vue"
import PostPage from "@/pages/PostPage.vue"
import MyPostPage from "@/pages/MyPostPage.vue"

const routes = [
    { path: '/', name: 'posts', component: PostsPage },
    { path: '/my', name: 'myPosts', component: MyPostsPage },
    { path: '/post/:id', name: 'post', component: PostPage, props: true },
    { path: '/my-post/:id', name: 'myPost',component: MyPostPage },
    { path: '/user', name: 'user', component: UserProfile },
]

const router =  createRouter({
    history: createWebHistory(),
    routes
})

export default router
