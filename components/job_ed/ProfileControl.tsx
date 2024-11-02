import React from 'react';

const ProfileControl = () => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm m-1">
      <h4 className="font-semibold text-lg mb-2">Quản lý hồ sơ</h4>
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-700">Đang Tắt tìm việc</p>
        <button className="text-green-500">Bật</button>
      </div>
      <p className="text-sm text-gray-500">Bật tìm việc giúp hồ sơ của bạn nổi bật hơn...</p>
    </div>
  );
};

export default ProfileControl;
