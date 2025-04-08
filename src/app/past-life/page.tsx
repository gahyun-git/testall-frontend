import Header from '@components/Header';
import Footer from '@components/Footer';
import PastLifeForm from '@components/PastLifeForm';

export default function PastLifeTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-indigo-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              전생 테스트
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              생년월일과 태어난 시간을 입력하여 전생의 모습을 확인해보세요.
            </p>
          </div>
          <PastLifeForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}