const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/auth/google"; 
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-2xl text-center">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
        Sign in to your Account
      </h1>
      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
