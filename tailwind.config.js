/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        minecraft: ['mcFont', 'sans-serif'],
        sans: [
          '"Helvetica Neue"',
          'Helvetica',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"微软雅黑"',
          'Arial',
          'sans-serif'
        ]
      }
    }
  }
}