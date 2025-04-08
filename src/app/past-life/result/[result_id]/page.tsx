'use client';
import { useParams } from "next/navigation";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function PastLifeResultPage() {
    const { result_id } = useParams() as { result_id: string };
    const { result_image } = useParams() as { result_image: string };
    const { result_story } = useParams() as { result_story: string };
    const { result_name } = useParams() as { result_name: string };
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center">전생 테스트 결과</h1>
                <p className="text-center mt-4">
                    결과 ID: {result_id}
                    결과 이미지: {result_image}
                    결과 이야기: {result_story}
                    결과 이름: {result_name}
                </p>
            </main>
            <Footer />
        </div>
    )
}