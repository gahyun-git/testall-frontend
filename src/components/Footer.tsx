export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="mb-2">© {new Date().getFullYear()} TestAll. All rights reserved.</p>
          <p className="text-gray-400 text-sm">테스트 올</p>
        </div>
      </div>
    </footer>
  );
}