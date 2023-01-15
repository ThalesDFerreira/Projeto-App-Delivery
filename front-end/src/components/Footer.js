import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="bg-red-600 text-white text-center py-2">
      <div className="container mx-auto flex justify-between">
        <div className="text-xs">
          <p>Contato: (00) - 0011 - 2233</p>
          <p>Endereço: Rua dos Bobos, Numero 0, Bairro Tal de Tal</p>
        </div>
        <div className="flex">
          <a href="#" className="text-white font-medium hover:underline mr-2">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-white font-medium hover:underline mr-2">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-white font-medium hover:underline">
            <FaFacebook size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
