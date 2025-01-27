export default function Header() {
    return (
      <header className="bg-secondary py-4">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Portfolio</h1>
          <div className="space-x-6">
            <a href="#home" className="hover:text-accent transition-colors">Home</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </nav>
      </header>
    )
  }