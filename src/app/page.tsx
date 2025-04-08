import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { PrimaryButton, SecondaryButton } from '@components/Buttons';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center">Welcome to TestAll</h1>
        <div className="mt-8 text-center">
          <Link href="/past-life">
            <PrimaryButton>
              전생 테스트 시작하기
            </PrimaryButton>
          </Link>
          <br />
          <br />
          <Link href="/">
            <SecondaryButton>
              다른 테스트 보기
            </SecondaryButton>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}