import React from "react";

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">SmartHealth Clinic</h1>
            <p className="text-lg">
                Chào mừng bạn đến với hệ thống đặt lịch khám và chăm sóc sức khỏe trực tuyến.
            </p>
            <div className="mt-6">
                <a
                    href="/login"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Đăng nhập
                </a>
            </div>
        </main>
    );
}
