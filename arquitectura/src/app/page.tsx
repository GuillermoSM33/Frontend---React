import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Página Principal</h1>
      <ul className="space-y-4">
        <li>
          <Link 
            href="/users/view" 
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Ver Usuarios
          </Link>
        </li>
        <li>
          <Link 
            href="/users/add" 
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Agregar Usuario
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;
