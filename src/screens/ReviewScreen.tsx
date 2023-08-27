import Header from "../components/Header";
import ReviewMain from "../components/Review/ReviewMain";
import Sidebar from "../components/Sidebar";

const ReviewScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReviewMain />
      </main>
    </>
  );
};

export default ReviewScreen;
