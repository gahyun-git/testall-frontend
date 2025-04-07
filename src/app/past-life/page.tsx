import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PastLifeForm from '@/components/PastLifeForm';

export default function PastLifeTest() {
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
              당신은 전생에 어떤 사람이었을까요? 생년월일과 태어난 시간을 입력하여 알아보세요.
            </p>
          </div>
          
          <PastLifeForm />
          
          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">전생 테스트란?</h2>
            <p className="text-gray-600">
              전생 테스트는 당신의 생년월일과 태어난 시간을 바탕으로 전생의 모습을 알아보는 테스트입니다.
              당신이 과거에 어떤 삶을 살았는지, 어떤 직업을 가졌는지, 어떤 사람이었는지 알아볼 수 있어요.
              재미로 즐겨보세요!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}