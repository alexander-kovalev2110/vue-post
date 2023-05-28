import { createRouter, createWebHistory } from "vue-router"
import PostsPage from "@/pages/PostsPage.vue"
import MyPostsPage from "@/pages/MyPostsPage.vue"
import UserProfile from "@/pages/UserProfile.vue"
import PostPage from "@/pages/PostPage.vue"
import MyPostPage from "@/pages/MyPostPage.vue"

const routes = [
    { path: '/', name: 'posts',componenet: PostsPage },
    { path: '/my', name: 'myPosts',componenet: MyPostsPage },
    { path: '/post', name: 'post',componenet: PostPage },
    { path: '/my-post', name: 'myPost',componenet: MyPostPage },
    { path: '/user', name: 'user', componenet: UserProfile },
]

const router =  createRouter({
    history: createWebHistory(),
    routes
})

export default router
