import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
      {
          path: '/admin',
          name: 'admin',
            component: () => import('../views/admin/admin.vue')
      },
    {
        path: '/file-upload',
        name: 'file-upload',
        component: () => import('../views/file-upload/file-upload.vue')
    },
      {
          path: '/music',
          name: 'music',
          component: () => import('../views/music/music.vue')
      },
      {
          path: '/moyu',
          name: 'moyu',
            component: () => import('../views/content/moyu.vue')
      },
      {
          path: '/my-minio-view',
          name: 'my-minio-view',
            component: () => import('../views/content/my-minio-view.vue')
      },
      {
          path: '/mqtt',
            name: 'mqtt',
            component: () => import('../views/content/mqtt.vue')
      },
      {
          path: '/ssl',
            name: 'ssl',
            component: () => import('../views/content/ssl.vue')
      },
      // 测试专用
      {
          path: '/test',
            name: 'test',
            component: () => import('../views/content/test.vue')
      },
  ]
})

export default router
