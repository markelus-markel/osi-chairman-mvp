/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    tailwindcss: {},       // ← это обязательно для Tailwind v3
    autoprefixer: {},
  },
}