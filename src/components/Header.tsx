import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">TestAll</Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/past-life" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  전생 테스트
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}