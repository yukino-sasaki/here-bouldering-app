import React from "react";

const HomeScreen = () => {
  return (
    <>
      <div className="bg-darkgray flex-col justify-center h-16 flex">
        <h2 className="text-3xl text-white text-center">Here!Bouldering!</h2>
      </div>
      <div className="flex h-full">
        <div className="bg-gray w-1/5 h-screen">
          <h3 className="text-white">ユーザー名変更</h3>
          <h3 className="text-white">ジムを登録</h3>
        </div>
        <div className="bg-white w-4/5">
          <div className="text-3xl text-red-500 text-center">home</div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
