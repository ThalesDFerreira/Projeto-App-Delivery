/* eslint-disable max-len */
export default function Header() {
  return (
    <header className="bg-red-600">
      <nav className="flex items-center justify-between py-4 px-6">
        <a href="/login" className="text-white font-medium">Delivery Drinks</a>
        <div className="flex">
          <a href="/login" className="text-white font-medium hover:underline mr-4">Home</a>
          <a href="#" className="text-white font-medium hover:underline">Sobre Nós</a>
        </div>
      </nav>
    </header>
  );
}
