import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <>
    <head>
      <title>Página Principal</title>
    </head>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
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
        <li>
          <Link 
            href="/users/todo" 
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            ToDo List
          </Link>
        </li>
        <li>
          <Link
          href="/practique/count"
          className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Contador con useReducer
          </Link>
        </li>
        <li>
          <Link
          href="/practique/toggling"
          className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Encender/Apagar con useReducer
          </Link>
        </li>
        <li>
          <Link
          href="/practique/search_data"
          className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Buscador con useCallback
          </Link>
        </li>
        <li>
          <Link
          href="/practique/e-commerce"
          className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Ecommerce con useCallback
          </Link>
        </li>
        <li>
          <Link
          href="/practique/calculator"
          className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Calculadora con useMemo
          </Link>
        </li>
        <li>
          <Link
          href="/practique/ecommerce"
          className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Ecommerce con useMemo
          </Link>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Page;
