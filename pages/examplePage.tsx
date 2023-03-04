import Head from "next/head";

const ExamplePage = () => {
  return (
    <div className="relative min-h-screen ">
      <Head>
        <title>Contoh Halaman</title>
      </Head>

      {/* Navbar */}
      <nav className=" fixed top-0 left-0 right-0 bg-gray-900 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="h-8">
            <img src="/logo.png" alt="Logo" />
          </div>
          <form className="ml-4 flex-1">
            <label htmlFor="search" className="sr-only">
              Cari
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="search"
                id="search"
                name="search"
                className="form-input block w-full pl-10 sm:text-sm sm:leading-5 bg-gray-800 text-white border-gray-700 rounded-md"
                placeholder="Cari"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.442 14.928a8 8 0 111.415-1.415l4.244 4.243a1 1 0 01-1.414 1.415l-4.245-4.243zm-6.95-2.163a6 6 0 11.707-.707l2.527 2.527a1 1 0 01-1.414 1.414l-2.527-2.527z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-xl mx-auto mt-20 px-4 sm:px-6 lg:px-8  h-full overflow-y-auto bg-white">
        <h1 className="text-2xl font-semibold text-gray-900">
          Selamat datang di situs kami!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Silakan jelajahi produk-produk terbaru kami. Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Silakan jelajahi produk-produk terbaru kami. Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Silakan jelajahi produk-produk terbaru kami. Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Silakan jelajahi produk-produk terbaru kami. Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Silakan jelajahi produk-produk terbaru kami. Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Silakan jelajahi produk-produk terbaru kami. Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.Silakan jelajahi
          produk-produk terbaru kami.Silakan jelajahi produk-produk terbaru
          kami.Silakan jelajahi produk-produk terbaru kami.
        </p>
      </div>

      {/* Bottom bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <a href="#" className="text-gray-300 hover:text-white ml-4">
              Tentang
            </a>
            <a href="#" className="text-gray-300 hover:text-white ml-4">
              Kontak
            </a>
          </div>
          <div>
            <a href="#" className="text-gray-300 hover:text-white ml-4">
              Syarat dan Ketentuan
            </a>
            <a href="#" className="text-gray-300 hover:text-white ml-4">
              Kebijakan Privasi
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExamplePage;
