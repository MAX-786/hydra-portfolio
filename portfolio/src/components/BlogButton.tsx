import Link from "next/link"

export default function BlogButton() {
  return (
    <Link
      href="/blog"
      className="group relative inline-block overflow-hidden rounded-full dark:bg-blue px-8 py-3 text-white"
    >
      <span className="absolute inset-0 bg-white transition-transform duration-300 ease-out group-hover:translate-y-full"></span>
      <span className="relative font-semibold transition-colors duration-300 text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
        Visit My Blog
      </span>
    </Link>
  )
}

